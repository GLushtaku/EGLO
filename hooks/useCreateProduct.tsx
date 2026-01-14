'use client';

import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/lib/api';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  productDetailsJson: string;
  dimensionsJson: string;
  technicalInfoJson: string;
  otherInfoJson: string;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
  };
}

export function useCreateProduct() {
  return useMutation<CreateProductResponse, Error, CreateProductRequest>({
    mutationFn: async (data: CreateProductRequest) => {
      return await apiService.post<CreateProductResponse>('/products', data);
    },
  });
}

