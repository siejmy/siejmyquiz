package functions

import (
	"fmt"
	"net/http"
)

// ResultCbC8qrjxSk7UWmaHhslI cloud function
func ResultCbC8qrjxSk7UWmaHhslI(w http.ResponseWriter,  r *http.Request) {
	fmt.Fprintf(w, "Hello, %s!", "world")
}
