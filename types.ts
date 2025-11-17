export type UserRole = 'buyer' | 'seller' | null;

export interface Cupcake {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  cupcakeId: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

export interface Order {
  id: number;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  date: Date;
  paymentMethod: 'card' | 'cash';
}
