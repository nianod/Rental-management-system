// lib/actions/room.actions.ts
import { prisma } from '@/lib/prisma';

export async function getAvailableRooms() {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        status: 'VACANT',
      },
      include: {
        images: true,
      },
      orderBy: {
        price: 'asc',
      },
    });

    return rooms.map((room: any) => ({
      id: room.id,
      name: `Room ${room.roomNumber}`,
      description: room.description || 'Beautiful apartment with modern amenities',
      price: room.price,
      size: room.size,
      bedrooms: room.bedrooms,
      bathrooms: room.bathrooms,
      hasWifi: room.hasWifi,
      hasParking: room.hasParking,
      hasWater: room.hasWater,
      images: room.images.map((img: any) => img.url),
    }));
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
}