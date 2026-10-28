export const SHOP = {
  name: 'Tomhunt',
  owner: 'PRADEEP PAREEK',
  tagline: 'Premium Mobile Showroom',
  addressLine1: 'Main Market, Near Haldi Ghati Marg',
  addressLine2: 'Pratap Nagar, Jaipur, Rajasthan 302033',
  phoneDisplay: '+91 99831 51078',
  phoneTel: '+919983151078',
  whatsapp: 'https://wa.me/919983151078?text=Hi%20Tomhunt%2C%20I%20want%20to%20know%20about%20your%20offers',
  instagram: 'https://www.instagram.com/tomhunt2.0?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==',
  maps: 'https://maps.app.goo.gl/t8V9ezUkpk7HiXY29',
  hours: 'Open Daily · 10:00 AM – 9:30 PM',
  city: 'Pratap Nagar, Jaipur',
};

export const PROMO_BANNER = {
  bannerImage: '/images/banner.png',
  popupPoster: '/images/banner.png',
};

export const LAUNCH_IMAGES = [
  '/images/phone1.jpg',
  '/images/phone2.jpg',
  '/images/phone3.jpg',
  '/images/phone4.jpg',
  '/images/phone5.jpg',
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
];

export const TICKER = [
  'iPhone 18 — 10% OFF',
  'Galaxy S26 Ultra — Free Buds3 Pro',
  'Exchange bonus up to ₹8,000',
  'OnePlus 15R — No Cost EMI',
  'Tempered glass fitted FREE',
  'Screen repair in 45 minutes',
  'Nothing Phone (4) — In Stock',
];

export type Launch = {
  id: string;
  name: string;
  blurb: string;
  price: string;
  tag: string;
  image: string;
};

export const LAUNCHES: Launch[] = [
  {
    id: 'l1',
    name: 'iPhone 18 Pro',
    blurb: 'A20 Pro chip · 6.3" ProMotion · Titanium frame with the new quad-fusion camera.',
    price: '₹1,34,900',
    tag: 'Just Landed',
    image: '/images/phone1.jpg',
  },
  {
    id: 'l2',
    name: 'Galaxy S26 Ultra',
    blurb: '200MP ISOCELL · 6.9" QHD+ AMOLED · S-Pen built in, Snapdragon 8 Elite 2.',
    price: '₹1,29,999',
    tag: 'Flagship',
    image: '/images/phone2.jpg',
  },
  {
    id: 'l3',
    name: 'Pixel 11 Pro',
    blurb: 'Tensor G6 · Best-in-class computational photography and 7 years of updates.',
    price: '₹1,09,999',
    tag: 'Camera King',
    image: '/images/phone3.jpg',
  },
  {
    id: 'l4',
    name: 'OnePlus Open 2',
    blurb: 'Crease-free foldable · 8.1" inner display · 100W SuperVOOC in the box.',
    price: '₹1,52,000',
    tag: 'Foldable',
    image: '/images/phone4.jpg',
  },
  {
    id: 'l5',
    name: 'ROG Phone 10',
    blurb: '185Hz gaming panel · AirTrigger 7 · Vapour chamber cooling for marathon runs.',
    price: '₹89,999',
    tag: 'Gaming',
    image: '/images/phone5.jpg',
  },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  cat: 'Mobiles' | 'Accessories' | 'Cases' | 'Audio';
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'iPhone 18 Pro 256GB', price: '₹1,34,900', cat: 'Mobiles', image: '/images/phone1.jpg' },
  { id: 'p2', name: 'Galaxy S26 Ultra', price: '₹1,29,999', cat: 'Mobiles', image: '/images/phone2.jpg' },
  { id: 'p3', name: 'Pixel 11 Pro', price: '₹1,09,999', cat: 'Mobiles', image: '/images/phone3.jpg' },
  { id: 'p4', name: 'OnePlus Open 2', price: '₹1,52,000', cat: 'Mobiles', image: '/images/phone4.jpg' },
  { id: 'p5', name: 'TWS Pro Earbuds', price: '₹2,499', cat: 'Audio', image: '/images/earbuds.jpg' },
  { id: 'p6', name: 'Bass Boom Speaker', price: '₹3,799', cat: 'Audio', image: '/images/speaker.jpg' },
  { id: 'p7', name: 'Silicone Shield Case', price: '₹449', cat: 'Cases', image: '/images/case.jpg' },
  { id: 'p8', name: '9H Tempered Glass', price: '₹299', cat: 'Cases', image: '/images/glass.jpg' },
  { id: 'p9', name: '20000mAh Power Bank', price: '₹1,899', cat: 'Accessories', image: '/images/charger.jpg' },
  { id: 'p10', name: 'Smart Watch Active 3', price: '₹4,299', cat: 'Accessories', image: '/images/watch.jpg' },
];

export const CATEGORIES = ['All', 'Mobiles', 'Accessories', 'Cases', 'Audio'] as const;

export const PRIZES = [
  '10% OFF',
  'Free Earbuds',
  '₹500 Voucher',
  'Free Glass',
  '5% OFF',
  'Free Case',
  '₹1000 OFF',
  'Better Luck',
];
