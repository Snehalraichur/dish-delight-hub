import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CameraCapture } from "@/components/media";
import { StoryEditor } from "@/components/media/StoryEditor";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const CreateStory = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  
  // Camera and editor states
  const [showCamera, setShowCamera] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCaptureMedia = () => {
    setShowCamera(true);
  };

  const handleCameraCapture = (mediaData: string, isVideoFile?: boolean) => {
    setCapturedMedia(mediaData);
    setIsVideo(isVideoFile || false);
    setShowCamera(false);
    setShowEditor(true);
  };

  const handleEditorSave = async (editedImage: string) => {
    setIsSaving(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to create a story");
        navigate("/login");
        return;
      }

      // Insert story into database
      const { error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          media_url: editedImage,
        });

      if (error) throw error;

      // Invalidate stories query to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      
      toast.success("Story created successfully!");
      navigate("/feed");
    } catch (error) {
      console.error('Error creating story:', error);
      toast.error("Failed to create story. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideoFile = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onload = (event) => {
        const mediaData = event.target?.result as string;
        setCapturedMedia(mediaData);
        setIsVideo(isVideoFile);
        setShowEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content - Only show when camera and editor are not open */}
      {!showCamera && !showEditor && (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Create Story</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Hidden file input for gallery */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            {/* Placeholder */}
            <div className="w-full max-w-[300px] aspect-[9/16] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <Camera className="h-20 w-20 text-muted-foreground/30" />
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <Button 
                variant="default" 
                size="lg" 
                onClick={handleCaptureMedia}
                className="w-full gradient-primary"
              >
                <Camera className="h-5 w-5 mr-2" />
                Capture Photo/Video
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleGallerySelect}
                className="w-full"
              >
                <Image className="h-5 w-5 mr-2" />
                Upload Photo/Video
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm text-center">
              Share a moment with your followers
            </p>
          </div>
        </div>
      )}

      {/* Camera Capture - Full screen */}
      <CameraCapture
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
      />

      {/* Story Editor - Full screen */}
      {capturedMedia && showEditor && (
        <StoryEditor
          isOpen={showEditor}
          mediaData={capturedMedia}
          isVideo={isVideo}
          onClose={() => {
            setShowEditor(false);
            setCapturedMedia(null);
            setIsVideo(false);
            // Navigate back when closing editor
            navigate(-1);
          }}
          onSave={handleEditorSave}
        />
      )}
    </div>
  );
};

export default CreateStory;
