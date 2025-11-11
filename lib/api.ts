const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown> | FormData | undefined;
  token?: string | null;
  headers?: HeadersInit;
  cache?: RequestCache;
};

type ApiError = {
  message: string;
  status: number;
  details?: unknown;
};

export class ApiRequestError extends Error {
  status: number;
  details?: unknown;

  constructor({ message, status, details }: ApiError) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

const ensureHeaders = (
  body: ApiFetchOptions["body"],
  headers: HeadersInit | undefined,
) => {
  if (body instanceof FormData) {
    return headers ?? {};
  }

  return {
    "Content-Type": "application/json",
    ...(headers ?? {}),
  };
};

const serializeBody = (body: ApiFetchOptions["body"]) => {
  if (!body) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

export async function apiFetch<TResponse>(
  path: string,
  { method = "GET", body, token, headers, cache }: ApiFetchOptions = {},
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        ...ensureHeaders(body, headers),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: serializeBody(body),
      cache,
      credentials: "include",
    });
  } catch (error) {
    throw new ApiRequestError({
      message:
        "Unable to reach the API server. Please check your network connection or start the backend service.",
      status: 0,
      details: error,
    });
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new ApiRequestError({
      message: (isJson && data?.message) || response.statusText || "Request failed",
      status: response.status,
      details: isJson ? data : undefined,
    });
  }

  return data as TResponse;
}

export const api = {
  post: <TResponse, TBody extends Record<string, unknown>>(
    path: string,
    body: TBody,
    options?: Omit<ApiFetchOptions, "method" | "body">,
  ) => apiFetch<TResponse>(path, { ...options, method: "POST", body }),
  get: <TResponse>(path: string, options?: Omit<ApiFetchOptions, "method">) =>
    apiFetch<TResponse>(path, { ...options, method: "GET" }),
  put: <TResponse, TBody extends Record<string, unknown>>(
    path: string,
    body: TBody,
    options?: Omit<ApiFetchOptions, "method" | "body">,
  ) => apiFetch<TResponse>(path, { ...options, method: "PUT", body }),
  patch: <TResponse, TBody extends Record<string, unknown>>(
    path: string,
    body: TBody,
    options?: Omit<ApiFetchOptions, "method" | "body">,
  ) => apiFetch<TResponse>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(
    path: string,
    options?: Omit<ApiFetchOptions, "method"> & Pick<ApiFetchOptions, "body">,
  ) => apiFetch<TResponse>(path, { ...options, method: "DELETE" }),
};


