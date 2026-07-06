-- Migration 004: Family member invitations
CREATE TABLE invitations (
    id TEXT PRIMARY KEY,
    vault_id TEXT NOT NULL REFERENCES vaults(id) ON DELETE CASCADE,
    inviter_id TEXT NOT NULL REFERENCES users(id),
    invitee_email TEXT NOT NULL,
    invitee_name TEXT NOT NULL DEFAULT '',
    invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    access_level TEXT NOT NULL DEFAULT 'read' CHECK (access_level IN ('read', 'write_memory')),
    message TEXT NOT NULL DEFAULT '',
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
    accepted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invitations_vault ON invitations(vault_id);
CREATE INDEX idx_invitations_email ON invitations(invitee_email);
CREATE INDEX idx_invitations_code ON invitations(invite_code) WHERE accepted_at IS NULL AND revoked_at IS NULL AND expires_at > now();