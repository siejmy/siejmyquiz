package domain

import (
	"encoding/json"

	"gopkg.in/validator.v2"
)

// Result a result of a quiz
type Result struct {
	ID               string  `json:"id" validate:"nonzero"`
	UserName         string  `json:"name" validate:"nonzero"`
	QuizJSON string  `json:"quizJSON" validate:"nonzero"`
	Answers       []uint8   `json:"answers" validate:"min=0"`
}

// Validate validates
func (result Result) Validate() error {
	return validator.Validate(result)
}

// GetQuiz returns quiz object associated with the results
func (result Result) GetQuiz() (QuizABCD, error) {
	var quiz QuizABCD
	err := json.Unmarshal([]byte(result.QuizJSON), &quiz)
	return quiz, err
}

// ResultRepository is a repository for events
type ResultRepository interface {
	GetByID(ID string) (Result, error)
}
