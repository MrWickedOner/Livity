# Livity API Contracts

**Stack confirmed by owner (2026-07-06):**
- **Talking Head:** Self-hosted [SadTalker](https://github.com/OpenTalker/SadTalker) — generates portrait videos from photos + audio.
- **LLM:** [Mistral AI](https://mistral.ai) (open-weight models) — standard chat completion API.
- **No paid APIs** — everything is open-source or free tier.

---

## 1. Authentication

### `POST /api/auth/signup`
Create a new account.

**Request:**
```json
{ "name": "Alex Rivera", "email": "alex@example.com", "password": "securepassword123" }
```

**Response (201):**
```json
{ "user": { "id": "uuid", "name": "Alex Rivera", "email": "alex@example.com", "createdAt": "2026-07-06T00:00:00Z" }, "token": "jwt-token" }
```

### `POST /api/auth/login`
Authenticate an existing user.

**Request:**
```json
{ "email": "alex@example.com", "password": "securepassword123" }
```

**Response (200):**
```json
{ "user": { "id": "uuid", "name": "Alex Rivera", "email": "alex@example.com" }, "token": "jwt-token" }
```

### `GET /api/auth/me`
Get the current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "user": { "id": "uuid", "name": "Alex Rivera", "email": "alex@example.com", "plan": "twin" } }
```

---

## 2. Vault & Upload

### `GET /api/vault`
List all content in the user's vault, grouped by type.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "storage": { "usedBytes": 156000000, "totalBytes": 50000000000 },
  "twins": [
    { "id": "uuid", "name": "Grandma Rose", "relationship": "Grandmother", "avatarUrl": "https://...", "videoUrl": "https://...", "isActive": true, "createdAt": "2026-06-01T00:00:00Z", "conversationCount": 24 }
  ],
  "photos": [
    { "id": "uuid", "name": "Family reunion 2025", "url": "https://...", "thumbnail": "https://...", "uploadedAt": "2025-12-15T00:00:00Z", "type": "photo" }
  ],
  "documents": [
    { "id": "uuid", "name": "Letter to grandchildren", "url": "https://...", "uploadedAt": "2026-06-10T00:00:00Z", "type": "document" }
  ],
  "recordings": [
    { "id": "uuid", "name": "Grandma telling story", "url": "https://...", "duration": 184, "uploadedAt": "2026-05-20T00:00:00Z", "type": "audio" }
  ]
}
```

### `POST /api/vault/upload`
Upload media files to the vault. The backend will store files, trigger SadTalker processing for photos, and return URLs.

**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`

**Fields:**
- `files[]` — The file(s) to upload
- `type` — One of: `photo`, `document`, `audio`, `story`

**Response (201):**
```json
{ "items": [ { "id": "uuid", "name": "family-photo.jpg", "url": "https://...", "type": "photo" } ] }
```

### `DELETE /api/vault/items/:id`
Delete a vault item.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "deleted": true }
```

---

## 3. Digital Twins

### `GET /api/twins`
List all Digital Twins owned by the user.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "twins": [
    { "id": "uuid", "name": "Grandma Rose", "relationship": "Grandmother", "avatarUrl": "https://...", "videoUrl": "https://...", "isActive": true, "status": "ready"|"processing"|"pending", "createdAt": "2026-06-01T00:00:00Z", "lastConversationAt": "2026-07-05T00:00:00Z", "conversationCount": 24 }
  ]
}
```

### `POST /api/twins`
Create a new Digital Twin from selected vault items. Backend will queue SadTalker processing for photo-based portrait video generation.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{ "name": "Grandma Rose", "relationship": "Grandmother", "photoIds": ["uuid1","uuid2","uuid3"], "documentIds": ["uuid4","uuid5"], "audioIds": ["uuid6"] }
```

**Response (201):**
```json
{ "twin": { "id": "uuid", "name": "Grandma Rose", "relationship": "Grandmother", "avatarUrl": "https://...", "status": "processing", "estimatedCompletionSeconds": 120 } }
```

### `DELETE /api/twins/:id`
Delete a Digital Twin.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "deleted": true }
```

---

## 4. Conversation (Mistral AI)

### `POST /api/twins/:id/chat`
Send a message to a Digital Twin. Backend uses Mistral AI chat completion, injecting context from the twin's uploaded memories. Returns the reply text and optionally an audio URL (generated via TTS).

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{ "message": "Tell me about your childhood, Grandma." }
```

**Response (200):**
```json
{
  "reply": "Oh, that's a wonderful question! Let me tell you about the summer I turned seven...",
  "twinId": "uuid",
  "audioUrl": "https://...",
  "sourcesUsed": ["document-uuid", "recording-uuid"]
}
```

### `GET /api/twins/:id/conversations`
Get conversation history with a Digital Twin.

**Headers:** `Authorization: Bearer <token>`
**Query params:** `?limit=50&before=timestamp`

**Response (200):**
```json
{ "messages": [ { "id": "uuid", "role": "user"|"twin", "content": "Message text here", "timestamp": "2026-07-05T14:30:00Z" } ], "hasMore": false }
```

---

## 5. Family Management

### `GET /api/family`
List family members with access to the vault.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "members": [ { "id": "uuid", "name": "Alex Rivera", "email": "alex@example.com", "role": "owner"|"contributor"|"viewer", "status": "active"|"pending", "joinedAt": "2026-06-01T00:00:00Z", "avatarUrl": "https://..." } ] }
```

### `POST /api/family/invite`
Send invitations to family members.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{ "invitees": [ { "email": "maria@example.com", "role": "viewer" }, { "email": "carlos@example.com", "role": "contributor" } ] }
```

**Response (201):**
```json
{ "invitations": [ { "email": "maria@example.com", "status": "sent" }, { "email": "carlos@example.com", "status": "sent" } ] }
```

### `PATCH /api/family/members/:id/role`
Change a family member's role.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{ "role": "contributor" }
```

**Response (200):**
```json
{ "id": "uuid", "role": "contributor", "updated": true }
```

### `DELETE /api/family/members/:id`
Remove a family member's access.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "deleted": true }
```

---

## 6. Profile & Subscription

### `GET /api/profile`
Get the user's profile and subscription info.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "name": "Alex Rivera", "email": "alex@example.com", "plan": "twin", "storageUsed": 156000000, "storageTotal": 50000000000, "subscriptionStatus": "active", "nextBillingDate": "2026-08-01T00:00:00Z" }
```

### `PATCH /api/profile`
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{ "name": "Alex R." }
```

**Response (200):**
```json
{ "name": "Alex R.", "updated": true }
```

---

## Common Patterns

### Error Responses
All endpoints return errors in a consistent format:
```json
{ "error": { "code": "UNAUTHORIZED", "message": "Invalid or expired token" } }
```

Standard error codes: `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `RATE_LIMITED`, `INTERNAL_ERROR`.

### Pagination
List endpoints support cursor-based pagination:
- Query params: `?limit=20&cursor=timestamp_or_id`
- Response includes `hasMore: boolean`

### Rate Limiting
- 100 requests/minute per authenticated user
- 10 uploads/minute
- Headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`
