import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Globe } from 'lucide-react';

const services = [
  {
    name: 'Ethereum',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-accent"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
    description: 'High-uptime validation for Ethereum PoS, including staking and MEV-Boost.',
    tags: ['Staking', 'MEV'],
  },
  {
    name: 'Solana',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 22s-4-2-4-5V8"></path><path d="M16 17s-4-2-4-5V8"></path></svg>,
    description: 'Low-latency, high-throughput validation for the Solana ecosystem.',
    tags: ['RPC', 'High-Speed'],
  },
  {
    name: 'Cosmos Hub',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-accent"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line></svg>,
    description: 'Secure validation for the interchain, supporting governance and relaying.',
    tags: ['IBC', 'Governance'],
  },
  {
    name: 'Polkadot',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-accent"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>,
    description: 'Reliable collator and validator nodes for Polkadot and its parachains.',
    tags: ['Parachains', 'NPoS'],
  }
];

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Peak Performance',
    description: 'We ensure low latency and high uptime for maximum rewards and network stability.'
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'Institutional-Grade Security',
    description: 'Multi-layered security protocols to protect against attacks and ensure validator integrity.'
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Global Distribution',
    description: 'Geographically distributed infrastructure for resilience and optimal network peering.'
  }
]

export default function ServiceShowcase() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Validation Services for Leading Networks
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide robust and secure infrastructure for the most critical blockchain networks.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.name} className="flex flex-col text-center items-center transform hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                {service.icon}
                <CardTitle className="font-headline mt-4">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <div className="flex justify-center gap-2">
                  {service.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-5 font-headline text-lg font-medium text-foreground">{feature.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
