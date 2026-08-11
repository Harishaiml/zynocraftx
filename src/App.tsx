import { MouseProvider } from '@/components/MouseContext';
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Capabilities from '@/components/Capabilities';
import Process from '@/components/Process';
import Work from '@/components/Work';
import WhyZynocraftx from '@/components/WhyZynocraftx';
import Technology from '@/components/Technology';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <MouseProvider>
      <CustomCursor />
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Capabilities />
          <Process />
          <Work />
          <WhyZynocraftx />
          <Technology />
          <CTA />
          <Contact />
          <FAQ />
        </main>
        <Footer />
      </div>
    </MouseProvider>
  );
}
