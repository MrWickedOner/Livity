-- Migration 002: Vaults table
CREATE TABLE vaults (
    id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'My Legacy Vault',
    description TEXT NOT NULL DEFAULT '',
    cover_photo_key TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    master_key_envelope BYTEA,
    master_key_nonce BYTEA,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vaults_owner ON vaults(owner_id) WHERE deleted_at IS NULL;