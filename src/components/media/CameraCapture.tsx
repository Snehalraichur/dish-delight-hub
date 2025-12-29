import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, RotateCcw, Check, Aperture, RefreshCw, Video, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (mediaData: string, isVideo?: boolean) => void;
}

export const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const startCamera = useCallback(async () => {
    try {
      setPermissionDenied(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: mode === "video",
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error: any) {
      console.error("Camera access error:", error);
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setPermissionDenied(true);
        toast.error("Camera permission denied. Please allow camera access in your browser settings.");
      } else {
        toast.error("Could not access camera. Please try again.");
      }
    }
  }, [facingMode, mode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (isOpen && !capturedImage && !capturedVideo) {
      // Stop existing stream first when mode changes (to get audio for video mode)
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        // Small delay to ensure camera is released before restarting
        setTimeout(() => {
          startCamera();
        }, 100);
      } else {
        startCamera();
      }
    }
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen, facingMode, capturedImage, capturedVideo, mode]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
    stopCamera();
    
    setTimeout(() => setIsCapturing(false), 200);
  };

  const startRecording = () => {
    if (!stream) return;
    
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      setCapturedVideo(videoUrl);
      stopCamera();
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const retakeMedia = useCallback(() => {
    setCapturedImage(null);
    setCapturedVideo(null);
    setTimeout(() => {
      startCamera();
    }, 100);
  }, [startCamera]);

  const confirmMedia = () => {
    if (capturedImage) {
      onCapture(capturedImage, false);
    } else if (capturedVideo) {
      onCapture(capturedVideo, true);
    }
    setCapturedImage(null);
    setCapturedVideo(null);
    stopCamera();
    onClose();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setCapturedVideo(null);
    setIsRecording(false);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const hasCapturedMedia = capturedImage || capturedVideo;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <span className="text-white font-medium text-lg">
              {hasCapturedMedia ? "Preview" : mode === "photo" ? "Photo" : "Video"}
            </span>
            {isRecording && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {formatTime(recordingTime)}
              </span>
            )}
          </div>
          {!hasCapturedMedia ? (
            <Button variant="ghost" size="icon" onClick={switchCamera} className="text-white hover:bg-white/20">
              <RefreshCw className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Camera View / Captured Media */}
        <div className="absolute inset-0 flex items-center justify-center">
          {permissionDenied ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <Camera className="h-16 w-16 text-white/50" />
              <p className="text-white text-lg">Camera access denied</p>
              <p className="text-white/70 text-sm">Please enable camera permissions in your browser settings and try again.</p>
              <Button onClick={startCamera} variant="secondary">
                Try Again
              </Button>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          ) : capturedVideo ? (
            <video
              src={capturedVideo}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Mode Toggle - Only when not captured and not recording */}
        {!hasCapturedMedia && !isRecording && (
          <div className="absolute bottom-32 left-0 right-0 z-10 flex justify-center">
            <div className="flex gap-8">
              <button
                onClick={() => setMode("photo")}
                className={cn(
                  "text-sm font-medium transition-all",
                  mode === "photo" ? "text-white" : "text-white/50"
                )}
              >
                Photo
              </button>
              <button
                onClick={() => setMode("video")}
                className={cn(
                  "text-sm font-medium transition-all",
                  mode === "video" ? "text-white" : "text-white/50"
                )}
              >
                Video
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 pb-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="flex items-center justify-center gap-8">
            {hasCapturedMedia ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={retakeMedia}
                  className="h-14 px-6 bg-transparent border-white text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Retake
                </Button>
                <Button
                  size="lg"
                  onClick={confirmMedia}
                  className="h-14 px-8 gradient-primary"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Use {capturedImage ? "Photo" : "Video"}
                </Button>
              </>
            ) : mode === "photo" ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={capturePhoto}
                disabled={permissionDenied || !stream}
                className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                  isCapturing ? "bg-white/50" : "bg-transparent hover:bg-white/10"
                } disabled:opacity-50`}
              >
                <Aperture className={`h-10 w-10 text-white transition-transform ${isCapturing ? "scale-110" : ""}`} />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={permissionDenied || !stream}
                className={cn(
                  "w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all disabled:opacity-50",
                  isRecording ? "border-red-500 bg-red-500/20" : "border-white bg-transparent hover:bg-white/10"
                )}
              >
                {isRecording ? (
                  <Square className="h-8 w-8 text-red-500 fill-red-500" />
                ) : (
                  <Video className="h-10 w-10 text-white" />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
