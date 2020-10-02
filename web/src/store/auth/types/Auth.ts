export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthSuccessPayload {
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: AuthUser | null;
}
