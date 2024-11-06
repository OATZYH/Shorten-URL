export interface User {
  user_id: string;
  username: string;
  is_admin: boolean;
}

export interface URLShortened {
  url_id: string;
  short_code: string;
  long_url: string;
  click_count: number;
  created_at: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}