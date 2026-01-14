"use client";

import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  childId: string | null;
  imageUrl?: string | null;
  images?: any;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Use Next.js API proxy to avoid CORS issues
    fetch('/api/categories', { 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      } 
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
