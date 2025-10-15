package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"time"
)

type CountdownData struct {
	Days    int64 `json:"days"`
	Hours   int64 `json:"hours"`
	Minutes int64 `json:"minutes"`
	Seconds int64 `json:"seconds"`
}

func main() {
	// Serve static files with cache-busting headers
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
	http.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
		// Add cache-busting headers
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		staticHandler.ServeHTTP(w, r)
	})

	// Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK - Christmas Countdown is running! 🎄"))
	})

	// Main page handler
	http.HandleFunc("/", homeHandler)
	
	// Mobile/responsive handler
	http.HandleFunc("/mobile", mobileHandler)
	
	// Wallpaper version handler
	http.HandleFunc("/wallpaper", wallpaperHandler)
	
	// Standalone version handler
	http.HandleFunc("/standalone", standaloneHandler)
	
	// API endpoint for countdown data
	http.HandleFunc("/api/countdown", countdownAPI)

	// Get port from environment variable (for cloud deployment)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("🎄 Christmas Countdown Server starting! 🎄")
	fmt.Printf("Server starting on http://localhost:%s\n", port)
	fmt.Println("Available routes:")
	fmt.Println("  GET /")
	fmt.Println("  GET /mobile")
	fmt.Println("  GET /wallpaper") 
	fmt.Println("  GET /standalone")
	fmt.Println("  GET /health")
	fmt.Println("  GET /api/countdown")
	
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Home handler called for path: %s", r.URL.Path)
	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	err := tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func mobileHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/mobile.html"))
	err := tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func wallpaperHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("templates/wallpaper.html"))
	err := tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func standaloneHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "standalone-christmas-countdown.html")
}

func countdownAPI(w http.ResponseWriter, r *http.Request) {
	// Target date: December 25, 2025 at 12:00 AM local time
	targetDate := time.Date(2025, 12, 25, 0, 0, 0, 0, time.Local)
	now := time.Now()
	
	// Calculate remaining time
	remaining := targetDate.Sub(now)
	
	if remaining <= 0 {
		// Christmas has arrived! 🎄
		data := CountdownData{0, 0, 0, 0}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Calculate days, hours, minutes, seconds
	days := int64(remaining.Hours()) / 24
	hours := int64(remaining.Hours()) % 24
	minutes := int64(remaining.Minutes()) % 60
	seconds := int64(remaining.Seconds()) % 60
	
	data := CountdownData{
		Days:    days,
		Hours:   hours,
		Minutes: minutes,
		Seconds: seconds,
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
