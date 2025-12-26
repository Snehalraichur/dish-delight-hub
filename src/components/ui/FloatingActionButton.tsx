import { motion } from 'framer-motion';
import { Plus, X, Camera, MapPin, Tag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  onMainClick?: () => void;
}

export function FloatingActionButton({ actions, onMainClick }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultActions: FABAction[] = [
    { icon: <Camera className="w-5 h-5" />, label: 'Photo', onClick: () => console.log('Photo') },
    { icon: <MapPin className="w-5 h-5" />, label: 'Check-in', onClick: () => console.log('Check-in') },
    { icon: <Tag className="w-5 h-5" />, label: 'Deal', onClick: () => console.log('Deal') },
  ];

  const fabActions = actions || defaultActions;

  const handleMainClick = () => {
    if (onMainClick) {
      onMainClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 z-40">
      {/* Action Buttons */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute bottom-16 right-0 flex flex-col-reverse gap-3"
        >
          {fabActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 bg-card shadow-lg rounded-full pr-4 pl-3 py-2 border border-border hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                {action.icon}
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMainClick}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          isOpen
            ? "bg-muted-foreground text-primary-foreground rotate-45"
            : "gradient-primary text-primary-foreground shadow-glow"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
