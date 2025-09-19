import Header from '@/components/common/header';
import Hero from '@/components/landing/hero';
import ServiceShowcase from '@/components/landing/service-showcase';
import PerformanceDashboard from '@/components/landing/performance-dashboard';
import SecurityAudits from '@/components/landing/security-audits';
import CostCalculator from '@/components/landing/cost-calculator';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/common/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServiceShowcase />
        <PerformanceDashboard />
        <SecurityAudits />
        <CostCalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
