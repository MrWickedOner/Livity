-- Migration 003: Encrypted content references
CREATE TABLE encrypted_content (
    id TEXT PRIMARY KEY,
    vault_id TEXT NOT NULL REFERENCES vaults(id) ON DELETE CASCADE,
    uploader_id TEXT NOT NULL REFERENCES users(id),
    content_type TEXT NOT NULL CHECK (content_type IN (
        'photo', 'document', 'audio', 'letter', 'story', 'portrait'
    )),
    display_name TEXT NOT NULL DEFAULT '',
    mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
    file_size_bytes INTEGER NOT NULL DEFAULT 0,
    storage_key TEXT NOT NULL,
    encryption_algorithm TEXT NOT NULL DEFAULT 'AES-256-GCM',
    encryption_key_id TEXT NOT NULL,
    encryption_nonce BYTEA NOT NULL,
    encryption_tag BYTEA NOT NULL,
    aad_vault_id TEXT NOT NULL,
    sha256_hash BYTEA,
    duration_seconds INTEGER,
    transcript_key TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_content_vault ON encrypted_content(vault_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_type ON encrypted_content(vault_id, content_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_uploader ON encrypted_content(uploader_id);