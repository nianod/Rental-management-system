// app/page.tsx
import HeroSection from './components/ui/HeroSection';
import AvailableRooms from './components/ui/AvailableRooms';
import FeaturesSection from './components/ui/FeaturesSection';
import TestimonialsSection from './components/ui/TestimonialsSection';
import CTASection from './components/ui/CTAsection';
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#060219]">
      <HeroSection />
      <AvailableRooms />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}