export interface Product {
  id: string;
  name: string;
  urduName: string;
  price: number;
  category: string;
  unit: string;
}

export interface Salesman {
  id: string;
  name: string;
  urduName: string;
  phone: string;
  photoUrl: string;
  beatArea: string;
  active: boolean;
  ordersToday: number;
  targetOrders: number;
  onTimePercent: number;
  fuelSavedPercent: number;
  distanceKm: number;
  estTime: string;
}

export interface DemandForecast {
  productId: string;
  reason: string;
  urduReason: string;
  suggestedQty: number;
  trend: 'up' | 'stable' | 'down';
}

export interface Shop {
  id: string;
  name: string;
  urduName: string;
  area: string;
  city: 'Karachi' | 'Lahore';
  owner: string;
  salesmanId: string;
  lat: number;
  lng: number;
  visitDay: string;
  lastOrderDate: string;
  lastOrderValue: number;
  stockoutRisk: 'red' | 'amber' | 'green';
  stockoutProduct?: string;
  stockoutProductUrdu?: string;
  demandForecast: DemandForecast[];
}

export interface OrderItem {
  productId: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  shopId: string;
  shopName: string;
  salesmanName: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Synced Offline';
  items: OrderItem[];
  actualValue: number;
  suggestedValue: number;
  paymentMethod: 'Cash' | 'JazzCash' | 'EasyPaisa';
  paymentStatus: 'Paid' | 'Pending' | 'Unpaid';
}

export interface PaymentCollection {
  id: string;
  invoiceRef: string;
  shopName: string;
  amount: number;
  method: 'Cash' | 'JazzCash' | 'EasyPaisa';
  time: string;
  salesmanName: string;
  status: 'Collected' | 'Pending';
}

export const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Olpers Milk 1L', urduName: 'اولپرز دودھ 1 لیٹر', price: 280, category: 'Dairy', unit: 'pcs' },
  { id: 'prod-2', name: 'Rooh Afza 800ml', urduName: 'روح افزا 800 ملی لیٹر', price: 445, category: 'Beverages', unit: 'pcs' },
  { id: 'prod-3', name: 'Tapal Danedar Tea 190g', urduName: 'ٹپال دانے دار چائے 190 گرام', price: 285, category: 'Tea', unit: 'pcs' },
  { id: 'prod-4', name: 'Lifebuoy Soap 100g', urduName: 'لائف بوائے صابن 100 گرام', price: 95, category: 'Personal Care', unit: 'pcs' },
  { id: 'prod-5', name: 'Lay\'s Chips Salted 40g', urduName: 'لیز چپس سالٹیڈ 40 گرام', price: 60, category: 'Snacks', unit: 'pcs' },
  { id: 'prod-6', name: 'Tapal Family Mixture 475g', urduName: 'ٹپال فیملی مکسچر 475 گرام', price: 650, category: 'Tea', unit: 'pcs' }
];

