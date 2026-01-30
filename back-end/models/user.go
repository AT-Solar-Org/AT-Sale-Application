package models

import "time"

type User struct {
	ID           string
	Email        string
	PasswordHash string
	Provider     string
	Status       string
	IsApproved   bool
	CreatedAt    time.Time
}
