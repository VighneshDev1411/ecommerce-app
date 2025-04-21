export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    rating: number;
    discount?: string;
    category?: string;
  }
  