export const mockSalesmen: Salesman[] = [
  {
    id: 'sales-1',
    name: 'Qumail AunAli',
    urduName: 'کمیل عون علی',
    phone: '+92 349 3412757',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    beatArea: 'Gulshan-e-Iqbal',
    active: true,
    ordersToday: 8,
    targetOrders: 10,
    onTimePercent: 95,
    fuelSavedPercent: 18,
    distanceKm: 12,
    estTime: '3h 20m'
  },
  {
    id: 'sales-2',
    name: 'Kiran Zehra',
    urduName: 'کرن زہرہ',
    phone: '+92 331 7549041',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    beatArea: 'Model Town',
    active: true,
    ordersToday: 7,
    targetOrders: 8,
    onTimePercent: 98,
    fuelSavedPercent: 16,
    distanceKm: 10,
    estTime: '2h 45m'
  },
  {
    id: 'sales-3',
    name: 'Manal Mustafa',
    urduName: 'منال مصطفی',
    phone: '+92 334 2384990',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    beatArea: 'DHA Phase 6',
    active: true,
    ordersToday: 5,
    targetOrders: 10,
    onTimePercent: 90,
    fuelSavedPercent: 15,
    distanceKm: 15,
    estTime: '4h 10m'
  },
  {
    id: 'sales-4',
    name: 'Zahid Iqbal',
    urduName: 'زاہد اقبال',
    phone: '+92 300 1234567',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    beatArea: 'Clifton',
    active: false,
    ordersToday: 0,
    targetOrders: 8,
    onTimePercent: 0,
    fuelSavedPercent: 0,
    distanceKm: 0,
    estTime: '0h'
  }
];

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Al-Madina General Store',
    urduName: 'المدینہ جنرل اسٹور',
    area: 'Gulshan-e-Iqbal',
    city: 'Karachi',
    owner: 'Muhammad Tariq',
    salesmanId: 'sales-1',
    lat: 24.9180,
    lng: 67.0971,
    visitDay: 'Thursday',
    lastOrderDate: '2026-07-28',
    lastOrderValue: 10850,
    stockoutRisk: 'green',
    demandForecast: [
      { productId: 'prod-1', reason: 'Demand rising due to hot weather', urduReason: 'گرم موسم کی وجہ سے مانگ میں اضافہ', suggestedQty: 18, trend: 'up' },
      { productId: 'prod-2', reason: 'Demand rising - Ramadan approaching', urduReason: 'رمضان کی وجہ سے مانگ میں اضافہ', suggestedQty: 15, trend: 'up' },
      { productId: 'prod-4', reason: 'Based on last 3 orders', urduReason: 'گزشتہ 3 آرڈرز کی بنیاد پر', suggestedQty: 20, trend: 'stable' },
      { productId: 'prod-3', reason: 'Based on last 3 orders', urduReason: 'گزشتہ 3 آرڈرز کی بنیاد پر', suggestedQty: 8, trend: 'stable' }
    ]
  },
  {
    id: 'shop-2',
    name: 'Baba Traders',
    urduName: 'بابا ٹریڈرز',
    area: 'Model Town',
    city: 'Lahore',
    owner: 'Haji Saleem',
    salesmanId: 'sales-2',
    lat: 31.4805,
    lng: 74.3239,
    visitDay: 'Thursday',
    lastOrderDate: '2026-07-29',
    lastOrderValue: 9885,
    stockoutRisk: 'red',
    stockoutProduct: 'Olpers Milk 1L',
    stockoutProductUrdu: 'اولپرز دودھ 1 لیٹر',
    demandForecast: [
      { productId: 'prod-1', reason: 'Urgent low stock detected', urduReason: 'فوری طور پر کم اسٹاک پایا گیا', suggestedQty: 25, trend: 'up' },
      { productId: 'prod-3', reason: 'High demand area', urduReason: 'زیادہ مانگ والا علاقہ', suggestedQty: 15, trend: 'up' },
      { productId: 'prod-5', reason: 'Stable consumption', urduReason: 'مستحکم کھپت', suggestedQty: 30, trend: 'stable' }
    ]
  },
  {
    id: 'shop-3',
    name: 'Rehman Kiryana Store',
    urduName: 'رحمان کریانہ اسٹور',
    area: 'Gulshan-e-Iqbal',
    city: 'Karachi',
    owner: 'Abdul Rehman',
    salesmanId: 'sales-1',
    lat: 24.9312,
    lng: 67.0854,
    visitDay: 'Thursday',
    lastOrderDate: '2026-07-25',
    lastOrderValue: 4850,
    stockoutRisk: 'amber',
    stockoutProduct: 'Rooh Afza 800ml',
    stockoutProductUrdu: 'روح افزا 800 ملی لیٹر',
    demandForecast: [
      { productId: 'prod-2', reason: 'Low stock notification', urduReason: 'کم اسٹاک کی اطلاع', suggestedQty: 10, trend: 'up' },
      { productId: 'prod-1', reason: 'Weekly replenishment', urduReason: 'ہفتہ وار سپلائی', suggestedQty: 12, trend: 'stable' }
    ]
  },
  {
    id: 'shop-4',
    name: 'Tayyaba Super Mart',
    urduName: 'طیبہ سپر مارٹ',
    area: 'DHA Phase 6',
    city: 'Karachi',
    owner: 'Muhammad Bilal',
    salesmanId: 'sales-3',
    lat: 24.7892,
    lng: 67.0628,
    visitDay: 'Thursday',
    lastOrderDate: '2026-07-27',
    lastOrderValue: 14200,
    stockoutRisk: 'green',
    demandForecast: [
      { productId: 'prod-1', reason: 'High footfall prediction', urduReason: 'زیادہ گاہکوں کی پیش گوئی', suggestedQty: 40, trend: 'up' },
      { productId: 'prod-6', reason: 'Based on tea seasonality', urduReason: 'چائے کی موسمی کھپت کی بنیاد پر', suggestedQty: 12, trend: 'up' },
      { productId: 'prod-5', reason: 'Based on last 3 orders', urduReason: 'گزشتہ 3 آرڈرز کی بنیاد پر', suggestedQty: 50, trend: 'stable' }
    ]
  },
  {
    id: 'shop-5',
    name: 'Bismillah Milk Center',
    urduName: 'بسم اللہ ملک سینٹر',
    area: 'Model Town',
    city: 'Lahore',
    owner: 'Sajid Ali',
    salesmanId: 'sales-2',
    lat: 31.4720,
    lng: 74.3315,
    visitDay: 'Thursday',
    lastOrderDate: '2026-07-28',
    lastOrderValue: 7200,
    stockoutRisk: 'green',
    demandForecast: [
      { productId: 'prod-1', reason: 'Core product forecast', urduReason: 'بنیادی پروڈکٹ کی پیش گوئی', suggestedQty: 30, trend: 'up' }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: 'BF-ORD-1001',
    shopId: 'shop-1',
    shopName: 'Al-Madina General Store',
    salesmanName: 'Qumail AunAli',
    date: '2026-07-30',
    status: 'Synced Offline',
    items: [
      { productId: 'prod-1', qty: 18, price: 280 }, // 5040
      { productId: 'prod-2', qty: 15, price: 445 }, // 6675
      { productId: 'prod-4', qty: 20, price: 95 }   // 1900
    ],
    actualValue: 13615,
    suggestedValue: 13615,
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid'
  },
  {
    id: 'BF-ORD-1002',
    shopId: 'shop-2',
    shopName: 'Baba Traders',
    salesmanName: 'Kiran Zehra',
    date: '2026-07-30',
    status: 'Confirmed',
    items: [
      { productId: 'prod-1', qty: 20, price: 280 }, // 5600
      { productId: 'prod-3', qty: 10, price: 285 }  // 2850
    ],
    actualValue: 8450,
    suggestedValue: 9885,
    paymentMethod: 'Cash',
    paymentStatus: 'Unpaid'
  },
  {
    id: 'BF-ORD-1003',
    shopId: 'shop-3',
    shopName: 'Rehman Kiryana Store',
    salesmanName: 'Qumail AunAli',
    date: '2026-07-30',
    status: 'Pending',
    items: [
      { productId: 'prod-2', qty: 10, price: 445 }, // 4450
      { productId: 'prod-1', qty: 10, price: 280 }  // 2800
    ],
    actualValue: 7250,
    suggestedValue: 7810,
    paymentMethod: 'EasyPaisa',
    paymentStatus: 'Pending'
  }
];

