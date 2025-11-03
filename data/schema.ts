export type BrandId = 'life-ionizers-india' | 'mediqua-india' | 'medisoul-india' | 'kyron-india' | 'tycoon-india';

export type Variant = {
  color: "black" | "white";   // standardized color values
  image: string;   // /images/... path
};

export type InstallationType = "counter" | "undercounter";

export type InstallationVariant = {
  type: InstallationType;
  image: string;
  price?: number;
};

export type Product = {
  id: string;
  brand: string;  // Changed from brandId to brand to match actual data
  name: string;
  image?: string;        // single-image products
  variants?: Variant[];  // color/image variants
  installationVariants?: InstallationVariant[];  // counter/undercounter variants
  price?: number;
  series?: string;
  category?: 'Residential' | 'Commercial' | 'Accessory' | 'Other';
  specs?: Record<string, string | number>;
  highlights?: string[];
  features?: string[];
  // Additional fields from actual product data
  plates?: string;
  phRange?: string;
  orp?: string;
  orpDrink?: string;
  power?: string;
  warranty?: string;
  installation?: string;
  dimensions?: string;
  internationalVoltage?: string;
  microMembrane?: string;
  filters?: string;
  oneClickFilter?: string;
  cleaning?: string;
  colorOptions?: string;
  hydrogen?: string;
};
