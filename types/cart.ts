export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  addItem: (item: CartItem) => void;
}
