// components/landing/RoomCard.tsx
'use client';

import Image from 'next/image';
import type { Room } from '@/app/types';
import { Button } from '@/components/ui/button';
import { 
  Bed, 
  Bath, 
  Square, 
  Wifi, 
  Car, 
  Droplets,
  CheckCircle
} from 'lucide-react';
import BookingModal from './BookingModal'; 
import { useState } from 'react';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const features = [
    { icon: Bed, label: `${room.bedrooms} Bed${room.bedrooms > 1 ? 's' : ''}` },
    { icon: Bath, label: `${room.bathrooms} Bath${room.bathrooms > 1 ? 's' : ''}` },
    { icon: Square, label: `${room.size} sq ft` },
  ];
  
  const amenities = [
    room.hasWifi && { icon: Wifi, label: 'WiFi' },
    room.hasParking && { icon: Car, label: 'Parking' },
    room.hasWater && { icon: Droplets, label: '24/7 Water' },
  ].filter(Boolean);

  return (
    <>
      <div className="group overflow-hidden rounded-xl border shadow-lg transition-all hover:shadow-2xl">
        {/* Room image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={room.images[0] || '/room-placeholder.jpg'}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status badge */}
          <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Available Now
          </div>
          {/* Price badge */}
          <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-4 py-2 backdrop-blur-sm">
            <span className="text-2xl font-bold text-primary">${room.price}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        </div>
        
        {/* Room details */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="mb-2 text-xl font-bold">{room.name}</h3>
            <p className="text-muted-foreground line-clamp-2">{room.description}</p>
          </div>
          
          {/* Features */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
          
          {/* Amenities */}
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-semibold">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1"
                >
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs">{amenity?.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Book button */}
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Book This Room
          </Button>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        room={room}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
}

export default RoomCard;