import type { BrandId } from './schema';

export const BRANDS: Array<{
  id: BrandId;
  name: string;
  country: string;
  tagline: string;
  description?: string;
  vision?: string;
  mission?: string[];
  certifications?: string;
  logo?: string;
  mainImage?: string;
  featured?: boolean;
  productCount?: number;
}> = [
  { 
    id: 'life-ionizers-india', 
    name: 'Life Ionizers™', 
    country: 'USA', 
    tagline: 'Pioneer of Innovation',
    description: `Nu-tech Water Systems LLC has been manufacturing and distributing alkaline water ionizers under the brand name Life Ionizers™ for 29 years. We believe that the essence of true health, vitality, and longevity flows from the purest gift of nature – water. For over two decades, we have stood as pioneers of innovation, transforming simple drinking water into a source of extraordinary power – rich in antioxidants, alkaline in nature, and crafted to nourish the body, awaken the mind, and uplift the soul.`,
    vision: 'To redefine wellness at its very core, making every drop more than just hydration – it becomes a fountain of purity, balance, and rejuvenation.',
    mission: [
      'To be the leader in the international health water industry by creating and delivering beneficial products that exceed customer expectations',
      'To ensure a balanced and caring culture',
      'To bring clean, safe, and life-enhancing ionized water solutions to every home',
      'To maintain excellence through advanced research, flawless design, trusted quality, and global recognition'
    ],
    certifications: 'ISO 13485, ISO 9001, ISO 14001, ISO 45001, CE, GMP, WQA, FDA',
    logo: '/images/ionora-logo.png',
    mainImage: '/images/products/life/MXL-11 counter.png',
    featured: true,
    productCount: 11
  },
  { 
    id: 'mediqua-india', 
    name: 'Mediqua™', 
    country: 'Korea', 
    tagline: 'Clinical Precision',
    description: `Jinnys Co., Ltd manufactures Alkaline water ionizers as medical devices, with recognition for suitability for medical device manufacturing and quality control standards (GMP). We are growing mainly around exports to Italy, India, and South-east Asia. We have won various awards from government agencies and organizations in Korea and received the 'Tower of 1 Million Dollar Export' in 2017. We are currently exporting to more than 55 countries and are committed to becoming a leading player in the export market.`,
    mission: [
      'To share the innovation of Beauty & Health and develop the brand name Mediqua',
      'To expand globally under the management policy that the world is wide and still has a lot to do',
      'To become a leading player in the export market with a commitment to excellence'
    ],
    certifications: 'ISO 13485, ISO 9001, ISO 14001, ISO 45001, CE, GMP, WQA, FDA',
    logo: '/images/products/mediqua/mediqua logo.avif',
    mainImage: '/images/products/mediqua/ak-3000.png',
    featured: true,
    productCount: 8
  },
  { 
    id: 'medisoul-india', 
    name: 'Medisoul™', 
    country: 'Korea', 
    tagline: 'Wellness Engineering',
    description: `Mirko Co. Ltd., based in South Korea, is a pioneering manufacturer of alkaline water ionizers with over 15 years of expertise in water technology. Guided by a vision to improve global wellness through innovation, Mirko has developed its own flagship brand — MEDISOUL™ — a name that embodies the harmony between medicine and soul, reflecting water's vital role in human health and balance. Every Medisoul ionizer is engineered with precision, powered by advanced Korean ionization technology, and crafted to deliver pure, alkaline, antioxidant-rich water that revitalizes the body and supports a healthier lifestyle.`,
    vision: 'To be a global leader in alkaline water ionization technology — enriching lives through the Medisoul brand, where innovation, purity, and wellness flow together to create a healthier, more balanced world.',
    mission: [
      'To design and manufacture advanced alkaline water ionizers under the Medisoul brand, combining Korean engineering excellence with global standards of performance and reliability',
      'To deliver water solutions that promote wellness, vitality, and sustainability, empowering individuals and families to live healthier lives',
      'To invest continuously in research, innovation, and design to ensure that every Medisoul ionizer offers precision, efficiency, and long-term value',
      'To build trusted partnerships with distributors and wellness brands worldwide, grounded in integrity, service excellence, and mutual growth',
      'To uphold Mirko\'s 15-year legacy of quality, craftsmanship, and innovation, ensuring that every drop of water reflects our dedication to health and purity'
    ],
    logo: '/images/products/medisoul/medisoul-logo.png',
    mainImage: '/images/products/medisoul/mslblack11.png',
    featured: true,
    productCount: 24
  },
  { 
    id: 'kyron-india', 
    name: 'Kyron', 
    country: 'Korea', 
    tagline: 'Advanced Technology',
    description: 'Kyron is a product line under the Medisoul brand, offering advanced residential water ionizers with cutting-edge technology.',
    logo: '/images/products/medisoul/kyron5.png',
    mainImage: '/images/products/medisoul/kyron5.png',
    featured: false,
    productCount: 6
  },
  { 
    id: 'tycoon-india', 
    name: 'Tycoon', 
    country: 'Korea', 
    tagline: 'Commercial Excellence',
    description: 'Tycoon is a product line under the Medisoul brand, specializing in commercial water ionizers for businesses and institutions.',
    logo: '/images/products/medisoul/Tycoon-30 Upper counter.png',
    mainImage: '/images/products/medisoul/Tycoon-30 Upper counter.png',
    featured: false,
    productCount: 3
  },
];