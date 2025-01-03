export interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  linkType: string;
  linkNumber: string;
  expiresAt: string;
}

export interface ProductImage {
  id: string;
  image_url: string;
  display_order: number;
  product_id: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  location: string;
  category: string;
  link_number: number;
  link_type: string;
  seller_id: string;
  created_at: string;
  expires_at: string;
  status: 'pending' | 'active' | 'expired' | 'rejected';
  metrics: {
    views: number;
    likes: number;
    link_score: number;
  };
}

export interface SellerProfile {
  id: string;
  name: string;
  whatsapp_number?: string;
  rating: number;
  is_verified: boolean;
  response_time: string;
  shipping_options: {
    pickup: boolean;
    shipping: boolean;
  };
  role: 'user' | 'seller' | 'admin';
  is_super_admin: boolean;
}