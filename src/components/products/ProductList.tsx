import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCategories, fetchProducts } from "../../services/api";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import ProductGrid from "./ProductGrid";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products with filters
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products", debouncedSearchQuery, selectedCategory],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts(pageParam, 10, debouncedSearchQuery, selectedCategory),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
    initialPageParam: 0,
  });

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const scrollThreshold = document.documentElement.offsetHeight - 200;

      if (
        scrollPosition < scrollThreshold ||
        isFetchingNextPage ||
        !hasNextPage
      ) {
        return;
      }
      fetchNextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value ? Number(e.target.value) : null);
  };

  if (isLoading || isCategoriesLoading) return <LoadingSpinner />;
  if (isError || categoriesError) {
    const errorMessage =
      error?.message || categoriesError?.message || "Unknown error";
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          <ProductGrid products={page} />
        </Fragment>
      ))}

      {/* Loading and empty states */}
      {isFetchingNextPage && <LoadingSpinner />}
      {!hasNextPage && data?.pages[0] && data?.pages[0]?.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          No more products to load
        </p>
      )}
      {!isFetchingNextPage && data?.pages[0]?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No products found matching your criteria
        </p>
      )}
    </div>
  );
};

export default ProductList;
