export interface CartItem {
  cartItemId: number;
  itemId: number;
  quantity: number;
}

export interface Cart {
  cartId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface AddToCartDto {
  itemId: number;
  quantity: number;
}

export interface UpdateCartDto {
  cartItemId: number;
  quantity: number;
}
