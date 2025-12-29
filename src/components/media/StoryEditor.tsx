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
  ZoomIn,
  Sparkles,
  Trash2,
  Play,
  Pause,
  AtSign,
  Upload,
  PaintBucket
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
  width: number;
  isEditing: boolean;
  isTag: boolean;
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

const textColors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#FF5A36"];
const drawColors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#FFA500"];
const fontFamilies = ["Arial", "Georgia", "Courier New", "Comic Sans MS", "Impact", "Verdana"];
const brushPresets = [
  { name: "Fine", width: 2 },
  { name: "Medium", width: 6 },
  { name: "Thick", width: 12 },
  { name: "Marker", width: 20 },
];

const stickers = ["😀", "😍", "🔥", "❤️", "⭐", "🎉", "👍", "💯", "🌟", "✨", "🎊", "🥳", "😎", "🤩", "💪", "🙌"];

export const StoryEditor = ({ isOpen, mediaData, isVideo = false, onClose, onSave }: StoryEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [selectedFilter, setSelectedFilter] = useState(filterPresets[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatios[0]);
  const [selectedMusic, setSelectedMusic] = useState<typeof musicTracks[0] | null>(null);
  const [customMusic, setCustomMusic] = useState<{ name: string; url: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Crop state - zoom affects photo inside frame
  const [photoScale, setPhotoScale] = useState(1);
  const [photoOffset, setPhotoOffset] = useState({ x: 0, y: 0 });

  // Text overlay state
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [draggingText, setDraggingText] = useState<string | null>(null);
  const [resizingText, setResizingText] = useState<string | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  // Sticker state
  const [stickerOverlays, setStickerOverlays] = useState<StickerOverlay[]>([]);
  const [draggingSticker, setDraggingSticker] = useState<string | null>(null);

  // Drawing state
  const [drawings, setDrawings] = useState<DrawingPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#FFFFFF");
  const [drawWidth, setDrawWidth] = useState(6);
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
    const musicUrl = customMusic?.url || selectedMusic?.url;
    if (musicUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
      } else {
        audioRef.current.src = musicUrl;
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
  }, [selectedMusic, customMusic]);

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

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMusic({ name: file.name, url });
      setSelectedMusic(null);
      toast.success("Music added!");
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

  const getPhotoTransformString = () => {
    let transform = `scale(${photoScale})`;
    transform += ` translate(${photoOffset.x}px, ${photoOffset.y}px)`;
    if (rotation !== 0) {
      transform += ` rotate(${rotation}deg)`;
    }
    if (flipH) {
      transform += " scaleX(-1)";
    }
    return transform;
  };

  const addTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      text: "Tap to edit",
      x: 50,
      y: 50,
      fontSize: 24,
      color: textColor,
      fontFamily,
      width: 150,
      isEditing: true,
      isTag: false,
    };
    setTextOverlays([...textOverlays, newOverlay]);
    setSelectedTextId(newOverlay.id);
    toast.success("Text added! Tap to edit.");
  };

  const addTagOverlay = () => {
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      text: "@username",
      x: 50,
      y: 50,
      fontSize: 20,
      color: "#FF5A36",
      fontFamily: "Arial",
      width: 120,
      isEditing: true,
      isTag: true,
    };
    setTextOverlays([...textOverlays, newOverlay]);
    setSelectedTextId(newOverlay.id);
    toast.success("Tag added! Tap to edit.");
  };

  const updateTextOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setTextOverlays(overlays =>
      overlays.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  const removeTextOverlay = (id: string) => {
    setTextOverlays(textOverlays.filter(t => t.id !== id));
    if (selectedTextId === id) setSelectedTextId(null);
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
    e.preventDefault();
    e.stopPropagation();
    setIsDrawing(true);
    const point = getEventPoint(e);
    setCurrentPath([point]);
  };

  const handleDrawMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || editMode !== "draw") return;
    e.preventDefault();
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
    if (editMode === "draw") return;
    setDraggingText(id);
    setSelectedTextId(id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleStickerDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    if (editMode === "draw") return;
    setDraggingSticker(id);
    e.preventDefault();
    e.stopPropagation();
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
    const musicName = customMusic?.name || selectedMusic?.name;
    if (musicName) {
      toast.success(`Story saved with "${musicName}" music!`);
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
    setPhotoScale(1);
    setPhotoOffset({ x: 0, y: 0 });
    setSelectedMusic(null);
    setCustomMusic(null);
    setTextOverlays([]);
    setStickerOverlays([]);
    setDrawings([]);
    setSelectedTextId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const currentMusicName = customMusic?.name || selectedMusic?.name;
  const currentMusicArtist = customMusic ? "Your Music" : selectedMusic?.artist;

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
            className={cn(
              "relative overflow-hidden rounded-xl",
              editMode === "draw" && "cursor-crosshair"
            )}
            style={{ 
              aspectRatio: selectedAspectRatio.ratio > 0 ? selectedAspectRatio.ratio : undefined,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
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
                  transform: getPhotoTransformString(),
                }}
              />
            ) : (
              <img
                src={mediaData}
                alt="Edit preview"
                className="w-full h-full object-cover transition-all duration-200 select-none pointer-events-none"
                style={{
                  filter: getFilterString(),
                  transform: getPhotoTransformString(),
                }}
                draggable={false}
              />
            )}

            {/* Drawing Layer - Needs to capture events */}
            {editMode === "draw" && (
              <div 
                className="absolute inset-0 z-10"
                onMouseDown={handleDrawStart}
                onTouchStart={handleDrawStart}
                style={{ touchAction: 'none' }}
              />
            )}

            {/* SVG Drawing Canvas */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              {drawings.map((drawing) => (
                <path
                  key={drawing.id}
                  d={`M ${drawing.points.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                  fill="none"
                  stroke={drawing.color}
                  strokeWidth={drawing.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                />
              )}
            </svg>

            {/* Text Overlays */}
            {textOverlays.map((overlay) => (
              <div
                key={overlay.id}
                className={cn(
                  "absolute cursor-move select-none group z-30",
                  selectedTextId === overlay.id && "ring-2 ring-primary ring-offset-2 ring-offset-transparent"
                )}
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  transform: "translate(-50%, -50%)",
                  minWidth: `${overlay.width}px`,
                }}
                onMouseDown={(e) => handleTextDrag(overlay.id, e)}
                onTouchStart={(e) => handleTextDrag(overlay.id, e)}
                onClick={() => setSelectedTextId(overlay.id)}
              >
                {overlay.isEditing || selectedTextId === overlay.id ? (
                  <div 
                    className="relative"
                    style={{ width: overlay.width }}
                  >
                    <textarea
                      value={overlay.text}
                      onChange={(e) => updateTextOverlay(overlay.id, { text: e.target.value })}
                      onBlur={() => updateTextOverlay(overlay.id, { isEditing: false })}
                      className="w-full bg-transparent border-none outline-none resize text-center"
                      style={{
                        fontSize: `${overlay.fontSize}px`,
                        color: overlay.color,
                        fontFamily: overlay.fontFamily,
                        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        minHeight: '1.5em',
                      }}
                      autoFocus
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                    />
                    {/* Resize handle */}
                    <div 
                      className="absolute -right-2 -bottom-2 w-4 h-4 bg-primary rounded-full cursor-se-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setResizingText(overlay.id);
                        const startX = e.clientX;
                        const startWidth = overlay.width;
                        const startFontSize = overlay.fontSize;
                        
                        const handleMove = (moveEvent: MouseEvent) => {
                          const diff = moveEvent.clientX - startX;
                          const newWidth = Math.max(80, startWidth + diff);
                          const scaleFactor = newWidth / startWidth;
                          const newFontSize = Math.max(12, Math.min(72, startFontSize * scaleFactor));
                          updateTextOverlay(overlay.id, { width: newWidth, fontSize: newFontSize });
                        };
                        
                        const handleUp = () => {
                          setResizingText(null);
                          document.removeEventListener('mousemove', handleMove);
                          document.removeEventListener('mouseup', handleUp);
                        };
                        
                        document.addEventListener('mousemove', handleMove);
                        document.addEventListener('mouseup', handleUp);
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: `${overlay.fontSize}px`,
                      color: overlay.color,
                      fontFamily: overlay.fontFamily,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    }}
                    onClick={() => updateTextOverlay(overlay.id, { isEditing: true })}
                  >
                    {overlay.isTag && <AtSign className="inline h-4 w-4 mr-1" />}
                    {overlay.text}
                  </div>
                )}
                <button
                  className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-40"
                  onClick={(e) => { e.stopPropagation(); removeTextOverlay(overlay.id); }}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}

            {/* Sticker Overlays */}
            {stickerOverlays.map((sticker) => (
              <div
                key={sticker.id}
                className="absolute cursor-move select-none group z-30"
                style={{
                  left: `${sticker.x}%`,
                  top: `${sticker.y}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: `${sticker.size}px`,
                  lineHeight: 1,
                }}
                onMouseDown={(e) => handleStickerDrag(sticker.id, e)}
                onTouchStart={(e) => handleStickerDrag(sticker.id, e)}
              >
                <span className="block">{sticker.emoji}</span>
                <button
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}

            {/* Music indicator */}
            {(selectedMusic || customMusic) && (
              <div 
                className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer z-30"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary" />
                )}
                <Music className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-white text-sm truncate">{currentMusicName} - {currentMusicArtist}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file input for music upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleMusicUpload}
          className="hidden"
        />

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

              {/* Photo Zoom Slider */}
              <div className="space-y-2 px-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="h-3 w-3" /> Photo Zoom
                  </span>
                  <span>{Math.round(photoScale * 100)}%</span>
                </div>
                <Slider
                  value={[photoScale * 100]}
                  onValueChange={([val]) => setPhotoScale(val / 100)}
                  min={100}
                  max={300}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-white/50 text-center">Zoom in on the photo within the frame</p>
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
              {/* Add Text and Tag buttons */}
              <div className="flex gap-2">
                <Button onClick={addTextOverlay} className="flex-1 gradient-primary">
                  <Type className="h-4 w-4 mr-2" />
                  Add Text
                </Button>
                <Button onClick={addTagOverlay} variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">
                  <AtSign className="h-4 w-4 mr-2" />
                  Tag Friend
                </Button>
              </div>

              {/* Text Style Options - only show when text is selected */}
              {selectedTextId && (
                <>
                  {/* Font Family */}
                  <div className="space-y-2">
                    <p className="text-xs text-white/70">Font Style</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {fontFamilies.map((font) => (
                        <button
                          key={font}
                          onClick={() => {
                            setFontFamily(font);
                            if (selectedTextId) {
                              updateTextOverlay(selectedTextId, { fontFamily: font });
                            }
                          }}
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
                  </div>

                  {/* Text Color */}
                  <div className="space-y-2">
                    <p className="text-xs text-white/70">Text Color</p>
                    <div className="flex gap-2 flex-wrap">
                      {textColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setTextColor(color);
                            if (selectedTextId) {
                              updateTextOverlay(selectedTextId, { color });
                            }
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            textColor === color ? "border-primary scale-110" : "border-white/30"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Active Text Overlays */}
              {textOverlays.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-white/70">Added texts (tap to select, drag to move, resize from corner):</p>
                  <div className="flex flex-wrap gap-2">
                    {textOverlays.map((t) => (
                      <div 
                        key={t.id} 
                        className={cn(
                          "flex items-center gap-1 rounded px-2 py-1 cursor-pointer transition-all",
                          selectedTextId === t.id ? "bg-primary/30 ring-1 ring-primary" : "bg-white/10"
                        )}
                        onClick={() => setSelectedTextId(t.id)}
                      >
                        {t.isTag && <AtSign className="h-3 w-3 text-primary" />}
                        <span className="text-white text-sm truncate max-w-[100px]">{t.text}</span>
                        <button onClick={(e) => { e.stopPropagation(); removeTextOverlay(t.id); }}>
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
              <div className="grid grid-cols-8 gap-2 place-items-center">
                {stickers.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    onClick={() => addSticker(emoji)}
                    className="text-2xl p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-110 flex items-center justify-center w-12 h-12"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Active Stickers */}
              {stickerOverlays.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-white/70">Added stickers:</p>
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
              <p className="text-xs text-white/70">Draw on the image above (cursor changes to crosshair):</p>
              
              {/* Brush Presets */}
              <div className="space-y-2">
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <PaintBucket className="h-3 w-3" /> Select Brush
                </p>
                <div className="flex gap-2">
                  {brushPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setDrawWidth(preset.width)}
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                        drawWidth === preset.width
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      <div 
                        className="rounded-full bg-current"
                        style={{ 
                          width: Math.min(preset.width * 1.5, 24), 
                          height: Math.min(preset.width * 1.5, 24),
                          backgroundColor: drawWidth === preset.width ? 'white' : drawColor
                        }}
                      />
                      <span className="text-xs">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Draw Color */}
              <div className="space-y-2">
                <p className="text-xs text-white/70">Brush Color:</p>
                <div className="flex gap-2 items-center">
                  {drawColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDrawColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        drawColor === color ? "border-primary scale-110 ring-2 ring-primary ring-offset-2 ring-offset-black" : "border-white/30"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Custom Brush Size</span>
                  <span>{drawWidth}px</span>
                </div>
                <Slider
                  value={[drawWidth]}
                  onValueChange={([val]) => setDrawWidth(val)}
                  min={2}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Brush Preview */}
              <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3">
                <span className="text-xs text-white/70">Preview:</span>
                <div 
                  className="rounded-full"
                  style={{ 
                    width: drawWidth, 
                    height: drawWidth,
                    backgroundColor: drawColor,
                    boxShadow: `0 0 10px ${drawColor}`
                  }}
                />
              </div>

              {/* Clear Drawings Button */}
              {drawings.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={clearDrawings}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Drawings ({drawings.length})
                </Button>
              )}
            </motion.div>
          )}

          {/* Music Controls */}
          {editMode === "music" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 max-h-[200px] overflow-y-auto"
            >
              {/* Upload Custom Music */}
              <Button
                variant="outline"
                className="w-full border-dashed border-white/30 text-white hover:bg-white/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Your Music
              </Button>

              {/* Custom Music Display */}
              {customMusic && (
                <div className="flex items-center justify-between bg-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium truncate max-w-[150px]">{customMusic.name}</p>
                      <p className="text-white/60 text-xs">Your Music</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCustomMusic(null)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Selected Music Display */}
              {selectedMusic && !customMusic && (
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

              {/* Divider */}
              {!customMusic && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/50">or choose from library</span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>
              )}
              
              {musicTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedMusic(track);
                    setCustomMusic(null);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-all",
                    selectedMusic?.id === track.id && !customMusic
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
