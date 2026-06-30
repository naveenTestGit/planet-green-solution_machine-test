import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProducts } from '../api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = useCallback(() => {
    loadProducts(true);
  }, [loadProducts]);

  
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    return products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [products, searchQuery]);

  return {
    products: filteredProducts,
    loading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    onRefresh,
  };
};
