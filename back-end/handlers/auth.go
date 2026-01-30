package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"log"

	"golang.org/x/crypto/bcrypt"

	"at-sale-backend/database"
)

// RegisterRequest represents the JSON body for user registration.
type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	req.Email = strings.TrimSpace(req.Email)
	req.Password = strings.TrimSpace(req.Password)

	// basic validation
	if req.Email == "" || req.Password == "" {
		http.Error(w, "Email and password required", http.StatusBadRequest)
		return
	}

	if len(req.Password) < 8 {
		http.Error(w, "Password must be at least 8 characters", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// check if email exists
	var exists bool
	err := database.DB.QueryRow(ctx,
		"SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)",
		req.Email,
	).Scan(&exists)

	if err != nil {
		log.Println("DB ERROR:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if exists {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	}

	// hash password
	hash, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		http.Error(w, "Password error", http.StatusInternalServerError)
		return
	}

	// insert user
	_, err = database.DB.Exec(ctx, `
		INSERT INTO users (
			email,
			password_hash,
			provider,
			status,
			is_approved,
			created_at
		)
		VALUES ($1, $2, 'local', 'pending', false, NOW())
	`,
		req.Email,
		string(hash),
	)

	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Registration successful. Await admin approval.",
	})
}
