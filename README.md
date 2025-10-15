# 🎄 Christmas Countdown 2025 🎄

A festive web application that displays a beautiful countdown timer to Christmas Day 2025 with stunning holiday animations and effects.

## ✨ Features

- **Real-time Countdown**: Dynamic countdown to December 25, 2025 at midnight
- **Christmas Theming**: Festive red, green, and gold color scheme
- **Snow Animation**: Beautiful falling snowflakes with realistic physics
- **Christmas Lights**: Animated twinkling lights with multiple patterns
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Versions**: Main, mobile, wallpaper, and standalone versions
- **API Endpoint**: RESTful API for countdown data
- **Performance Optimized**: Efficient animations with performance monitoring

## 🎨 Visual Effects

### Snow Effects
- Realistic falling snowflakes with random sizes and speeds
- Performance-optimized with automatic adjustment based on device capabilities
- Interactive snowflakes that pause on hover
- Keyboard controls for snow intensity

### Christmas Lights
- Multiple animation patterns: wave, alternate, cascade, sparkle, rainbow, chase
- Auto-cycling through different light patterns
- Interactive lights that respond to clicks and hover
- Time-based brightness adjustment
- Keyboard controls for pattern switching

### Holiday Animations
- Bouncing Christmas icons (🎁🎅❄️🦌⭐🔔🕯️🍪)
- Glowing text effects with color transitions
- 3D perspective transforms on countdown units
- Progress bar showing year completion
- Celebration effects when Christmas arrives

## 🚀 Getting Started

### Prerequisites
- Go 1.21 or higher
- Modern web browser

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Run the server:

```bash
go run main.go
```

4. Open your browser to `http://localhost:8080`

### Building

To build an executable:

```bash
go build -o christmas-countdown main.go
```

Then run:

```bash
./christmas-countdown
```

## 🌐 Available Routes

- **`/`** - Main Christmas countdown page
- **`/mobile`** - Mobile-optimized version
- **`/wallpaper`** - Wallpaper/background version
- **`/standalone`** - Standalone version with all assets inline
- **`/api/countdown`** - JSON API endpoint for countdown data
- **`/health`** - Health check endpoint

## 🎮 Keyboard Controls

### Snow Controls
- **Ctrl+S**: Pause snow animation
- **Ctrl+R**: Resume snow animation
- **Ctrl++**: Increase snow intensity
- **Ctrl+-**: Decrease snow intensity

### Light Controls
- **Ctrl+L**: Switch to next light pattern
- **Ctrl+P**: Pause/resume light animations
- **Ctrl+↑**: Increase light brightness
- **Ctrl+↓**: Decrease light brightness

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:

- **Desktop**: Full featured experience with all animations
- **Tablet**: Optimized layout with reduced animation complexity
- **Mobile**: Mobile-first design with performance optimizations

## 🎯 Target Date

The countdown targets **December 25, 2025 at 12:00 AM** local time.

## 🛠️ Technology Stack

- **Backend**: Go (net/http)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Fonts**: Google Fonts (Dancing Script, Cinzel)
- **Icons**: Unicode emoji and symbols

## 📁 Project Structure

```
XmasCountdown/
├── main.go                    # Go web server
├── go.mod                     # Go module definition
├── templates/
│   └── index.html            # Main HTML template
├── static/
│   ├── css/
│   │   └── styles.css        # Christmas-themed styles
│   └── js/
│       ├── countdown.js      # Countdown logic and API
│       ├── snow.js          # Snow animation system
│       └── lights.js        # Christmas lights animation
└── .github/
    └── copilot-instructions.md  # Development guidelines
```

## 🎨 Color Palette

- **Christmas Red**: `#C41E3A`
- **Christmas Green**: `#228B22`
- **Christmas Gold**: `#FFD700`
- **Snow White**: `#FFFFFF`
- **Dark Green**: `#0F4F0F`
- **Cream**: `#FFF8DC`

## 🔧 Configuration

The server runs on port **8080** by default. To change the port, modify the `main.go` file or set an environment variable:

```bash
export PORT=3000
go run main.go
```

## 🎄 Special Features

### Christmas Arrival
When Christmas Day arrives, the countdown transforms into a celebration mode with:
- Special "MERRY CHRISTMAS!" message
- Falling gift box animations
- Color-cycling celebration effects
- Confetti-like visual effects

### Performance Optimization
- Automatic performance monitoring
- Dynamic animation reduction on slower devices
- Pause animations when tab is not visible
- Optimized snowflake generation

### API Integration
The countdown synchronizes with the server API every 30 seconds to ensure accuracy across all clients.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the Christmas countdown experience!

## 🎅 Happy Holidays!

Made with ❤️ and lots of holiday spirit. May your countdown to Christmas be filled with joy and anticipation!

---

*"The best way to spread Christmas cheer is coding loud for all to hear!"* 🎄✨
