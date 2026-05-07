// Stripe product and price IDs
// These are the actual products created in Stripe

// Product images: these will be bundled into the cart/shop chunk (not homepage)
// since stripe-products.ts is only imported by lazy-loaded components.
import biologicMiniImg from '@/assets/biologic-mini-nobg-new.avif';
import biotica800Img from '@/assets/shop/biotica-800.jpg';
import ba2080Img from '@/assets/shop/ba2080.png';
import bapf18Img from '@/assets/shop/bapf-18.jpg';
import biologicMiniRefillImg from '@/assets/shop/biologic-mini-refill.jpg';
import biotica800RefillImg from '@/assets/shop/biotica-800-refill.jpg';
import biotica800NvRefillImg from '@/assets/shop/biotica-800-nv-refill.png';
import biodifyCartridgeImg from '@/assets/shop/biodify-cartridge.jpg';
import ba2080HepaFilterImg from '@/assets/shop/ba-2080-hepa-filter.jpg';
import ba2080ComboImg from '@/assets/shop/ba-2080-combo.png';
import bapf18RefillImg from '@/assets/shop/bapf-18-refill.png';
import ebioticPro250mlRefillImg from '@/assets/shop/ebiotic-pro-250ml-refill.avif';
import ebioticPro500mlRefillImg from '@/assets/shop/ebiotic-pro-500ml-refill.avif';
import ebioticPro1lRefillImg from '@/assets/shop/ebiotic-pro-1l-refill.avif';
import familyPack4MinisImg from '@/assets/shop/family-pack-4-minis.avif';
import homeCompleteBundleImg from '@/assets/shop/home-complete-bundle.avif';

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number; // in cents
  image: string;
  category: 'device' | 'refill' | 'subscription' | 'bundle';
  recurringInterval?: 'month' | 'year';
  originalPrice?: number; // for showing discounted subscription price
  shippingCost?: number; // shipping cost in cents (0 = free, undefined = no shipping)
}

// Free shipping threshold in cents ($200)
export const FREE_SHIPPING_THRESHOLD = 20000;

