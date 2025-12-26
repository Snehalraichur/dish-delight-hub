import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Tag, Trophy, ChefHat, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Utensils,
    title: 'Discover Dishes',
    description: 'Find amazing food from local restaurants near you',
  },
  {
    icon: Tag,
    title: 'Exclusive Deals',
    description: 'Save with special offers and limited-time promotions',
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Collect points and unlock exclusive perks',
  },
  {
    icon: ChefHat,
    title: 'For Restaurants',
    description: 'Grow your business with powerful tools',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gradient"
            >
              SnapDish
            </motion.h1>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>The #1 Food Discovery Platform</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6"
            >
              Discover. Share.
              <br />
              <span className="text-gradient">Save on Food.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Join millions of food lovers discovering the best dishes, exclusive deals, and earning rewards at their favorite restaurants.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signup/restaurant">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <ChefHat className="w-5 h-5" />
                  For Restaurants
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-amber border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">2M+ Users</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                ))}
                <span className="text-sm font-medium ml-2">4.9 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-lg"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to discover your next favorite dish?
            </h3>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join SnapDish today and start saving on amazing food from local restaurants.
            </p>
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-card text-foreground hover:bg-card/90"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SnapDish. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign Up
              </Link>
              <Link to="/signup/restaurant" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                For Restaurants
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
