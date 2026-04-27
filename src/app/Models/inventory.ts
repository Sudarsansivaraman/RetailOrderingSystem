export interface StockItem {
  itemId: number;
  itemName: string;
  category: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl: string;
}


export interface OrderItem {
  itemId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: number;
  totalAmount: number;
  status: string;
  orderDate: Date;
  items: OrderItem[];
}