export const mockPayments: PaymentCollection[] = [
  {
    id: 'pay-1',
    invoiceRef: 'INV-10456',
    shopName: 'Al-Madina General Store',
    amount: 13615,
    method: 'JazzCash',
    time: '10:45 AM',
    salesmanName: 'Qumail AunAli',
    status: 'Collected'
  },
  {
    id: 'pay-2',
    invoiceRef: 'INV-10457',
    shopName: 'Baba Traders',
    amount: 6200,
    method: 'Cash',
    time: '11:15 AM',
    salesmanName: 'Kiran Zehra',
    status: 'Collected'
  },
  {
    id: 'pay-3',
    invoiceRef: 'INV-10458',
    shopName: 'Rehman Kiryana Store',
    amount: 7250,
    method: 'EasyPaisa',
    time: '02:30 PM',
    salesmanName: 'Qumail AunAli',
    status: 'Pending'
  }
];

export const mockFuelComparison = [
  { id: '1', salesmanName: 'Qumail AunAli', routeName: 'Gulshan Beat', beforeDistance: 15.2, afterDistance: 12.0, beforeFuel: 2.5, afterFuel: 1.9, savings: 24 },
  { id: '2', salesmanName: 'Kiran Zehra', routeName: 'Model Town Beat', beforeDistance: 12.8, afterDistance: 10.0, beforeFuel: 2.1, afterFuel: 1.6, savings: 23 },
  { id: '3', salesmanName: 'Manal Mustafa', routeName: 'DHA Phase 6 Beat', beforeDistance: 18.5, afterDistance: 15.0, beforeFuel: 3.0, afterFuel: 2.4, savings: 20 },
  { id: '4', salesmanName: 'Overall Aggregate', routeName: 'All Active Beats', beforeDistance: 46.5, afterDistance: 37.0, beforeFuel: 7.6, afterFuel: 5.9, savings: 22 }
];

export const recentActivities = [
  { id: 'act-1', type: 'order', text: 'Order booked for Al-Madina General Store', detail: 'Rs 13,615 by Qumail AunAli', time: '10 mins ago' },
  { id: 'act-2', type: 'payment', text: 'Payment collected from Baba Traders', detail: 'Rs 6,200 via Cash by Kiran Zehra', time: '35 mins ago' },
  { id: 'act-3', type: 'alert', text: 'Stockout warning: Olpers Milk 1L', detail: 'Urgent low stock at Baba Traders', time: '1 hour ago' },
  { id: 'act-4', type: 'route', text: 'Route optimized for Gulshan Beat', detail: '18% fuel saving predicted', time: 'Today, 8:00 AM' }
];
