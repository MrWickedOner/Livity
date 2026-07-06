-- Migration 001: Users table
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL DEFAULT '',
    auth_provider TEXT NOT NULL DEFAULT 'clerk',
    auth_provider_id TEXT UNIQUE,
    tier TEXT NOT NULL DEFAULT 'vault' CHECK (tier IN ('vault', 'twin', 'legacy')),
    subscription_status TEXT NOT NULL DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'canceled', 'past_due')),
    stripe_customer_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_auth_provider ON users(auth_provider_id) WHERE deleted_at IS NULL;