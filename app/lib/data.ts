// lib/data.ts
export interface Room {
  id: number;
  roomNumber: string;
  title: string;
  description: string;
  price: number;
  size: string;
  features: string[];
  status: 'vacant' | 'occupied';
}

export const availableRooms: Room[] = [
  {
    id: 1,
    roomNumber: '101',
    title: 'Premium Studio',
    description: 'Modern studio with smart home features, perfect for professionals. Recently renovated with high-end finishes.',
    price: 1200,
    size: '450 sq ft',
    features: ['WiFi Included', 'Private Bath', 'Parking Spot', 'AC', 'Smart Lock'],
    status: 'vacant'
  },
  {
    id: 2,
    roomNumber: '205',
    title: 'Deluxe 1-Bedroom',
    description: 'Spacious one-bedroom with separate living area, kitchenette, and balcony with city views.',
    price: 1800,
    size: '750 sq ft',
    features: ['WiFi Included', 'Private Bath', '2 Parking Spots', 'Balcony', 'In-unit Laundry'],
    status: 'vacant'
  },
  {
    id: 3,
    roomNumber: '312',
    title: 'Executive 2-Bedroom',
    description: 'Luxury two-bedroom apartment with panoramic views, premium appliances, and walk-in closets.',
    price: 2500,
    size: '1100 sq ft',
    features: ['WiFi Included', '2 Bathrooms', 'Covered Parking', 'AC', 'Gym Access', 'Pool'],
    status: 'vacant'
  },
  {
    id: 4,
    roomNumber: '408',
    title: 'Economy Studio',
    description: 'Budget-friendly studio with all essential amenities, perfect for students.',
    price: 850,
    size: '350 sq ft',
    features: ['WiFi Included', 'Shared Bath', 'Basic Utilities', 'Study Desk'],
    status: 'occupied'
  },
];

export const features = [
  {
    icon: '💳',
    title: 'Digital Rent Payments',
    description: 'Pay rent securely online with automatic receipts and payment history tracking.'
  },
  {
    icon: '🔧',
    title: 'Maintenance Requests',
    description: 'Report issues directly through the system with photo attachments and status tracking.'
  },
  {
    icon: '📱',
    title: 'Instant Updates',
    description: 'Stay informed with real-time announcements about building news and events.'
  },
  {
    icon: '💬',
    title: 'Direct Messaging',
    description: 'Communicate directly with your landlord through our secure messaging system.'
  },
  {
    icon: '📄',
    title: 'Online Applications',
    description: 'Apply for apartments online with easy form submission and status tracking.'
  },
  {
    icon: '🔒',
    title: 'Secure Access',
    description: 'Room number based authentication ensures only verified tenants can access features.'
  },
];

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Tenant for 2 years',
    content: 'The digital system made everything so easy! Paying rent and reporting issues takes minutes.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'New Tenant',
    content: 'Applying online was seamless. The landlord approved my application within 24 hours!',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Tenant for 1 year',
    content: 'I love getting instant updates about building maintenance. No more surprise water outages!',
    rating: 4
  },
];