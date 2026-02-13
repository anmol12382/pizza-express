export interface Pizza {
  id: number;
  name: string;
  type: 'veg' | 'non-veg';
  ingredients: string;
  toppings: string;
  price: number;
}
