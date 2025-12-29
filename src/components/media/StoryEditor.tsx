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
  Pencil,
  Smile,
  Sun,
  Contrast,
  Move,
  Sparkles,
  Plus,
  Trash2,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StoryEditorProps {
  isOpen: boolean;
  mediaData: string;
  isVideo?: boolean;
  onClose: () => void;
  onSave: (editedMedia: string) => void;
}

type EditMode = "crop" | "filter" | "music" | "text" | "draw" | "sticker" | null;

interface FilterPreset {
  name: string;
  filter: string;
  icon: string;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface StickerOverlay {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

interface DrawingPath {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
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
  { id: "1", name: "Chill Vibes", artist: "Lo-Fi Beats", duration: "0:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "2", name: "Summer Days", artist: "Happy Tunes", duration: "0:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "3", name: "Night Drive", artist: "Synth Wave", duration: "0:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "4", name: "Coffee Shop", artist: "Jazz Cafe", duration: "0:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "5", name: "Morning Run", artist: "Energy Boost", duration: "0:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const textColors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
const drawColors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#FFA500"];
const fontFamilies = ["Arial", "Georgia", "Courier New", "Comic Sans MS", "Impact"];

const stickers = ["😀", "😍", "🔥", "❤️", "⭐", "🎉", "👍", "💯", "🌟", "✨", "🎊", "🥳", "😎", "🤩", "💪", "🙌"];

export const StoryEditor = ({ isOpen, mediaData, isVideo = false, onClose, onSave }: StoryEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [selectedFilter, setSelectedFilter] = useState(filterPresets[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0]);
  const [selectedMusic, setSelectedMusic] = useState<typeof musicTracks[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Crop state
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [cropScale, setCropScale] = useState(1);

  // Text overlay state
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [newText, setNewText] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [draggingText, setDraggingText] = useState<string | null>(null);

  // Sticker state
  const [stickerOverlays, setStickerOverlays] = useState<StickerOverlay[]>([]);
  const [draggingSticker, setDraggingSticker] = useState<string | null>(null);

  // Drawing state
  const [drawings, setDrawings] = useState<DrawingPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#FFFFFF");
  const [drawWidth, setDrawWidth] = useState(4);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (isOpen && mediaData && !isVideo) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
      };
      img.src = mediaData;
    }
  }, [isOpen, mediaData, isVideo]);

  // Handle music playback
  useEffect(() => {
    if (selectedMusic) {
      if (!audioRef.current) {
        audioRef.current = new Audio(selectedMusic.url);
        audioRef.current.loop = true;
      } else {
        audioRef.current.src = selectedMusic.url;
      }
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedMusic]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

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

  const addTextOverlay = () => {
    if (!newText.trim()) return;
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      text: newText,
      x: 50,
      y: 50,
      fontSize,
      color: textColor,
      fontFamily,
    };
    setTextOverlays([...textOverlays, newOverlay]);
    setNewText("");
    toast.success("Text added!");
  };

  const removeTextOverlay = (id: string) => {
    setTextOverlays(textOverlays.filter(t => t.id !== id));
  };

  const addSticker = (emoji: string) => {
    const newSticker: StickerOverlay = {
      id: Date.now().toString(),
      emoji,
      x: 50,
      y: 50,
      size: 48,
    };
    setStickerOverlays([...stickerOverlays, newSticker]);
    toast.success("Sticker added!");
  };

  const removeSticker = (id: string) => {
    setStickerOverlays(stickerOverlays.filter(s => s.id !== id));
  };

  // Drawing handlers
  const handleDrawStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (editMode !== "draw") return;
    setIsDrawing(true);
    const point = getEventPoint(e);
    setCurrentPath([point]);
  };

  const handleDrawMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || editMode !== "draw") return;
    const point = getEventPoint(e);
    setCurrentPath(prev => [...prev, point]);
  };

  const handleDrawEnd = () => {
    if (!isDrawing || currentPath.length === 0) return;
    const newDrawing: DrawingPath = {
      id: Date.now().toString(),
      points: currentPath,
      color: drawColor,
      width: drawWidth,
    };
    setDrawings([...drawings, newDrawing]);
    setCurrentPath([]);
    setIsDrawing(false);
  };

  const getEventPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  };

  const clearDrawings = () => {
    setDrawings([]);
    toast.success("Drawings cleared!");
  };

  const handleTextDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    setDraggingText(id);
    e.preventDefault();
  };

  const handleStickerDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    setDraggingSticker(id);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingText) {
      const point = getEventPoint(e);
      setTextOverlays(overlays => 
        overlays.map(t => t.id === draggingText ? { ...t, x: point.x, y: point.y } : t)
      );
    }
    if (draggingSticker) {
      const point = getEventPoint(e);
      setStickerOverlays(stickers => 
        stickers.map(s => s.id === draggingSticker ? { ...s, x: point.x, y: point.y } : s)
      );
    }
    if (isDrawing && editMode === "draw") {
      handleDrawMove(e);
    }
  };

  const handleMouseUp = () => {
    setDraggingText(null);
    setDraggingSticker(null);
    if (isDrawing) {
      handleDrawEnd();
    }
  };

  const handleSave = () => {
    if (selectedMusic) {
      toast.success(`Story saved with "${selectedMusic.name}" music!`);
    } else {
      toast.success("Story saved!");
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    onSave(mediaData);
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
    setTextOverlays([]);
    setStickerOverlays([]);
    setDrawings([]);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
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

        {/* Media Preview */}
        <div 
          ref={containerRef}
          className="flex-1 flex items-center justify-center p-4 overflow-hidden min-h-0 relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div 
            className="relative overflow-hidden rounded-xl"
            style={{ 
              aspectRatio: selectedAspectRatio.ratio > 0 ? selectedAspectRatio.ratio : undefined,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            onMouseDown={handleDrawStart}
            onTouchStart={handleDrawStart}
          >
            {isVideo ? (
              <video
                src={mediaData}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-200"
                style={{
                  filter: getFilterString(),
                  transform: getTransformString(),
                }}
              />
            ) : (
              <img
                src={mediaData}
                alt="Edit preview"
                className="w-full h-full object-cover transition-all duration-200"
                style={{
                  filter: getFilterString(),
                  transform: getTransformString(),
                }}
              />
            )}

            {/* Text Overlays */}
            {textOverlays.map((overlay) => (
              <div
                key={overlay.id}
                className="absolute cursor-move select-none group"
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: `${overlay.fontSize}px`,
                  color: overlay.color,
                  fontFamily: overlay.fontFamily,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
                onMouseDown={(e) => handleTextDrag(overlay.id, e)}
                onTouchStart={(e) => handleTextDrag(overlay.id, e)}
              >
                {overlay.text}
                <button
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); removeTextOverlay(overlay.id); }}
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}

            {/* Sticker Overlays */}
            {stickerOverlays.map((sticker) => (
              <div
                key={sticker.id}
                className="absolute cursor-move select-none group"
                style={{
                  left: `${sticker.x}%`,
                  top: `${sticker.y}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: `${sticker.size}px`,
                }}
                onMouseDown={(e) => handleStickerDrag(sticker.id, e)}
                onTouchStart={(e) => handleStickerDrag(sticker.id, e)}
              >
                {sticker.emoji}
                <button
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}

            {/* Drawing Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {drawings.map((drawing) => (
                <path
                  key={drawing.id}
                  d={`M ${drawing.points.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                  fill="none"
                  stroke={drawing.color}
                  strokeWidth={drawing.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {currentPath.length > 0 && (
                <path
                  d={`M ${currentPath.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                  fill="none"
                  stroke={drawColor}
                  strokeWidth={drawWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>

            {/* Music indicator */}
            {selectedMusic && (
              <div 
                className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary" />
                )}
                <Music className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white text-sm truncate">{selectedMusic.name} - {selectedMusic.artist}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Edit Controls */}
        <div className="bg-black/80 p-4 space-y-4 shrink-0 max-h-[45vh] overflow-y-auto">
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
              variant={editMode === "text" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "text" ? null : "text")}
              className={cn(
                "shrink-0",
                editMode === "text" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Type className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button
              variant={editMode === "sticker" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "sticker" ? null : "sticker")}
              className={cn(
                "shrink-0",
                editMode === "sticker" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Smile className="h-4 w-4 mr-2" />
              Stickers
            </Button>
            <Button
              variant={editMode === "draw" ? "default" : "ghost"}
              size="sm"
              onClick={() => setEditMode(editMode === "draw" ? null : "draw")}
              className={cn(
                "shrink-0",
                editMode === "draw" ? "gradient-primary" : "text-white hover:bg-white/20"
              )}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Draw
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
                        width: ratio.ratio > 1 ? 32 : ratio.ratio === 0 ? 32 : 24 * ratio.ratio,
                        height: ratio.ratio > 1 ? 32 / ratio.ratio : ratio.ratio === 0 ? 24 : 24,
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
                      {!isVideo && (
                        <img
                          src={mediaData}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                      )}
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

          {/* Text Controls */}
          {editMode === "text" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="Enter text..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button onClick={addTextOverlay} size="icon" className="gradient-primary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Font Size</span>
                  <span>{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  onValueChange={([val]) => setFontSize(val)}
                  min={16}
                  max={72}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Font Family */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {fontFamilies.map((font) => (
                  <button
                    key={font}
                    onClick={() => setFontFamily(font)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all",
                      fontFamily === font
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </button>
                ))}
              </div>

              {/* Text Color */}
              <div className="flex gap-2">
                {textColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      textColor === color ? "border-primary scale-110" : "border-white/30"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Active Text Overlays */}
              {textOverlays.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-white/70">Added texts (drag to move):</p>
                  <div className="flex flex-wrap gap-2">
                    {textOverlays.map((t) => (
                      <div key={t.id} className="flex items-center gap-1 bg-white/10 rounded px-2 py-1">
                        <span className="text-white text-sm truncate max-w-[100px]">{t.text}</span>
                        <button onClick={() => removeTextOverlay(t.id)}>
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Sticker Controls */}
          {editMode === "sticker" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-white/70">Tap a sticker to add it, drag to move:</p>
              <div className="grid grid-cols-8 gap-2">
                {stickers.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addSticker(emoji)}
                    className="text-2xl p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Active Stickers */}
              {stickerOverlays.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {stickerOverlays.map((s) => (
                    <div key={s.id} className="flex items-center gap-1 bg-white/10 rounded px-2 py-1">
                      <span className="text-xl">{s.emoji}</span>
                      <button onClick={() => removeSticker(s.id)}>
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Drawing Controls */}
          {editMode === "draw" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-white/70">Draw on the image above:</p>
              
              {/* Draw Color */}
              <div className="flex gap-2 items-center">
                <span className="text-xs text-white/70">Color:</span>
                {drawColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setDrawColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      drawColor === color ? "border-primary scale-110" : "border-white/30"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Brush Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Brush Size</span>
                  <span>{drawWidth}px</span>
                </div>
                <Slider
                  value={[drawWidth]}
                  onValueChange={([val]) => setDrawWidth(val)}
                  min={2}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearDrawings}
                className="text-white border-white/30 hover:bg-white/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Drawings
              </Button>
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
                    <div 
                      className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center cursor-pointer"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Play className="h-5 w-5 text-primary-foreground" />
                      )}
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
