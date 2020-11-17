package domain

import "gopkg.in/validator.v2"

// QuizABCD definition of an ABCD quiz
type QuizABCD struct {
	ID               string  `json:"id" validate:"nonzero"`
	Type         string  `json:"type" validate:"nonzero"`
	IntroHTML string  `json:"introHtml" validate:"nonzero"`
	IntroImageURL string  `json:"introImageUrl" validate:"nonzero"`
	Questions []QuizABCDQuestion  `json:"questions"`

	Answers       []uint8   `json:"answers" validate:"min=0"`
}

// Validate validates
func (quiz QuizABCD) Validate() error {
	err := validator.Validate(quiz)
	if err != nil {
		return err
	}
	for _, question := range quiz.Questions {
		err = question.Validate()
		if err != nil {
			return err
		}
	}
	return nil
}

// QuizABCDQuestion definition of an ABCD quiz question
type QuizABCDQuestion struct {
	Title         string  `json:"title" validate:"nonzero"`
	ImageURL         string  `json:"imageUrl"`
	Distractors []string  `json:"distractors"`
	CorrectNo uint8  `json:"correctNo" validate:"min=0"`
}

// Validate validates
func (question QuizABCDQuestion) Validate() error {
	return validator.Validate(question)
}

