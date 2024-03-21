export interface Cosmetic {
  mediumImageUrl: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  shopName: string;
  id: string;
  isFavorite?: boolean;
}

export type SearchCosmetic = {
  id: any;
  name: any;
  itemName: any;
  itemPrice: any;
  mediumImageUrl: any;
  itemUrl: any;
  item_url: any;
  shopName: any;
  category: any;
  image_url: any;
  item_code: any;
  brand: any;
  price: any;
  lotion?: string;
  serum?: string;
  cream?: string;
  total_price?: number;
};