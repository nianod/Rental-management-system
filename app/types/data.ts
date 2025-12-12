export interface Room {
  id: number;
  roomNumber: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  status: 'vacant' | 'occupied';
}