import HeroSection from '@/components/sections/HeroSection';
import CFPSection from '@/components/sections/CFPSection';
import TicketsSection from '@/components/sections/TicketsSection';
import SpeakersSection from '@/components/sections/SpeakersSection';
import AboutSection from '@/components/sections/AboutSection';
import LocationSection from '@/components/sections/LocationSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CFPSection background="primary" />
      <TicketsSection background="secondary" />
      <SpeakersSection background="primary" />
      <AboutSection background="secondary" />
      <LocationSection background="primary" />
      <NewsletterSection background="accent" />
    </>
  );
}
