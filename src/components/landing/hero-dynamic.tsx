"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const HeroContent = dynamic(() => import('@/components/landing/hero'), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center"><Skeleton className="h-4/5 w-4/5" /></div>,
  ssr: false,
});

export default function Hero() {
  return <HeroContent />;
}
