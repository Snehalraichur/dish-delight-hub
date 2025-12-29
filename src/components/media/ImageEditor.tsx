import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crop, Palette, RotateCw, FlipHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface ImageEditorProps {
  isOpen: boolean;
  imageData: string;
  onClose: () => void;
  onSave: (editedImage: string) => void;
}

type EditMode = "crop" | "filter" | null;

interface FilterPreset {
  name: string;
  filter: string;
  preview: string;
}

const filterPresets: FilterPreset[] = [
  { name: "Original", filter: "none", preview: "brightness(1)" },
  { name: "Vivid", filter: "saturate(1.4) contrast(1.1)", preview: "saturate(1.4)" },
  { name: "Warm", filter: "sepia(0.3) saturate(1.2)", preview: "sepia(0.3)" },
  { name: "Cool", filter: "hue-rotate(20deg) saturate(0.9)", preview: "hue-rotate(20deg)" },
  { name: "B&W", filter: "grayscale(1)", preview: "grayscale(1)" },
  { name: "Vintage", filter: "sepia(0.5) contrast(0.9) brightness(1.1)", preview: "sepia(0.5)" },
  { name: "Dramatic", filter: "contrast(1.3) brightness(0.9)", preview: "contrast(1.3)" },
  { name: "Fade", filter: "brightness(1.1) contrast(0.85) saturate(0.8)", preview: "contrast(0.85)" },
];

const aspectRatios = [
  { name: "1:1", ratio: 1 },
  { name: "4:3", ratio: 4/3 },
  { name: "3:4", ratio: 3/4 },
  { name: "16:9", ratio: 16/9 },
  { name: "Free", ratio: 0 },
];

export const ImageEditor = ({ isOpen, imageData, onClose, onSave }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [selectedFilter, setSelectedFilter] = useState(filterPresets[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0]);
  
  // Crop state
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen && imageData) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
      };
      img.src = imageData;
    }
  }, [isOpen, imageData]);

  const getFilterString = () => {
    let filter = selectedFilter.filter;
    if (brightness !== 100) {
      filter += ` brightness(${brightness / 100})`;
    }
    if (contrast !== 100) {
      filter += ` contrast(${contrast / 100})`;
    }
    return filter || "none";
  };

  const getTransformString = () => {
    let transform = "";
    if (rotation !== 0) {
      transform += `rotate(${rotation}deg) `;
    }
    if (flipH) {
      transform += "scaleX(-1) ";
    }
    return transform || "none";
  };

  const handleSave = () => {
    if (!canvasRef.current || !imageRef.current) {
      onSave(imageData);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      onSave(imageData);
      return;
    }

    const img = imageRef.current;
    
    // Set canvas size
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply transformations
    ctx.save();
    ctx.filter = getFilterString();
    
    // Handle rotation and flip
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    if (flipH) {
      ctx.scale(-1, 1);
    }
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    const editedImage = canvas.toDataURL("image/jpeg", 0.9);
    onSave(editedImage);
    toast.success("Image saved!");
  };

  const resetEdits = () => {
    setSelectedFilter(filterPresets[0]);
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setFlipH(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/80">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </Button>
          <span className="text-white font-medium">Edit Photo</span>
          <Button variant="ghost" size="sm" onClick={handleSave} className="text-primary hover:bg-white/20">
            <Check className="h-5 w-5 mr-1" />
            Done
          </Button>
        </div>

        {/* Image Preview */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={imageData}
            alt="Edit preview"
            className="max-w-full max-h-full object-contain rounded-lg transition-all duration-200"
            style={{
              filter: getFilterString(),
              transform: getTransformString(),
            }}
          />
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Edit Controls */}
        <div className="bg-black/80 p-4 space-y-4">
          {/* Mode Tabs */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={editMode === "filter" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "filter" ? null : "filter")}
              className={editMode === "filter" ? "gradient-primary" : "text-white hover:bg-white/20"}
            >
              <Palette className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="text-white hover:bg-white/20"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate
            </Button>
            <Button
              variant={flipH ? "default" : "ghost"}
              size="sm"
              onClick={() => setFlipH(!flipH)}
              className={flipH ? "gradient-primary" : "text-white hover:bg-white/20"}
            >
              <FlipHorizontal className="h-4 w-4 mr-2" />
              Flip
            </Button>
          </div>

          {/* Filter Presets */}
          {editMode === "filter" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Filter Presets Scroll */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedFilter(preset)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-lg transition-all ${
                      selectedFilter.name === preset.name
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <div
                      className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
                      style={{ filter: preset.preview }}
                    >
                      <img
                        src={imageData}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-white">{preset.name}</span>
                  </button>
                ))}
              </div>

              {/* Brightness & Contrast Sliders */}
              <div className="space-y-3 px-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <Slider
                    value={[brightness]}
                    onValueChange={([val]) => setBrightness(val)}
                    min={50}
                    max={150}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>Contrast</span>
                    <span>{contrast}%</span>
                  </div>
                  <Slider
                    value={[contrast]}
                    onValueChange={([val]) => setContrast(val)}
                    min={50}
                    max={150}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetEdits}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Reset All
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
