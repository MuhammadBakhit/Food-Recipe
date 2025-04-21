export interface IRecipe {
    id: number;
    name: string;
    imagePath: string;
    price: number;
    description: string;
    tag: {
      name: string;
    };
    category: {
      name: string;
    }[];
  }