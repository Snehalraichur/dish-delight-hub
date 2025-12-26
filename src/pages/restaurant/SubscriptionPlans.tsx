import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight, Shield, Clock, Users, TrendingUp } from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for getting started',
    highlighted: false,
    features: [
      { text: 'Up to 3 active deals', included: true },
      { text: 'Basic analytics', included: true },
      { text: '100 deal redemptions/month', included: true },
      { text: 'Email support', included: true },
      { text: 'Priority placement', included: false },
      { text: 'Boost campaigns', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'API access', included: false },
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: Star,
    price: { monthly: 49, yearly: 470 },
    description: 'Best for growing restaurants',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'Up to 10 active deals', included: true },
      { text: 'Advanced analytics', included: true },
      { text: '500 deal redemptions/month', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Priority placement', included: true },
      { text: '2 boost campaigns/month', included: true },
      { text: 'UGC management', included: true },
      { text: 'API access', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    price: { monthly: 149, yearly: 1430 },
    description: 'For established businesses',
    highlighted: false,
    features: [
      { text: 'Unlimited active deals', included: true },
      { text: 'Full analytics suite', included: true },
      { text: 'Unlimited redemptions', included: true },
      { text: '24/7 priority support', included: true },
      { text: 'Top placement', included: true },
      { text: 'Unlimited boost campaigns', included: true },
      { text: 'White-label options', included: true },
      { text: 'Full API access', included: true },
    ]
  },
];

const benefits = [
  { icon: TrendingUp, title: 'Increase Revenue', description: 'Restaurants see 35% more foot traffic' },
  { icon: Users, title: 'Reach More Customers', description: 'Access to 2M+ active users' },
  { icon: Shield, title: 'Fraud Protection', description: 'Advanced redemption verification' },
  { icon: Clock, title: 'Save Time', description: 'Automated deal management' },
];

export default function SubscriptionPlans() {
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan] = useState('starter');

  return (
    <RestaurantLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground">
            Scale your restaurant's reach with the right plan for your business
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
            <Badge variant="secondary" className="ml-2 bg-fresh/10 text-fresh">
              Save 20%
            </Badge>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="gradient-primary text-primary-foreground px-4">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <Card className={`border-2 h-full ${
                plan.highlighted 
                  ? 'border-primary shadow-elegant' 
                  : 'border-border'
              } ${currentPlan === plan.id ? 'ring-2 ring-fresh ring-offset-2' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    plan.highlighted ? 'gradient-primary' : 'bg-muted'
                  }`}>
                    <plan.icon className={`w-6 h-6 ${plan.highlighted ? 'text-primary-foreground' : 'text-foreground'}`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {isYearly && plan.price.yearly > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed ${plan.price.yearly}/year
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.included ? 'bg-fresh/10' : 'bg-muted'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            feature.included ? 'text-fresh' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.highlighted ? 'gradient' : 'outline'} 
                    className="w-full"
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? (
                      'Current Plan'
                    ) : (
                      <>
                        {plan.price.monthly === 0 ? 'Get Started' : 'Upgrade'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="pt-8">
          <h2 className="text-xl font-bold text-foreground text-center mb-6">
            Why Upgrade?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="border-border text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ / Contact */}
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Need a custom plan?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our sales team for enterprise pricing and custom solutions.
            </p>
            <Button variant="outline">
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
