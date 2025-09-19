import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-purple-700"></div>
        <div className="h-32 bg-gradient-to-r from-accent to-cyan-400 blur-[106px] dark:to-indigo-600"></div>
      </div>
      <div className="container relative mx-auto px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Rock-Solid Node Validation
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Secure, reliable, and high-performance validation services for the world's leading decentralized networks. Focus on your project, we'll handle the nodes.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#contact">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#dashboard">View Performance</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
