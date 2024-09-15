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

export interface Orders {
  id?: number
  user_id: string
  stripe_id: string
  name: string
  address: string
  zipcode: string
  city: string
  country: string
  total: number
  created_at: Date | null;
  orderItem: OrderItem[]
}