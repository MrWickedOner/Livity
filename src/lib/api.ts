import { ApiRequestError } from "./types";
import type {
  User,
  VaultResponse,
  UploadResponse,
  Twin,
  ChatRequest,
  ChatResponse,
  ConversationHistory,
  FamilyMember,
  InviteRequest,
  InviteResponse,
  Profile,
} from "./types";

// Default to relative path (same origin) in production,
// or the VITE_API_BASE_URL env var for development/standalone backends.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

// ── Helpers ──────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem("livity_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(
  method: string,
  path: string,
  body?: FormData | unknown,
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...authHeaders(),
  };

  // Let fetch set Content-Type for FormData (includes boundary)
  if (!isFormData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let code = "INTERNAL_ERROR";
    let message = "Something went wrong";
    try {
      const err = (await res.json()) as { error?: { code?: string; message?: string } };
      code = err.error?.code ?? code;
      message = err.error?.message ?? message;
    } catch {
      // non-JSON error
    }
    throw new ApiRequestError(code, message, res.status);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

// ── Auth ─────────────────────────────────────────────────────────────

export const auth = {
  signup(name: string, email: string, password: string) {
    return request<{ user: User; token: string }>("POST", "/api/auth/signup", {
      name,
      email,
      password,
    });
  },

  login(email: string, password: string) {
    return request<{ user: User; token: string }>("POST", "/api/auth/login", {
      email,
      password,
    });
  },

  me() {
    return request<{ user: User }>("GET", "/api/auth/me");
  },

  saveToken(token: string) {
    localStorage.setItem("livity_token", token);
  },

  clearToken() {
    localStorage.removeItem("livity_token");
  },

  isAuthenticated(): boolean {
    return !!getToken();
  },
};

// ── Vault ────────────────────────────────────────────────────────────

export const vault = {
  list() {
    return request<VaultResponse>("GET", "/api/vault");
  },

  upload(files: File[], type: string) {
    const form = new FormData();
    for (const f of files) {
      form.append("files[]", f);
    }
    form.append("type", type);
    return request<UploadResponse>("POST", "/api/vault/upload", form);
  },

  delete(itemId: string) {
    return request<{ deleted: boolean }>(
      "DELETE",
      `/api/vault/items/${itemId}`,
    );
  },
};

// ── Digital Twins ────────────────────────────────────────────────────

export const twins = {
  list() {
    return request<{ twins: Twin[] }>("GET", "/api/twins");
  },

  create(data: {
    name: string;
    relationship?: string;
    photoIds: string[];
    documentIds: string[];
    audioIds: string[];
  }) {
    return request<{ twin: Twin }>("POST", "/api/twins", data);
  },

  get(twinId: string) {
    return request<{ twin: Twin }>("GET", `/api/twins/${twinId}`);
  },

  remove(twinId: string) {
    return request<{ deleted: boolean }>("DELETE", `/api/twins/${twinId}`);
  },
};

// ── Chat ─────────────────────────────────────────────────────────────

export const chat = {
  send(twinId: string, req: ChatRequest) {
    return request<ChatResponse>(
      "POST",
      `/api/twins/${twinId}/chat`,
      req,
    );
  },

  history(twinId: string, limit = 50, before?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (before) params.set("before", before);
    return request<ConversationHistory>(
      "GET",
      `/api/twins/${twinId}/conversations?${params}`,
    );
  },
};

// ── Family ───────────────────────────────────────────────────────────

export const family = {
  list() {
    return request<{ members: FamilyMember[] }>("GET", "/api/family");
  },

  invite(req: InviteRequest) {
    return request<InviteResponse>("POST", "/api/family/invite", req);
  },

  updateRole(memberId: string, role: string) {
    return request<{ id: string; role: string; updated: boolean }>(
      "PATCH",
      `/api/family/members/${memberId}/role`,
      { role },
    );
  },

  remove(memberId: string) {
    return request<{ deleted: boolean }>(
      "DELETE",
      `/api/family/members/${memberId}`,
    );
  },
};

// ── Profile ──────────────────────────────────────────────────────────

export const profile = {
  get() {
    return request<Profile>("GET", "/api/profile");
  },

  update(data: { name?: string }) {
    return request<{ name: string; updated: boolean }>(
      "PATCH",
      "/api/profile",
      data,
    );
  },
};