export const STRIPE_PRODUCTS: StripeProduct[] = [
  // Main Devices (One-time purchases)
  {
    id: 'prod_TkrCDIiOr0kg1A',
    name: 'BioLogic Mini',
    description: 'Cordless probiotic air and surface purifier – battery operated, USB rechargeable',
    priceId: 'price_1SnLU1G13Yn1allNVof7RjMj',
    price: 9800,
    image: biologicMiniImg,
    category: 'device',
    shippingCost: 895,
  },
  {
    id: 'prod_TxSs8Sq49Z9hWD',
    name: 'Biotica 800',
    description: 'Premium probiotic air purifier for larger spaces up to 800 sq ft',
    priceId: 'price_1SzXwWG13Yn1allNxwzEV6D5',
    price: 29900,
    image: biotica800Img,
    category: 'device',
    shippingCost: 0, // free shipping (over $200)
  },
  {
    id: 'prod_TkrCTgomiCEl0g',
    name: 'BA2080',
    description: 'Advanced probiotic air purifier with HEPA filtration for whole-home coverage',
    priceId: 'price_1SnLUXG13Yn1allNmVaditLt',
    price: 99500,
    image: ba2080Img,
    category: 'device',
    shippingCost: 0, // free shipping (over $200)
  },
  {
    id: 'prod_TkrDEdDlC6xSe1',
    name: 'EBPF-18',
    description: 'Professional probiotic fogger for deep surface treatment',
    priceId: 'price_1SnLUlG13Yn1allNoUzyVDQ1',
    price: 39500,
    image: bapf18Img,
    category: 'device',
    shippingCost: 0, // free shipping (over $200)
  },

  // Refills (One-time purchases)
  {
    id: 'prod_TkrDsfk6PYfPVN',
    name: 'BioLogic Mini Refill',
    description: 'Replacement refill cartridge for BioLogic Mini',
    priceId: 'price_1SnLV0G13Yn1allNuSirsYoj',
    price: 1900,
    image: biologicMiniRefillImg,
    category: 'refill',
    shippingCost: 695,
  },
  {
    id: 'prod_TkrD14Bkt8A59W',
    name: 'Biotica 800-NV Refill',
    description: 'Replacement refill cartridge for Biotica 800',
    priceId: 'price_1SnLVCG13Yn1allN4lEq9z6g',
    price: 4500,
    image: biotica800NvRefillImg,
    category: 'refill',
    shippingCost: 795,
  },
  {
    id: 'prod_TkrDj4JWdFvi8k',
    name: 'BA-2080 Refill',
    description: 'Replacement refill cartridge for BA-2080',
    priceId: 'price_1SnLVSG13Yn1allNhgGtdWaf',
    price: 5900,
    image: biodifyCartridgeImg,
    category: 'refill',
    shippingCost: 795,
  },
  {
    id: 'prod_TkrELjf4zdPSnh',
    name: 'BA-2080 HEPA Filter',
    description: 'Certified HEPA filter replacement for BA-2080',
    priceId: 'price_1SnLVhG13Yn1allN8EHcuUVr',
    price: 7900,
    image: ba2080HepaFilterImg,
    category: 'refill',
    shippingCost: 795,
  },
  {
    id: 'prod_TmibBh98qsq6qX',
    name: 'EBPF Probiotic Solution',
    description: 'Professional probiotic fogging solution for EBPF-18. Treats up to 9,000 sq ft.',
    priceId: 'price_1Sp9A4G13Yn1allNWT6vQjbe',
    price: 8900,
    image: bapf18RefillImg,
    category: 'refill',
    shippingCost: 895,
  },

  // Bundles (One-time purchases with savings)
  {
    id: 'prod_Tmi66XLp4qu3Mt',
    name: 'Family Pack - 4 BioLogic Minis',
    description: 'Bundle of 4 BioLogic Mini units - perfect for whole-home coverage. Save $44!',
    priceId: 'price_1Sp8gkG13Yn1allNWBty3D4o',
    price: 34800,
    originalPrice: 39200, // 4 x $98
    image: familyPack4MinisImg,
    category: 'bundle',
  },
  {
    id: 'prod_TyKRoNcZv7uuko',
    name: 'Home Complete Bundle',
    description: '1 Biotica 800 + 2 BioLogic Mini units - complete home protection. Save $100!',
    priceId: 'price_1T0NmOG13Yn1allNnxqLWZWV',
    price: 39500,
    originalPrice: 49500, // $299 + 2 x $98
    image: homeCompleteBundleImg,
    category: 'bundle',
  },

  // Subscriptions (6-month billing cycle with automatic shipments)
  {
    id: 'prod_TyevTJlN928IJl',
    name: 'E-Biotic Pro 250ML Refill Subscription',
    description: '1 Bottle, Automatically Shipped Every Six Months. 6 Month program. Free shipping + lifetime warranty!',
    priceId: 'price_1T0hblG13Yn1allN6Sj3AnQr',
    price: 8900,
    image: ebioticPro250mlRefillImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
  {
    id: 'prod_TyevV5dGqeusYr',
    name: 'E-Biotic Pro 500ML Refill Subscription',
    description: '1 Bottle, Automatically Shipped Every Six Months. 6 Month program. Free shipping + lifetime warranty!',
    priceId: 'price_1T0hc0G13Yn1allN8iw6LvPM',
    price: 14900,
    image: ebioticPro500mlRefillImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
  {
    id: 'prod_TyewfcWpXpXmeW',
    name: 'E-Biotic Pro 1L Refill Subscription',
    description: '1 Bottle, Automatically Shipped Every Six Months. 6 Month program. Free shipping + lifetime warranty!',
    priceId: 'price_1T0hcNG13Yn1allNjmGdco3M',
    price: 22900,
    image: ebioticPro1lRefillImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
  {
    id: 'prod_TmgdfsJfvJcYqq',
    name: 'BioLogic Mini Twin-Pack Subscription',
    description: 'Billed every 6 months. Twin-pack (2 refill cartridges) shipped every 6 months. Free shipping + lifetime warranty!',
    priceId: 'price_1Sp7GOG13Yn1allN2veSDeBn',
    price: 3610,
    originalPrice: 3800,
    image: biologicMiniRefillImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
  {
    id: 'prod_TmgfTg2BOlhzOu',
    name: 'Biotica 800-NV Twin-Pack Subscription',
    description: 'Billed every 6 months. Twin-pack (2 refill cartridges) shipped every 6 months. Free shipping + lifetime warranty!',
    priceId: 'price_1Sp7I1G13Yn1allNXUfxqQFa',
    price: 8550,
    originalPrice: 9000,
    image: biotica800NvRefillImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
  {
    id: 'prod_TmggA1UUuPy7mv',
    name: 'BA-2080 Refill Subscription',
    description: 'Billed every 6 months. Refill shipped every 6 months + HEPA filter included annually. Free shipping + lifetime warranty!',
    priceId: 'price_1Sp7J8G13Yn1allNX7yHvgxw',
    price: 18715,
    originalPrice: 19700,
    image: ba2080ComboImg,
    category: 'subscription',
    recurringInterval: 'month',
  },
];

export const getDevices = () => STRIPE_PRODUCTS.filter(p => p.category === 'device');
export const getRefills = () => STRIPE_PRODUCTS.filter(p => p.category === 'refill');
export const getSubscriptions = () => STRIPE_PRODUCTS.filter(p => p.category === 'subscription');
export const getBundles = () => STRIPE_PRODUCTS.filter(p => p.category === 'bundle');
export const getProductById = (id: string) => STRIPE_PRODUCTS.find(p => p.id === id);
export const getProductByPriceId = (priceId: string) => STRIPE_PRODUCTS.find(p => p.priceId === priceId);

// Slug mapping for products
const SLUG_TO_PRODUCT_ID: Record<string, string> = {
  'biologic-mini': 'prod_TkrCDIiOr0kg1A',
  'biotica-800': 'prod_TxSs8Sq49Z9hWD',
  'ba-2080': 'prod_TkrCTgomiCEl0g',
  'ebpf-18': 'prod_TkrDEdDlC6xSe1',
};

export const getProductBySlug = (slug: string) => {
  const productId = SLUG_TO_PRODUCT_ID[slug];
  return productId ? STRIPE_PRODUCTS.find(p => p.id === productId) : undefined;
};
