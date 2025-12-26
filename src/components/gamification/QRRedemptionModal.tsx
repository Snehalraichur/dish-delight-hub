import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Check, Clock, MapPin, Tag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface QRRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: {
    id: string;
    name: string;
    discount: string;
    restaurant: string;
    location: string;
    expiresAt: Date;
    qrCode?: string;
  };
  onRedeem?: () => void;
}

export function QRRedemptionModal({ isOpen, onClose, deal, onRedeem }: QRRedemptionModalProps) {
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = deal.expiresAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isOpen, deal.expiresAt]);

  const handleRedeem = () => {
    setIsRedeemed(true);
    setPointsEarned(Math.floor(Math.random() * 50) + 25); // Random points between 25-75
    onRedeem?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isRedeemed ? (
            <motion.div
              key="qr-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{deal.discount}</h2>
                <p className="text-sm text-muted-foreground">{deal.name}</p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-2xl mb-6 mx-auto w-fit">
                <div className="w-48 h-48 bg-foreground rounded-lg flex items-center justify-center">
                  {/* Simulated QR Code Pattern */}
                  <div className="grid grid-cols-8 gap-0.5 p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-4 h-4 rounded-sm",
                          Math.random() > 0.5 ? "bg-white" : "bg-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Show this to staff
                </p>
              </div>

              {/* Deal Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{deal.restaurant} • {deal.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-coral/10 rounded-xl">
                  <Clock className="w-5 h-5 text-coral" />
                  <span className="font-mono font-bold text-lg text-coral">
                    {String(countdown.hours).padStart(2, '0')}:
                    {String(countdown.minutes).padStart(2, '0')}:
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-coral">left</span>
                </div>
              </div>

              {/* Redeem Button */}
              <Button 
                variant="gradient" 
                className="w-full h-12"
                onClick={handleRedeem}
              >
                <QrCode className="w-5 h-5 mr-2" />
                Confirm Redemption
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-fresh mx-auto mb-6 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">Deal Redeemed!</h2>
                <p className="text-muted-foreground mb-6">
                  Enjoy your {deal.discount} at {deal.restaurant}
                </p>

                {/* Points Earned */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-amber/20 to-orange/20 rounded-2xl p-4 mb-6"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-amber" />
                    <span className="text-2xl font-bold text-foreground">+{pointsEarned}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">points earned!</p>
                </motion.div>

                <Button variant="outline" className="w-full" onClick={onClose}>
                  Done
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
