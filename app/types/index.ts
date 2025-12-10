// types/index.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasWifi: boolean;
  hasParking: boolean;
  hasWater: boolean;
  images: string[];
}