// Shared types matching the API contracts
// See API_CONTRACTS.md for full details

// === Auth ===
export interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
  createdAt?: string;
}

// === Vault ===
export interface Twin {
  id: string;
  name: string;
  relationship?: string;
  avatarUrl?: string;
  videoUrl?: string;
  isActive: boolean;
  status?: "ready" | "processing" | "pending";
  createdAt?: string;
  lastConversationAt?: string;
  conversationCount?: number;
}

export interface VaultPhoto {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
  type: "photo";
}

export interface VaultDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  type: "document";
}

export interface VaultRecording {
  id: string;
  name: string;
  url: string;
  duration: number;
  uploadedAt: string;
  type: "audio";
}

export interface VaultResponse {
  storage: { usedBytes: number; totalBytes: number };
  twins: Twin[];
  photos: VaultPhoto[];
  documents: VaultDocument[];
  recordings: VaultRecording[];
}

// === Upload ===
export type UploadType = "photo" | "document" | "audio" | "story";

export interface UploadResponse {
  items: Array<{ id: string; name: string; url: string; type: string }>;
}

// === Chat ===
export interface ChatMessage {
  id: string;
  role: "user" | "twin";
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  twinId: string;
  audioUrl?: string;
  sourcesUsed?: string[];
}

export interface ConversationHistory {
  messages: ChatMessage[];
  hasMore: boolean;
}

// === Family ===
export type FamilyRole = "owner" | "contributor" | "viewer";

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: FamilyRole;
  status: "active" | "pending";
  joinedAt: string;
  avatarUrl?: string;
}

export interface InviteRequest {
  invitees: Array<{ email: string; role: "viewer" | "contributor" }>;
}

export interface InviteResponse {
  invitations: Array<{ email: string; status: "sent" }>;
}

// === Profile ===
export interface Profile {
  name: string;
  email: string;
  plan: string;
  storageUsed: number;
  storageTotal: number;
  subscriptionStatus: string;
  nextBillingDate?: string;
}

// === API Error ===
export interface ApiError {
  code: string;
  message: string;
}

export class ApiRequestError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "ApiRequestError";
  }
}