export interface User {
  id: string;
  name: string;
}

export interface Review {
  userName: string;
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: string;
  item_url?: string;
  image_url?: string;
  price: string | number;
  favorite_cosmetic_id?: number;
  favorite_cosmetic: any;
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
  userName: string;
  visibility: boolean;
  reviews: Review[];
  review: Review[];
  price: string | number;
  title: string;
  favorite_cosmetic: any;
  rating: string;
  user_name: string;
  user_id: string;
  body: string;
  skin_type: string;
  skin_trouble: string;
  age: number;
  user: {
    id: string;
    uid: string;
    name: string;
  };
}

export interface ProductReview {
  id: number;
  user_id: string;
  averageRating: number;
  reviewCount: number;
}

export interface DisplayAverageRatingProps {
  productReview: {
    averageRating: number;
    reviewCount: number;
  };
}

export interface ApiResponse {
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: string;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  skin_type: string;
  skin_trouble: string;
  age: number;
  userName: string;
  user: {
    id: string;
    name: string;
  };
}
