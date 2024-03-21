export interface User {
  id: number;
  name: string;
}

export interface Review {
  userName: string;
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: number;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  user?: User;
  skin_type: string;
  skin_trouble: string;
  age: number;
}

export interface FavoriteCosmetic {
  id: number;
  item_url: string;
  image_url: string;
  price: number;
}

export interface ProductReviews {
  id: number;
  item_url: string;
  image_url: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  price: number;
}

export interface ApiResponse {
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: number;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  skin_type: string;
  skin_trouble: string;
  age: number;
  userName: string;
  user: {
    id: number;
    name: string;
  };
}