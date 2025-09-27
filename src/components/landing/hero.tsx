"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const getStartedBtnRef = useRef(null);
  const ourServicesBtnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    tl.fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.7');
    tl.fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7');

    // Get Started Button Animation
    if (getStartedBtnRef.current) {
      const getStartedBtn = getStartedBtnRef.current;
      const arrow = getStartedBtn.querySelector('.arrow-icon');
      
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(arrow, { x: 5, duration: 0.3, ease: 'power2.inOut' });

      getStartedBtn.addEventListener('mouseenter', () => hoverTl.play());
      getStartedBtn.addEventListener('mouseleave', () => hoverTl.reverse());
    }

    // Our Services Button Animation
    if (ourServicesBtnRef.current) {
      const ourServicesBtn = ourServicesBtnRef.current;
      
      ourServicesBtn.addEventListener('mouseenter', () => {
        gsap.to(ourServicesBtn, { y: -3, duration: 0.3, ease: 'power2.out' });
      });
      ourServicesBtn.addEventListener('mouseleave', () => {
        gsap.to(ourServicesBtn, { y: 0, duration: 0.3, ease: 'power2.out' });
      });
    }

  }, []);

  return (
    <section className="relative overflow-hidden" ref={heroRef}>
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-purple-700"></div>
        <div className="h-32 bg-gradient-to-r from-accent to-cyan-400 blur-[106px] dark:to-indigo-600"></div>
      </div>
      <div className="container relative mx-auto px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl hero-title">
          Rock-Solid Node Validation
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground hero-description">
          Secure, reliable, and high-performance validation services for the world's leading decentralized networks. As an independent node runner, we focus on your project, so you can handle the nodes.
        </p>
        <div className="mt-8 flex justify-center gap-4 hero-buttons">
          <Button asChild size="lg" ref={getStartedBtnRef}>
            <Link href="#contact">
              Get Started <ArrowRight className="ml-2 h-4 w-4 arrow-icon" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" ref={ourServicesBtnRef}>
            <Link href="#services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
