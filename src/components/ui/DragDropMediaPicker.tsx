import { useState, useRef, useCallback } from "react";
import { Upload, X, Image, Video, File, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video" | "document";
  progress?: number;
}

interface DragDropMediaPickerProps {
  onFilesSelected: (files: MediaFile[]) => void;
  onFileRemove?: (fileId: string) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
  showPreview?: boolean;
  className?: string;
  disabled?: boolean;
}

const defaultAcceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export function DragDropMediaPicker({
  onFilesSelected,
  onFileRemove,
  maxFiles = 10,
  maxSizeMB = 50,
  acceptedTypes = defaultAcceptedTypes,
  multiple = true,
  showPreview = true,
  className,
  disabled = false,
}: DragDropMediaPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getFileType = (mimeType: string): "image" | "video" | "document" => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "document";
  };

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(fileList);

      // Validate file count
      if (files.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validFiles: MediaFile[] = [];

      for (const file of fileArray) {
        // Validate type
        if (!acceptedTypes.includes(file.type)) {
          setError(`File type ${file.type} not supported`);
          continue;
        }

        // Validate size
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
          continue;
        }

        const mediaFile: MediaFile = {
          id: generateId(),
          file,
          preview: URL.createObjectURL(file),
          type: getFileType(file.type),
        };

        validFiles.push(mediaFile);
      }

      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);
        onFilesSelected(newFiles);
      }
    },
    [files, maxFiles, maxSizeMB, acceptedTypes, multiple, onFilesSelected]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const newFiles = files.filter((f) => f.id !== fileId);
    setFiles(newFiles);
    onFilesSelected(newFiles);
    onFileRemove?.(fileId);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const FileIcon = ({ type }: { type: MediaFile["type"] }) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer",
          "flex flex-col items-center justify-center text-center min-h-[200px]",
          isDragging && "border-primary bg-primary/5 scale-[1.02]",
          !isDragging && "border-border hover:border-primary/50 hover:bg-muted/50",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-destructive"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        <div
          className={cn(
            "rounded-full p-4 mb-4 transition-colors",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>

        <p className="font-medium text-foreground">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          Supports images and videos up to {maxSizeMB}MB
        </p>

        {error && (
          <p className="text-sm text-destructive mt-3 font-medium">{error}</p>
        )}
      </div>

      {/* File Previews */}
      {showPreview && files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
            >
              {file.type === "image" ? (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-full h-full object-cover"
                />
              ) : file.type === "video" ? (
                <video
                  src={file.preview}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileIcon type={file.type} />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* File type badge */}
              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center gap-1">
                <FileIcon type={file.type} />
                <span className="text-muted-foreground capitalize">{file.type}</span>
              </div>

              {/* Progress indicator */}
              {file.progress !== undefined && file.progress < 100 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
                    <span className="text-white text-sm mt-2 block">
                      {file.progress}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* File count indicator */}
      {files.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {files.length} of {maxFiles} files selected
        </p>
      )}
    </div>
  );
}

// Simplified single file picker variant
interface SingleMediaPickerProps {
  onFileSelected: (file: MediaFile | null) => void;
  value?: MediaFile | null;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
}

export function SingleMediaPicker({
  onFileSelected,
  value,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB = 10,
  className,
  disabled = false,
}: SingleMediaPickerProps) {
  const handleFilesSelected = (files: MediaFile[]) => {
    onFileSelected(files[0] || null);
  };

  const handleFileRemove = () => {
    onFileSelected(null);
  };

  return (
    <DragDropMediaPicker
      onFilesSelected={handleFilesSelected}
      onFileRemove={handleFileRemove}
      maxFiles={1}
      maxSizeMB={maxSizeMB}
      acceptedTypes={acceptedTypes}
      multiple={false}
      className={className}
      disabled={disabled}
    />
  );
}
