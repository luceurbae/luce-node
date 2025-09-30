
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export type Service = {
  title: string;
  description: string;
  link: string;
};

type RunningServicesProps = {
  services: Service[];
};

export default function RunningServices({ services }: RunningServicesProps) {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];

    if (section) {
      gsap.fromTo(
        cards,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    cards.forEach(card => {
        if (card) {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
            });
        }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [services]);

  return (
    <section id="running-services" className="py-16 sm:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Live Validation Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A real-time look at the networks we are actively securing right now.
          </p>
        </div>
        {services.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Could not load services from Notion.</p>
            <p>Please ensure your Notion API Key and Database ID are correct and the integration has access to the database.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                ref={el => cardsRef.current[index] = el}
                style={{ opacity: 0 }} // Start with opacity 0 for GSAP animation
              >
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={service.link} target="_blank" rel="noopener noreferrer">
                        View on Explorer <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
