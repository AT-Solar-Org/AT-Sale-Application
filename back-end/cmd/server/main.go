package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"

	"at-sale-backend/database"
	"at-sale-backend/handlers"
)

func main() {
	// initialize DB
	ctx := context.Background()
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "postgres://postgres:postgres@localhost:5432/at_sale?sslmode=disable"
	}

	cfg, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		log.Fatalf("invalid database config: %v", err)
	}

	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	database.DB = pool
	defer database.DB.Close()

	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	mux.HandleFunc("/register", handlers.Register)
	mux.HandleFunc("/api/register", handlers.Register)

	log.Println("Go backend running on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
