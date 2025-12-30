import { motion } from 'framer-motion';
import { Sparkles, Users, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AutoDealTagProps {
  dealId: string;
  discount: string;
  restaurantName: string;
  claimCount?: number;
  remaining?: number;
  onClick?: () => void;
}

export function AutoDealTag({ dealId, discount, restaurantName, claimCount = 0, remaining }: AutoDealTagProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute top-3 right-3 z-10 cursor-default"
          >
            <div className="bg-gradient-to-r from-coral to-orange px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-bold text-white text-sm">{discount}</span>
              {claimCount > 0 && (
                <Badge variant="secondary" className="bg-white/20 text-white text-xs ml-1">
                  <Users className="w-3 h-3 mr-1" />
                  {claimCount}
                </Badge>
              )}
              {remaining !== undefined && (
                <Badge variant="secondary" className="bg-white/20 text-white text-xs ml-1">
                  <Gift className="w-3 h-3 mr-1" />
                  {remaining > 0 ? remaining : 'Sold out'}
                </Badge>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-card text-foreground border border-border">
          <p className="font-semibold">{discount} at {restaurantName}</p>
          <p className="text-sm text-muted-foreground">
            {claimCount} people claimed
            {remaining !== undefined && ` • ${remaining > 0 ? `${remaining} remaining` : 'Sold out'}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
