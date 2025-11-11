'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { api, ApiRequestError } from '@/lib/api';
import { authStorage } from '@/lib/authStorage';

type CartProduct = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  final_price: number;
  images?: string[] | null;
  stock_quantity?: number | null;
};

export type CartItem = {
  id: string;
  quantity: number;
  added_at?: string;
  item_total: number;
  product: CartProduct;
};

export type CartSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

type CartResponse = {
  items: CartItem[];
  summary: CartSummary;
};

type ExternalProductPayload = {
  external_id: string;
  name: string;
  final_price: number;
  description?: string;
  category?: string;
  images?: string[];
  stock_quantity?: number;
  specifications?: Record<string, unknown>;
};

export type AddToCartInput =
  | {
      productId: string;
      quantity?: number;
    }
  | {
      productId?: null;
      quantity?: number;
      externalProduct: ExternalProductPayload;
    };

type CartContextValue = {
  items: CartItem[];
  summary: CartSummary;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  isAuthenticated: boolean;
  addItem: (input: AddToCartInput) => Promise<void>;
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
};

const EMPTY_SUMMARY: CartSummary = Object.freeze({
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
});

type CartState = {
  items: CartItem[];
  summary: CartSummary;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

const initialState: CartState = {
  items: [],
  summary: EMPTY_SUMMARY,
  loading: false,
  error: null,
  initialized: false,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const parseErrorMessage = (error: unknown) => {
  if (error instanceof ApiRequestError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};

const toApiPayload = (input: AddToCartInput) => {
  if ('externalProduct' in input) {
    const { quantity = 1, externalProduct } = input;
    return {
      quantity,
      product: externalProduct,
    };
  }

  return {
    product_id: input.productId,
    quantity: input.quantity ?? 1,
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(initialState);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = Boolean(token);

  const resetCart = useCallback(() => {
    setState({
      items: [],
      summary: EMPTY_SUMMARY,
      loading: false,
      error: null,
      initialized: true,
    });
  }, []);

  const refresh = useCallback(async () => {
    if (!token) {
      resetCart();
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await api.get<CartResponse>('/cart', {
        token,
        cache: 'no-store',
      });

      setState({
        items: response.items ?? [],
        summary: response.summary ?? EMPTY_SUMMARY,
        loading: false,
        error: null,
        initialized: true,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: parseErrorMessage(error),
        initialized: true,
      }));
    }
  }, [resetCart, token]);

  useEffect(() => {
    setToken(authStorage.token());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleAuthChanged = () => {
      const nextToken = authStorage.token();
      setToken(nextToken);
      if (!nextToken) {
        resetCart();
      } else {
        refresh();
      }
    };

    window.addEventListener('auth:changed', handleAuthChanged);

    return () => {
      window.removeEventListener('auth:changed', handleAuthChanged);
    };
  }, [refresh, resetCart]);

  const requireToken = useCallback(() => {
    const currentToken = authStorage.token();
    if (!currentToken) {
      throw new Error('Please sign in to manage your cart.');
    }
    return currentToken;
  }, []);

  const addItem = useCallback(
    async (input: AddToCartInput) => {
      const currentToken = requireToken();
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const payload = toApiPayload(input);
        const response = await api.post<CartResponse>('/cart', payload, {
          token: currentToken,
        });

        setState({
          items: response.items ?? [],
          summary: response.summary ?? EMPTY_SUMMARY,
          loading: false,
          error: null,
          initialized: true,
        });
      } catch (error) {
        const message = parseErrorMessage(error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: message,
        }));
        throw error;
      }
    },
    [requireToken],
  );

  const updateItemQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      const currentToken = requireToken();

      try {
        await api.put<{ message: string }>(
          `/cart/${cartItemId}`,
          { quantity },
          { token: currentToken },
        );
        await refresh();
      } catch (error) {
        const message = parseErrorMessage(error);
        setState((prev) => ({
          ...prev,
          error: message,
        }));
        throw error;
      }
    },
    [refresh, requireToken],
  );

  const removeItem = useCallback(
    async (cartItemId: string) => {
      const currentToken = requireToken();
      try {
        await api.delete<{ message: string }>(`/cart/${cartItemId}`, {
          token: currentToken,
        });
        await refresh();
      } catch (error) {
        const message = parseErrorMessage(error);
        setState((prev) => ({
          ...prev,
          error: message,
        }));
        throw error;
      }
    },
    [refresh, requireToken],
  );

  const clear = useCallback(async () => {
    const currentToken = requireToken();
    try {
      await api.delete<{ message: string }>('/cart', { token: currentToken });
      resetCart();
    } catch (error) {
      const message = parseErrorMessage(error);
      setState((prev) => ({
        ...prev,
        error: message,
      }));
      throw error;
    }
  }, [requireToken, resetCart]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      summary: state.summary,
      loading: state.loading,
      error: state.error,
      initialized: state.initialized,
      isAuthenticated,
      addItem,
      updateItemQuantity,
      removeItem,
      clear,
      refresh,
    }),
    [
      state.items,
      state.summary,
      state.loading,
      state.error,
      state.initialized,
      isAuthenticated,
      addItem,
      updateItemQuantity,
      removeItem,
      clear,
      refresh,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


