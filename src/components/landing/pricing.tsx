import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Hobbyist',
    price: '$99',
    description: 'For individuals and small projects getting started.',
    features: [
      '1 Validator Node',
      'Community Support',
      'Basic Monitoring',
      '99.5% Uptime SLA',
    ],
    isPopular: false,
  },
  {
    name: 'Professional',
    price: '$499',
    description: 'For growing projects that require high performance.',
    features: [
      'Up to 5 Validator Nodes',
      'Priority Email Support',
      'Advanced Monitoring & Alerts',
      '99.9% Uptime SLA',
      'MEV-Boost Enabled',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale applications with custom needs.',
    features: [
      'Unlimited Nodes',
      'Dedicated Support & SLA',
      'Custom Infrastructure',
      'Geo-Redundancy',
      'White-glove Onboarding',
    ],
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Flexible Plans for Every Scale
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the right plan for your needs. All plans are backed by our institutional-grade infrastructure.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-8 items-stretch">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
              <CardHeader className={plan.isPopular ? 'bg-primary/5' : ''}>
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow py-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/mo per node</span>}
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                  <a href="#contact">{plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
