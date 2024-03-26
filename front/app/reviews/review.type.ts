export interface ProductReviews {
  id: number;
  item_code: string;
  item_url: string;
  image_url: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  price: string | number;
}

export interface Review {
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: string;
  item_url?: string;
  image_url?: string | number;
  price?: string | number;
  favorite_cosmetic_id: string;
  favorite_cosmetic: any;
  averageRating?: number;
  reviewCount?: number;
  userName?: string;
  user?: User;
  skin_type: string;
  skin_trouble: string;
  age: number;
  reviews?: Review[];
  created_at: string;
}

export interface User {
  id?: string;
  uid: string;
}

export interface FavoriteCosmetic {
  id: number;
  item_url: string;
  image_url: string;
  price: string;
}

export interface SearchParams {
  skinType: string;
  skinTrouble: string;
  priceRange: string;
  productType: string;
  age?: string;
}





