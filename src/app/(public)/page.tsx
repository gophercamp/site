import HeroSection from '@/components/sections/HeroSection';
import CFPSection from '@/components/sections/CFPSection';
import TicketsSection from '@/components/sections/TicketsSection';
import AboutSection from '@/components/sections/AboutSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CFPSection />
      <TicketsSection />
      <AboutSection />
      <NewsletterSection />
    </>
  );
}
