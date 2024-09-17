import { ReactNode } from "react";
export interface AddressType {
  id: number | null;
  user_id?: string,
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Error {
  type: string;
  message: string;
}

export interface TextInputProps {
  string: string | null,
  placeholder: string,
  error?: string,
  className?: string,
  onUpdate: (value: string) => void
}

export interface Product {
  id: number,
  title: string;
  url: string;
  price: number;
  description: string;
  created_at: Date | null;
}

export interface OrderItem {
  id?: number
  order_id?: number
  product_id: number
  created_at: Date | null;
  product: Product
}

export interface Order {
  id?: number
  user_id: string
  stripe_id: string
  name: string
  address: string
  zipcode: string
  city: string
  country: string
  total: number
  created_at: Date | null
  orderItem: OrderItem[]
}

export interface CartContextType {
  getCart: () => Product[]
  cartCount: () => number
  addToCart: (prod: Product) => void
  removeFromCart: (prod: Product) => void
  cartTotal: () => number
  clearCart: () => void
  isItemAddedToCart: (prod: Product) => void
  isItemAdded: boolean
}

export interface ReactNodeProps {
  children: ReactNode
}

export interface UserContextType {
  getCurrentSession: () => Promise<any>
  getCurrentUser: () => Promise<void>
  signOut: () => Promise<void>
  clearUser: () => void
  user: any | null
  id: string | null
  email: string | null
  name: string | null
  picture: string
}

export interface MenuItem {
  id: number
  name: string
}

export interface MetaDataType {
  title: string,
  description: string
}

export interface ContextParams {
  params: {
    id: string
  }
}