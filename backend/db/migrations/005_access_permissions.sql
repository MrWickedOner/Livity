-- Migration 005: Access permissions
CREATE TABLE access_permissions (
    id TEXT PRIMARY KEY,
    vault_id TEXT NOT NULL REFERENCES vaults(id) ON DELETE CASCADE,
    grantee_id TEXT NOT NULL REFERENCES users(id),
    granted_by TEXT NOT NULL REFERENCES users(id),
    level TEXT NOT NULL DEFAULT 'read' CHECK (level IN ('read', 'write_memory', 'admin')),
    can_add_photos BOOLEAN NOT NULL DEFAULT false,
    can_add_stories BOOLEAN NOT NULL DEFAULT false,
    can_add_audio BOOLEAN NOT NULL DEFAULT false,
    can_add_letters BOOLEAN NOT NULL DEFAULT false,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    revoked_by TEXT REFERENCES users(id)
);

CREATE INDEX idx_permissions_vault ON access_permissions(vault_id);
CREATE INDEX idx_permissions_grantee ON access_permissions(grantee_id);
CREATE INDEX idx_permissions_active ON access_permissions(vault_id, grantee_id) WHERE revoked_at IS NULL;