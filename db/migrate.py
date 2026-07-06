#!/usr/bin/env python3
"""
Database migration runner for Livity Vault.

Usage:
    python db/migrate.py                  # Apply all pending migrations
    python db/migrate.py --check           # Check migration status

Requires DATABASE_URL environment variable to be set.
"""

import os
import sys
from pathlib import Path

MIGRATIONS_DIR = Path(__file__).parent / "migrations"


def get_migrations() -> list[Path]:
    """Return sorted list of migration SQL files."""
    return sorted(MIGRATIONS_DIR.glob("*.sql"))


def get_db_connection():
    """Get a psycopg connection from DATABASE_URL."""
    try:
        import psycopg
    except ImportError:
        print("ERROR: psycopg not installed. Run: pip install psycopg[binary]")
        sys.exit(1)

    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        print("ERROR: DATABASE_URL environment variable is not set.")
        sys.exit(1)

    return psycopg.connect(database_url)


def create_migrations_table(conn):
    """Ensure the _migrations tracking table exists."""
    conn.execute("""
        CREATE TABLE IF NOT EXISTS _migrations (
            filename    TEXT PRIMARY KEY,
            applied_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
            checksum    TEXT NOT NULL
        )
    """)


def get_applied_migrations(conn) -> set[str]:
    """Return set of already-applied migration filenames."""
    rows = conn.execute("SELECT filename FROM _migrations ORDER BY filename").fetchall()
    return {row[0] for row in rows}


def compute_checksum(path: Path) -> str:
    import hashlib
    return hashlib.sha256(path.read_bytes()).hexdigest()


def apply_migration(conn, path: Path):
    print(f"  Applying {path.name}...", end=" ", flush=True)
    sql = path.read_text()
    conn.execute(sql)
    conn.execute(
        "INSERT INTO _migrations (filename, checksum) VALUES (%s, %s)",
        (path.name, compute_checksum(path)),
    )
    print("OK")


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Livity Vault migration runner")
    parser.add_argument("--check", action="store_true", help="Check migration status")
    args = parser.parse_args()

    migrations = get_migrations()
    print(f"Found {len(migrations)} migration(s)")

    conn = get_db_connection()
    try:
        create_migrations_table(conn)
        applied = get_applied_migrations(conn)

        pending = [m for m in migrations if m.name not in applied]
        if not pending:
            print("All migrations have been applied.")
            return

        if args.check:
            print(f"{len(pending)} pending migration(s):")
            for m in pending:
                print(f"  - {m.name}")
            return

        print(f"Applying {len(pending)} migration(s):")
        for migration in pending:
            apply_migration(conn, migration)
            conn.commit()

        print("All migrations applied successfully.")

    except Exception as e:
        conn.rollback()
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
    finally:
        conn.close()


if __name__ == "__main__":
    main()