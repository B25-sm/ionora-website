export type BrandId = 'life-ionizers-india' | 'mediqua-india' | 'medisoul-india';

export type Variant = {
  color: "black" | "white";   // standardized color values
  image: string;   // /images/... path
};

export type Product = {
  id: string;
  brandId: BrandId;
  name: string;
  image?: string;        // single-image products
  variants?: Variant[];  // color/image variants
  price?: string;
  series?: string;
  category?: 'Residential' | 'Commercial' | 'Accessory' | 'Other';
  specs?: Record<string, string | number>;
  highlights?: string[];
  features?: string[];
};
