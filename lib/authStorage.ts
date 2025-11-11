const TOKEN_KEY = "ionora.auth.token";
const USER_KEY = "ionora.auth.user";

type StoredUser = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string | null;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string | null;
};

export type AuthPayload = {
  token: string;
  user: StoredUser;
};

const isBrowser = () => typeof window !== "undefined";

export const authStorage = {
  save({ token, user }: AuthPayload) {
    if (!isBrowser()) return;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth:changed"));
  },
  clear() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("auth:changed"));
  },
  token(): string | null {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  user(): StoredUser | null {
    if (!isBrowser()) return null;
    const value = window.localStorage.getItem(USER_KEY);
    if (!value) return null;
    try {
      return JSON.parse(value) as StoredUser;
    } catch {
      return null;
    }
  },
};


