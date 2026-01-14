
// ----------------------------- Types ----------------------------------------
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupRequest {
  email: string;
  password: string;
}

interface EgloApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    email: string;
    userId: string;
    roles?: string[];
  };
  errors?: string[];
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    phone?: string;
    roles?: string[];
  };
  expiresIn?: number;
}