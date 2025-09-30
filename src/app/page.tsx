import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import Hero from '@/components/landing/hero-dynamic';

const RunningServices = dynamic(() => import('@/components/landing/running-services'), {
    loading: () => <div className="h-[500px] w-full flex items-center justify-center"><Skeleton className="h-4/5 w-4/5" /></div>,
});

const Team = dynamic(() => import('@/components/landing/team'), {
  loading: () => <div className="h-[600px] w-full flex items-center justify-center"><Skeleton className="h-4/5 w-4/5" /></div>,
});

const ContactForm = dynamic(() => import('@/components/landing/contact-form'), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center"><Skeleton className="h-4/5 w-4/5" /></div>,
});


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <RunningServices />
        <Team />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
