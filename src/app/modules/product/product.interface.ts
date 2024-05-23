export type Variant = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type product = {
  name: string;
  description: string;
  price: number;
  category: string[];
  tags: number[];
  variants: Variant[];
  inventory: Inventory;
};
