"use client"

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    quote: "NodeGuardian's reliability is unmatched. We've had zero downtime since switching, which is critical for our staking operations.",
    name: 'Alex Johnson',
    title: 'CTO, DeFi Innovators',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageHint,
  },
  {
    quote: "The performance and low latency of their nodes have given us a competitive edge. Their support team is also incredibly responsive and knowledgeable.",
    name: 'Samantha Lee',
    title: 'Lead Protocol Engineer, ChainCore',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageHint,
  },
  {
    quote: "As a developer, I appreciate the easy integration and clear documentation. NodeGuardian makes running infrastructure a breeze.",
    name: 'David Chen',
    title: 'Founder, NFT Marketplace XYZ',
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageHint,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by the Best
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what our partners have to say about our validation services.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-start justify-between p-6 h-full">
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                      <div className="mt-4 flex items-center">
                        <Avatar className="h-10 w-10">
                           {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />}
                           <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
