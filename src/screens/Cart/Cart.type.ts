export interface CartItem {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    images?: { url: string }[];
    description?: string;
    location?: {
      name: string;
      latitude: number;
      longitude: number;
    };
  }