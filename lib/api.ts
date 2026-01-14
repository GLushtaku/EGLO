// lib/api.ts
import { jwtDecode } from 'jwt-decode';

export const API_BASE_URL = '/api';

// ----------------------------- Error ----------------------------------------
export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const isApiError = (e: unknown): e is ApiError =>
  typeof e === 'object' &&
  e !== null &&
  (e as any).name === 'ApiError' &&
  'status' in (e as any);

// ----------------------------- Internals ------------------------------------
const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const hasStringMessage = (v: unknown): v is { message: string } =>
  isObject(v) && typeof (v as any).message === 'string';

// ----------------------------- Service --------------------------------------
class ApiService {
  constructor(private baseURL = API_BASE_URL) {
    // console.log('baseURL =>', API_BASE_URL);
  }

  private url(endpoint: string) {
    return `${this.baseURL}${
      endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    }`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = this.url(endpoint);

    console.log('url', url);

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 API_BASE_URL:', this.baseURL);
      console.log('🔍 endpoint:', endpoint);
      console.log('🔍 Full URL:', url);
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const authResponse = this.getToken();
    if (authResponse?.token) {
      (
        headers as Record<string, string>
      ).Authorization = `Bearer ${authResponse.token}`;
    }

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      let body: unknown = {};
      try {
        body = await res.json();
      } catch {}

      const message = hasStringMessage(body)
        ? body.message
        : `HTTP error! status: ${res.status}`;

      throw new ApiError(message, res.status, body);
    }

    return (await res.json()) as T;
  }

  // ------------------------- Convenience HTTP helpers -----------------------
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T, B = unknown>(
    endpoint: string,
    body?: B,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T, B = unknown>(
    endpoint: string,
    body?: B,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // ------------------------- Public endpoints --------------------------------
  async login(data: LoginRequest): Promise<AuthResponse> {
    const eglo = await this.request<EgloApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return this.toAuthResponse(eglo);
  }

  async signup(
    data: SignupRequest
  ): Promise<{ success: boolean; message: string }> {
    const eglo = await this.request<EgloApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!eglo.success) {
      throw new ApiError(eglo.message || 'Signup failed', 400, eglo.errors);
    }

    return { success: eglo.success, message: eglo.message };
  }

  logout(): void {
    this.removeToken();
  }

  async refreshToken(): Promise<AuthResponse> {
    throw new ApiError('Token refresh not implemented', 501);
  }

  // --------------------------- Token helpers ---------------------------------
  setToken(res: AuthResponse): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(res));
    }
  }

  getToken(): AuthResponse | null {
    try {
      return typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('auth_user') || 'null')
        : null;
    } catch (error) {
      return null;
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ------------------------- Convert helper ----------------------------------
  private toAuthResponse(r: EgloApiResponse): AuthResponse {
    if (!r.success || !r.token || !r.user) {
      throw new ApiError(r.message || 'Authentication failed', 400, r.errors);
    }

    const jwtPayload = jwtDecode(r.token || '') as any;

    const email =
      jwtPayload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    const name =
      jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const role =
      jwtPayload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    const split = name.split(' ');
    let firstName = name || '';
    let lastName = '';

    if (split.length > 1) {
      firstName = split[0];
      lastName = split[1];
    }

    return {
      token: r.token,
      user: {
        id: r.user.userId,
        email: email || r.user.email || '',
        firstName,
        lastName,
        fullName: lastName ? `${firstName} ${lastName}` : '',
        phone: '',
        roles: role ? [role] : r.user.roles || [],
      },
    };
  }
}

export const apiService = new ApiService();
