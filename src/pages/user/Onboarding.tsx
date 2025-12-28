import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Utensils, Gift, Users, Sparkles } from 'lucide-react';

const onboardingSteps = [
  {
    icon: Utensils,
    title: 'Discover Amazing Food',
    description: 'Explore dishes from local restaurants, browse photos from real foodies, and find your next favorite meal.',
    color: 'bg-orange-500',
  },
  {
    icon: Gift,
    title: 'Unlock Exclusive Deals',
    description: 'Get access to special discounts, loyalty rewards, and limited-time offers from your favorite spots.',
    color: 'bg-primary',
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Share your food adventures, follow fellow foodies, and build your foodie reputation.',
    color: 'bg-green-500',
  },
  {
    icon: Sparkles,
    title: 'Earn While You Eat',
    description: 'Collect points with every interaction, unlock badges, and climb the loyalty tiers for premium perks.',
    color: 'bg-purple-500',
  },
];

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/home');
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <Badge variant="secondary">
          {currentStep + 1} of {onboardingSteps.length}
        </Badge>
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 text-center space-y-6">
                <div className={`mx-auto w-24 h-24 ${step.color} rounded-full flex items-center justify-center`}>
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 py-4">
        {onboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="p-6 flex gap-4">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="flex-1">
          {currentStep === onboardingSteps.length - 1 ? "Let's Go!" : 'Next'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default UserOnboarding;
