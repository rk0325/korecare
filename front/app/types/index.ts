export interface Session {
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    image?: string;
  }
}

export interface User {
  id?: string;
}

export interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export interface SearchParams {
  skinType: string;
  skinTrouble: string;
  priceRange: string;
  productType: string;
  age?: string;
}

export interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface Cosmetic {
  mediumImageUrl?: string;
  itemName: string;
  itemPrice?: number;
  itemUrl?: string;
  shopName?: string;
  id?: string;
  isFavorite?: boolean;
  name: any;
  item_url: any;
  category: any;
  image_url: any;
  item_code: any;
  brand: any;
  price: any;
  lotion?: string;
  serum?: string;
  cream?: string;
  total_price?: number;
}

export interface RecommendedCosmeticsProps {
  searchParams: SearchParams;
  hasSearched: boolean;
}

export interface ReviewSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface Session {
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    image?: string;
  }
}

export interface User {
  id?: string;
}

export interface LevelIconsProps {
  level: number;
  color: string;
  grayColor?: string;
  Icon: React.ElementType;
}

export interface Review {
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
  averageRating?: number;
  reviewCount?: number;
  userName?: string;
  user?: User;
  skin_type: string;
  skin_trouble: string;
  age: number;
  reviews?: Review[];
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
  reviews: Review[];
}

export type CosmeticSet = {
  lotion: Cosmetic;
  serum: Cosmetic;
  cream: Cosmetic;
  total_price: number;
};

export type ApiResponseItem = {
  lotion: Cosmetic;
  serum: Cosmetic;
  cream: Cosmetic;
  total_price: number;
};

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export type UserInfoContextType = {
  skinType: string;
  setSkinType: (value: string) => void;
  skinTrouble: string;
  setSkinTrouble: (value: string) => void;
};

export type ApiResponseNotification = {
  id: number;
  item_type: string;
  open_date: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
};

export type Notification = {
  id: number;
  productType: string;
  openDate: Date | null;
  expiryDate: Date | null;
};









