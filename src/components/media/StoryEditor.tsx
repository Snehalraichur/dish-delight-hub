import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Check, 
  Crop, 
  Palette, 
  RotateCw, 
  FlipHorizontal,
  Music,
  Type,
  Sticker,
  Sparkles,
  Sun,
  Contrast,
  Move
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StoryEditorProps {
  isOpen: boolean;
  imageData: string;
  onClose: () => void;
  onSave: (editedImage: string) => void;
}

type EditMode = "crop" | "filter" | "music" | "text" | null;

interface FilterPreset {
  name: string;
  filter: string;
  icon: string;
}

const filterPresets: FilterPreset[] = [
  { name: "Original", filter: "none", icon: "○" },
  { name: "Clarendon", filter: "saturate(1.35) contrast(1.15)", icon: "◐" },
  { name: "Gingham", filter: "brightness(1.05) hue-rotate(-10deg) saturate(0.9)", icon: "◑" },
  { name: "Moon", filter: "grayscale(1) contrast(1.1) brightness(1.1)", icon: "◔" },
  { name: "Lark", filter: "contrast(0.9) saturate(1.2) brightness(1.15)", icon: "◕" },
  { name: "Reyes", filter: "sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)", icon: "◖" },
  { name: "Juno", filter: "saturate(1.4) contrast(1.1) brightness(1.05)", icon: "◗" },
  { name: "Slumber", filter: "brightness(1.05) saturate(0.66) contrast(0.85)", icon: "◘" },
  { name: "Crema", filter: "sepia(0.1) contrast(0.9) brightness(1.05) saturate(0.9)", icon: "◙" },
  { name: "Ludwig", filter: "contrast(0.95) saturate(1.05) brightness(1.1)", icon: "◚" },
  { name: "Aden", filter: "hue-rotate(-20deg) saturate(0.85) brightness(1.2) contrast(0.9)", icon: "◛" },
  { name: "Perpetua", filter: "contrast(1.1) saturate(1.1)", icon: "◜" },
];

const aspectRatios = [
  { name: "9:16", ratio: 9/16, label: "Story" },
  { name: "1:1", ratio: 1, label: "Square" },
  { name: "4:5", ratio: 4/5, label: "Portrait" },
  { name: "Free", ratio: 0, label: "Free" },
];

const musicTracks = [
  { id: "1", name: "Chill Vibes", artist: "Lo-Fi Beats", duration: "0:30" },
  { id: "2", name: "Summer Days", artist: "Happy Tunes", duration: "0:30" },
  { id: "3", name: "Night Drive", artist: "Synth Wave", duration: "0:30" },
  { id: "4", name: "Coffee Shop", artist: "Jazz Cafe", duration: "0:30" },
  { id: "5", name: "Morning Run", artist: "Energy Boost", duration: "0:30" },
];

