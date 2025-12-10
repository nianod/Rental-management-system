// components/landing/HeroSection.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-apartment.jpg"
          alt="Titan Rental Apartments"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Welcome to <span className="text-primary">Titan Rental</span>
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Premium living spaces designed for comfort and convenience
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              View Available Rooms
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule a Tour
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-px bg-white"></div>
      </div>
    </section>
  );
}