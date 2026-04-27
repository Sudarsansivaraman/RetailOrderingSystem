export interface Item {
  itemId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: number;
  categoryName: string;
  createdAt: string;
}

export interface CreateItemPayload {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}

export interface UpdateItemPayload extends CreateItemPayload {
  isAvailable: boolean;
}
