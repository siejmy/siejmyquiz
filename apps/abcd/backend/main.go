package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func serveTemplate(w http.ResponseWriter, r *http.Request) {
        lp := filepath.Join("templates", "layout.html")
        fp := filepath.Join("templates", "home.html")

        tmpl, err := template.ParseFiles(lp, fp)
        if err != nil {
                fmt.Fprintf(w, "Error: %v", err)
                return
        }
        tmpl.ExecuteTemplate(w, "layout", nil)
}

func main() {
        log.Print("abcd: starting server...")

        fs := http.FileServer(http.Dir("./static"))
        http.Handle("/static/", http.StripPrefix("/static/", fs))

        http.HandleFunc("/", serveTemplate)

        port := os.Getenv("PORT")
        if port == "" {
                port = "8080"
        }

        log.Printf("helloworld: listening on port %s", port)
        log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
