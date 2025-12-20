'use client' //Client component

import { useState } from 'react';
import { Check, Wifi, Car, Droplets, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import { availableRooms } from '@/app/lib/data';
import Button from './Button';
import type { Room } from '@/app/types/data';

const RoomCard = ({ room }: { room: Room }) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('WiFi')) return <Wifi className="w-4 h-4" />;
    if (feature.includes('Parking')) return <Car className="w-4 h-4" />;
    if (feature.includes('Bath')) return <Droplets className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 hover:shadow-xl hover:shadow-black/10">
      {/* Room Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-flex items-center gap-2 bg-green-900/50 text-green-300 text-sm font-medium px-3 py-1 rounded-full">
              <Check className="w-3 h-3" />
              Available
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">Room {room.roomNumber}</h3>
            <p className="text-gray-400">{room.title}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">sh {room.price}</div>
            <div className="text-gray-400 text-sm">per month</div>
          </div>
        </div>
        <p className="text-gray-300">{room.description}</p>
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Private</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-gray-400 text-sm font-medium mb-3">INCLUDED FEATURES</h4>
          <div className="flex flex-wrap gap-2">
            {room.features.map((feature, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-2 bg-gray-800/50 text-gray-300 px-3 py-2 rounded-lg"
              >
                {getFeatureIcon(feature)}
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/apply?room=${room.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Book 
        </Link>
      </div>
    </div>
  );
};

const AvailableRooms = ({ variant = 'home'} : {variant?: 'home' | 'bookings'}) => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  
  const filteredRooms = showOnlyAvailable 
    ? availableRooms.filter(room => room.status === 'vacant')
    : availableRooms;

  return (
    <section id="rooms" className="py-20 bg-[#060219]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-300">Available </span>
            <span className="text-transparent bg-clip-text bg-blue-800">
              Apartments
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse our selection of premium apartments. Each unit includes access to our 
            digital tenant management system.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setShowOnlyAvailable(true)}
              className={`px-6 py-2 cursor-pointer rounded-md transition-all duration-300 ${
                showOnlyAvailable 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Available Only ({availableRooms.filter(r => r.status === 'vacant').length})
            </button>
            <button
              onClick={() => setShowOnlyAvailable(false)}
              className={`px-6 py-2 cursor-pointer rounded-md transition-all duration-300 ${
                !showOnlyAvailable 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Show All ({availableRooms.length})
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredRooms.map((room: any) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* CTA */}
        {variant === 'home' ? (
           <Button />
        ) : (
          <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
          >
            Back to Home
            <span className="text-xl">←</span>
          </Link>
        </div>
        )}
         
      </div>
    </section>
  );
};

export default AvailableRooms;