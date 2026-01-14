export interface Subcategory {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface CategoriesData {
  categories: Category[];
} 