export const StoryEditor = ({ isOpen, imageData, onClose, onSave }: StoryEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [selectedFilter, setSelectedFilter] = useState(filterPresets[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0]);
  const [selectedMusic, setSelectedMusic] = useState<typeof musicTracks[0] | null>(null);
  
  // Crop state
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [cropScale, setCropScale] = useState(1);

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
    if (saturation !== 100) {
      filter += ` saturate(${saturation / 100})`;
    }
    return filter || "none";
  };

  const getTransformString = () => {
    let transform = `scale(${cropScale})`;
    transform += ` translate(${cropOffset.x}px, ${cropOffset.y}px)`;
    if (rotation !== 0) {
      transform += ` rotate(${rotation}deg)`;
    }
    if (flipH) {
      transform += " scaleX(-1)";
    }
    return transform;
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
    
    // Set canvas size for story aspect ratio
    const aspectRatio = selectedAspectRatio.ratio || img.naturalWidth / img.naturalHeight;
    canvas.width = 1080;
    canvas.height = aspectRatio > 0 ? 1080 / aspectRatio : 1920;

    // Apply transformations
    ctx.save();
    ctx.filter = getFilterString();
    
    // Handle rotation and flip
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(cropScale * (flipH ? -1 : 1), cropScale);
    ctx.translate(-canvas.width / 2 + cropOffset.x, -canvas.height / 2 + cropOffset.y);
    
    // Draw image centered
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    
    ctx.restore();

    const editedImage = canvas.toDataURL("image/jpeg", 0.9);
    
    if (selectedMusic) {
      toast.success(`Story saved with "${selectedMusic.name}" music!`);
    } else {
      toast.success("Story saved!");
    }
    
    onSave(editedImage);
  };

  const resetEdits = () => {
    setSelectedFilter(filterPresets[0]);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipH(false);
    setCropOffset({ x: 0, y: 0 });
    setCropScale(1);
    setSelectedMusic(null);
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
        <div className="flex items-center justify-between p-4 bg-black/80 shrink-0">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </Button>
          <span className="text-white font-medium">Edit Story</span>
          <Button variant="ghost" size="sm" onClick={handleSave} className="text-primary hover:bg-white/20">
            <Check className="h-5 w-5 mr-1" />
            Share
          </Button>
        </div>

        {/* Image Preview */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden min-h-0">
          <div 
            className="relative overflow-hidden rounded-xl"
            style={{ 
              aspectRatio: selectedAspectRatio.ratio > 0 ? selectedAspectRatio.ratio : undefined,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            <img
              src={imageData}
              alt="Edit preview"
              className="w-full h-full object-cover transition-all duration-200"
              style={{
                filter: getFilterString(),
                transform: getTransformString(),
              }}
            />
            {/* Music indicator */}
            {selectedMusic && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Music className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white text-sm truncate">{selectedMusic.name} - {selectedMusic.artist}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Edit Controls */}
        <div className="bg-black/80 p-4 space-y-4 shrink-0">
          {/* Mode Tabs - Scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={editMode === "crop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "crop" ? null : "crop")}
              className={cn(
                "shrink-0",
                editMode === "crop" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Crop className="h-4 w-4 mr-2" />
              Crop
            </Button>
            <Button
              variant={editMode === "filter" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "filter" ? null : "filter")}
              className={cn(
                "shrink-0",
                editMode === "filter" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Palette className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              variant={editMode === "music" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "music" ? null : "music")}
              className={cn(
                "shrink-0",
                editMode === "music" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Music className="h-4 w-4 mr-2" />
              Music
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="text-white hover:bg-white/20 shrink-0"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate
            </Button>
            <Button
              variant={flipH ? "default" : "ghost"}
              size="sm"
              onClick={() => setFlipH(!flipH)}
              className={cn(
                "shrink-0",
                flipH ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <FlipHorizontal className="h-4 w-4 mr-2" />
              Flip
            </Button>
          </div>

          {/* Crop Controls */}
          {editMode === "crop" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Aspect Ratio Presets */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.name}
                    onClick={() => setSelectedAspectRatio(ratio)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-3 rounded-lg transition-all shrink-0",
                      selectedAspectRatio.name === ratio.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    <div 
                      className="border-2 border-current"
                      style={{ 
                        width: ratio.ratio > 1 ? 32 : 24 * ratio.ratio,
                        height: ratio.ratio > 1 ? 32 / ratio.ratio : 24,
                      }}
                    />
                    <span className="text-xs font-medium">{ratio.label}</span>
                  </button>
                ))}
              </div>

              {/* Zoom Slider */}
              <div className="space-y-2 px-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Move className="h-3 w-3" /> Zoom
                  </span>
                  <span>{Math.round(cropScale * 100)}%</span>
                </div>
                <Slider
                  value={[cropScale * 100]}
                  onValueChange={([val]) => setCropScale(val / 100)}
                  min={50}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {/* Filter Controls */}
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
                    className={cn(
                      "flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-lg transition-all",
                      selectedFilter.name === preset.name ? "ring-2 ring-primary" : ""
                    )}
                  >
                    <div
                      className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
                      style={{ filter: preset.filter }}
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

              {/* Adjustment Sliders */}
              <div className="space-y-3 px-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <Sun className="h-3 w-3" /> Brightness
                    </span>
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
                    <span className="flex items-center gap-1">
                      <Contrast className="h-3 w-3" /> Contrast
                    </span>
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
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Saturation
                    </span>
                    <span>{saturation}%</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    onValueChange={([val]) => setSaturation(val)}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Music Controls */}
          {editMode === "music" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 max-h-[200px] overflow-y-auto"
            >
              {selectedMusic && (
                <div className="flex items-center justify-between bg-primary/20 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <Music className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{selectedMusic.name}</p>
                      <p className="text-white/60 text-xs">{selectedMusic.artist}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMusic(null)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {musicTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedMusic(track)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-all",
                    selectedMusic?.id === track.id
                      ? "bg-primary/20 ring-1 ring-primary"
                      : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Music className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-medium">{track.name}</p>
                    <p className="text-white/60 text-xs">{track.artist}</p>
                  </div>
                  <span className="text-white/40 text-xs">{track.duration}</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Reset Button */}
          {editMode && (
            <div className="flex justify-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetEdits}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Reset All
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
