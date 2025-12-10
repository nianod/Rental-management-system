// components/landing/AvailableRooms.tsx
import type { Room } from '@/app/types';
import RoomCard from './RoomCard';
import { Button } from '@/components/ui/button';

interface AvailableRoomsProps {
  rooms: Room[];
}

export default function AvailableRooms({ rooms }: AvailableRoomsProps) {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Available Rooms</h2>
          <p className="text-muted-foreground">
            Find your perfect home from our selection of premium apartments
          </p>
        </div>
        
        {/* Rooms grid */}
        {rooms.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-4">No rooms available at the moment</h3>
            <p className="text-muted-foreground mb-6">
              Check back later or contact us for future availability
            </p>
            <Button>Contact Us</Button>
          </div>
        )}
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">Can't find what you're looking for?</h3>
          <p className="mb-6 text-muted-foreground">
            Join our waiting list to be notified when new rooms become available
          </p>
          <Button size="lg">Join Waiting List</Button>
        </div>
      </div>
    </section>
  );
}