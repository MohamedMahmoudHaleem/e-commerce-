import { Category, Product } from "../types/types";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async (
  offset: number,
  limit: number,
  searchQuery: string = "",
  categoryId: number | null = null
): Promise<Product[]> => {
  let url = `${API_BASE_URL}/products?offset=${offset}&limit=${limit}`;

  if (searchQuery) {
    url += `&title=${encodeURIComponent(searchQuery)}`;
  }

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};
