package database

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

// DB is a package-level database pool. Initialize this from your main() before
// using handlers (e.g. database.DB, or pass a configured *pgxpool.Pool into handlers).
var DB *pgxpool.Pool
