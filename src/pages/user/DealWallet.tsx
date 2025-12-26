import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Clock, Tag, MapPin, ChevronRight, Ticket, Gift, Star } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const claimedDeals = [
  {
    id: '1',
    restaurant: 'The Golden Fork',
    deal: '25% Off Dinner',
    code: 'GOLD25',
    expiresIn: '2h 30m',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    status: 'active',
  },
  {
    id: '2',
    restaurant: 'Sakura Sushi',
    deal: 'Free Dessert',
    code: 'SAKURA10',
    expiresIn: '5h 15m',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop',
    status: 'active',
  },
  {
    id: '3',
    restaurant: 'Bella Italia',
    deal: '15% Off Any Pizza',
    code: 'PIZZA15',
    expiresIn: '1d 4h',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=200&h=200&fit=crop',
    status: 'active',
  },
];

const redeemedDeals = [
  {
    id: '4',
    restaurant: 'Burger Joint',
    deal: 'Buy 1 Get 1 Free',
    redeemedAt: 'Dec 20, 2024',
    saved: '$12.99',
  },
  {
    id: '5',
    restaurant: 'Taco Town',
    deal: '30% Off Orders $25+',
    redeemedAt: 'Dec 18, 2024',
    saved: '$8.50',
  },
];

const loyaltyPoints = 2450;
const nextTierPoints = 5000;

export default function DealWallet() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Deal Wallet</h1>
          <p className="text-muted-foreground">Your claimed deals and rewards</p>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-sunset rounded-3xl p-6 text-primary-foreground mb-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Reward Points</p>
                <p className="text-3xl font-bold">{loyaltyPoints.toLocaleString()}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30">
              Redeem
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Progress to Gold Tier</span>
              <span className="font-medium">{loyaltyPoints}/{nextTierPoints}</span>
            </div>
            <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-foreground rounded-full transition-all duration-500"
                style={{ width: `${(loyaltyPoints / nextTierPoints) * 100}%` }}
              />
            </div>
            <p className="text-xs opacity-70">{nextTierPoints - loyaltyPoints} points until Gold tier</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full h-12 bg-muted rounded-2xl p-1 mb-6">
            <TabsTrigger value="active" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Ticket className="w-4 h-4 mr-2" />
              Active ({claimedDeals.length})
            </TabsTrigger>
            <TabsTrigger value="redeemed" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Gift className="w-4 h-4 mr-2" />
              Redeemed ({redeemedDeals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {claimedDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={cn(
                  "bg-card rounded-2xl border border-border overflow-hidden shadow-md transition-all",
                  selectedDeal === deal.id && "ring-2 ring-primary"
                )}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={deal.image}
                      alt={deal.restaurant}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{deal.restaurant}</h3>
                      <p className="text-lg font-bold text-primary">{deal.deal}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span>Expires in {deal.expiresIn}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDeal(selectedDeal === deal.id ? null : deal.id)}
                      className="self-center"
                    >
                      <ChevronRight className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        selectedDeal === deal.id && "rotate-90"
                      )} />
                    </button>
                  </div>

                  {/* QR Code Section */}
                  {selectedDeal === deal.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-40 h-40 bg-muted rounded-2xl flex items-center justify-center mb-4">
                          <QrCode className="w-24 h-24 text-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Show this code at checkout</p>
                        <div className="bg-muted rounded-xl px-4 py-2 font-mono font-bold text-lg text-foreground">
                          {deal.code}
                        </div>
                        <Button variant="hero" className="w-full mt-4 rounded-xl">
                          Mark as Redeemed
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="redeemed" className="space-y-4">
            {redeemedDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-card rounded-2xl border border-border p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{deal.restaurant}</h3>
                    <p className="text-muted-foreground">{deal.deal}</p>
                    <p className="text-sm text-muted-foreground mt-1">Redeemed: {deal.redeemedAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">You saved</p>
                    <p className="text-lg font-bold text-fresh">{deal.saved}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Total saved: <span className="font-bold text-fresh">$21.49</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
