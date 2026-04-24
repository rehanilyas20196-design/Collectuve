import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useProducts = (searchQuery = '') => {
  return useQuery({
    queryKey: ['products', searchQuery],
    queryFn: async () => {
      let productsQuery = supabase.from('products').select('*');

      if (searchQuery?.trim()) {
        productsQuery = productsQuery.ilike('name', `%${searchQuery.trim()}%`);
      }

      const { data, error } = await productsQuery;

      if (error) throw error;
      return data;
    },
  });
};


export const useCategories = () => {
  const { data: allProducts, ...rest } = useProducts();

  const categories = {};
  const categoryList = [];

  if (allProducts) {
    const uniqueCategories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
    categoryList.push(...uniqueCategories);

    uniqueCategories.forEach(cat => {
      const productsInCat = allProducts
        .filter(p => p.category === cat)
        .slice(0, 8);
      categories[cat] = productsInCat;
    });
  }

  return { categories, categoryList, ...rest };
};


export const useRecommendedItems = () => {
  return useQuery({
    queryKey: ['recommended_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recommended_items')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
};

export const useConfirmedOrdersCount = (userId) => {
  return useQuery({
    queryKey: ['confirmed_orders_count', userId],
    queryFn: async () => {
      if (!userId) return 0;
      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'confirmed');

      if (error) throw error;
      return count || 0;
    },
    enabled: !!userId,
  });
};

export const useOrders = (userId) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
};

export const useRelatedProducts = (category, productId) => {
  return useQuery({
    queryKey: ['related_products', category, productId],
    queryFn: async () => {
      if (!category) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', productId)
        .limit(6);

      if (error) throw error;
      return data || [];
    },
    enabled: !!category,
  });
};

export const useReviews = (productId) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      if (!productId) return [];
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!productId,
  });
};


