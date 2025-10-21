import type { BrandId } from './schema';

export const BRANDS: Array<{
  id: BrandId;
  name: string;
  country: string;
  tagline: string;
  description?: string;
  logo?: string;
  featured?: boolean;
  productCount?: number;
}> = [
  { 
    id: 'life-ionizers-india', 
    name: 'Life Ionizers India', 
    country: 'India', 
    tagline: 'Pioneer of Innovation',
    featured: true,
    productCount: 11
  },
  { 
    id: 'mediqua-india', 
    name: 'Mediqua India', 
    country: 'Korea', 
    tagline: 'Clinical Precision',
    description: "Mediqua's AK and HY series blend clinical precision with reliable performance for homes and clinics.",
    logo: '/images/brands/mediqua.png',
    featured: true,
    productCount: 8
  },
  { 
    id: 'medisoul-india', 
    name: 'Medisoul India', 
    country: 'India', 
    tagline: 'Wellness Engineering',
    featured: true,
    productCount: 15
  },
];