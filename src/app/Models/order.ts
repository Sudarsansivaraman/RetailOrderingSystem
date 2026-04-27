export interface OrderItem {
  orderItemId: number;
  itemId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: number;
  userId: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  items: OrderItem[];
}

export interface PlaceOrderDto {
  
}
