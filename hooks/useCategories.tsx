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

const API =
  "https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(API, { headers: { Accept: "application/json" } })
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
