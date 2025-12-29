import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, RotateCcw, Check, Aperture, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

export const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setPermissionDenied(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: false,
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
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen, facingMode, capturedImage]);

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
    
    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Get image data
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
    stopCamera();
    
    setTimeout(() => setIsCapturing(false), 200);
  };

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    // Small delay to ensure state is cleared before starting camera
    setTimeout(() => {
      startCamera();
    }, 100);
  }, [startCamera]);

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      stopCamera();
      onClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  };

  if (!isOpen) return null;

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
          <span className="text-white font-medium text-lg">
            {capturedImage ? "Preview" : "Take Photo"}
          </span>
          {!capturedImage ? (
            <Button variant="ghost" size="icon" onClick={switchCamera} className="text-white hover:bg-white/20">
              <RefreshCw className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Camera View / Captured Image */}
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

        {/* Controls - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 pb-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="flex items-center justify-center gap-8">
            {capturedImage ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={retakePhoto}
                  className="h-14 px-6 bg-transparent border-white text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Retake
                </Button>
                <Button
                  size="lg"
                  onClick={confirmPhoto}
                  className="h-14 px-8 gradient-primary"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Use Photo
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
