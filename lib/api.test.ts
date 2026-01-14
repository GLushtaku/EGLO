// Simple test file to verify API service functionality
import { apiService, ApiError } from './api'

// Test API service instantiation
console.log('API Service Base URL:', apiService)

// Test error handling
const testError = new ApiError('Test error', 400, { field: 'email' })
console.log('ApiError test:', testError.message, testError.status)

// Test token management
const mockAuthResponse: AuthResponse = {
  token: 'test-token-123',
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    phone: '',
    roles: [],
  },
};

apiService.setToken(mockAuthResponse);
console.log('Token set:', apiService.getToken());
console.log('Is authenticated:', apiService.isAuthenticated());

apiService.removeToken()
console.log('Token removed:', apiService.getToken())
console.log('Is authenticated after removal:', apiService.isAuthenticated())

export {}
