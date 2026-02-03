declare module '*.svg' {
  const content: string;
  export default content;
}
// Recipe 配料类型
interface Ingredient {
  id?: string;
  name: string;
  amount: number;
  unit: string; // 'g', 'ml', 'cup', '个' 等
}

// Recipe 步骤类型
interface RecipeStep {
  id?: string;
  step: number;
  description: string;
  duration?: number; // 可选，单位秒
}
interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps?: RecipeStep[];
  recipe?: string;
  prepTime?: number; // 分钟
  cookTime?: number; // 分钟
  image?: string; // 图片 URL
  tags?: string[]; // 标签：'vegetarian', 'gluten-free' 等
  createdAt?: Date;
  updatedAt?: Date;
}
