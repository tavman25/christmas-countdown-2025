// Christmas Lights Animation

class ChristmasLights {
    constructor() {
        this.lights = document.querySelectorAll('.light');
        this.patterns = [
            'wave',
            'alternate',
            'cascade',
            'sparkle',
            'rainbow',
            'chase'
        ];
        this.currentPattern = 0;
        this.isRunning = true;
        
        this.init();
    }
    
    init() {
        this.startLightShow();
        
        // Change pattern every 10 seconds
        setInterval(() => {
            this.nextPattern();
        }, 10000);
        
        // Add click listeners to individual lights
        this.addLightInteractions();
    }
    
    startLightShow() {
        this.runPattern(this.patterns[this.currentPattern]);
    }
    
    nextPattern() {
        this.currentPattern = (this.currentPattern + 1) % this.patterns.length;
        this.clearAllAnimations();
        setTimeout(() => {
            this.runPattern(this.patterns[this.currentPattern]);
        }, 500);
    }
    
    runPattern(patternName) {
        if (!this.isRunning) return;
        
        switch(patternName) {
            case 'wave':
                this.wavePattern();
                break;
            case 'alternate':
                this.alternatePattern();
                break;
            case 'cascade':
                this.cascadePattern();
                break;
            case 'sparkle':
                this.sparklePattern();
                break;
            case 'rainbow':
                this.rainbowPattern();
                break;
            case 'chase':
                this.chasePattern();
                break;
        }
    }
    
    wavePattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `twinkle 2s infinite`;
            light.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    alternatePattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `twinkle 1s infinite alternate`;
            light.style.animationDelay = `${(index % 2) * 0.5}s`;
        });
    }
    
    cascadePattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `cascade 3s infinite`;
            light.style.animationDelay = `${index * 0.3}s`;
        });
    }
    
    sparklePattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `sparkle 0.5s infinite`;
            light.style.animationDelay = `${Math.random() * 2}s`;
        });
    }
    
    rainbowPattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `rainbow 4s infinite`;
            light.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    chasePattern() {
        this.lights.forEach((light, index) => {
            light.style.animation = `chase 2s infinite`;
            light.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    clearAllAnimations() {
        this.lights.forEach(light => {
            light.style.animation = 'none';
        });
    }
    
    addLightInteractions() {
        this.lights.forEach((light, index) => {
            light.addEventListener('click', () => {
                // Flash the clicked light
                light.style.animation = 'flash 0.3s ease-in-out';
                setTimeout(() => {
                    this.runPattern(this.patterns[this.currentPattern]);
                }, 300);
            });
            
            light.addEventListener('mouseenter', () => {
                light.style.transform = 'scale(1.5)';
                light.style.filter = 'brightness(1.5)';
            });
            
            light.addEventListener('mouseleave', () => {
                light.style.transform = 'scale(1)';
                light.style.filter = 'brightness(1)';
            });
        });
    }
    
    pause() {
        this.isRunning = false;
        this.lights.forEach(light => {
            light.style.animationPlayState = 'paused';
        });
    }
    
    resume() {
        this.isRunning = true;
        this.lights.forEach(light => {
            light.style.animationPlayState = 'running';
        });
    }
    
    setBrightness(level) {
        // level should be between 0 and 1
        this.lights.forEach(light => {
            light.style.filter = `brightness(${level})`;
        });
    }
    
    setSpeed(multiplier) {
        // multiplier affects animation duration
        this.lights.forEach(light => {
            const currentDuration = parseFloat(light.style.animationDuration) || 2;
            light.style.animationDuration = `${currentDuration / multiplier}s`;
        });
    }
}

// Add additional light animations
const lightAnimationStyles = `
    @keyframes cascade {
        0%, 80% { 
            opacity: 0.3; 
            transform: scale(0.8); 
            box-shadow: 0 0 5px currentColor;
        }
        20% { 
            opacity: 1; 
            transform: scale(1.3); 
            box-shadow: 0 0 20px currentColor;
        }
    }
    
    @keyframes sparkle {
        0%, 70% { 
            opacity: 0.2; 
            transform: scale(0.5) rotate(0deg);
            box-shadow: 0 0 3px currentColor;
        }
        15% { 
            opacity: 1; 
            transform: scale(1.5) rotate(180deg);
            box-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) brightness(1); }
        25% { filter: hue-rotate(90deg) brightness(1.2); }
        50% { filter: hue-rotate(180deg) brightness(0.8); }
        75% { filter: hue-rotate(270deg) brightness(1.2); }
        100% { filter: hue-rotate(360deg) brightness(1); }
    }
    
    @keyframes chase {
        0%, 90% { 
            opacity: 0.3; 
            transform: scale(0.9);
        }
        10% { 
            opacity: 1; 
            transform: scale(1.2);
            box-shadow: 0 0 15px currentColor;
        }
    }
    
    @keyframes flash {
        0%, 100% { 
            opacity: 1; 
            transform: scale(1);
        }
        50% { 
            opacity: 0.3; 
            transform: scale(1.8);
            box-shadow: 0 0 25px currentColor;
        }
    }
    
    .light {
        cursor: pointer;
        transition: transform 0.2s ease, filter 0.2s ease;
        position: relative;
    }
    
    .light::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: inherit;
        opacity: 0.3;
        z-index: -1;
    }
    
    .christmas-lights {
        background: linear-gradient(90deg, 
            rgba(196, 30, 58, 0.1) 0%, 
            rgba(34, 139, 34, 0.1) 25%, 
            rgba(65, 105, 225, 0.1) 50%, 
            rgba(255, 215, 0, 0.1) 75%, 
            rgba(196, 30, 58, 0.1) 100%
        );
        backdrop-filter: blur(2px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
`;

// Add light animation styles to document
const lightStyle = document.createElement('style');
lightStyle.textContent = lightAnimationStyles;
document.head.appendChild(lightStyle);

// Initialize Christmas lights when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.christmasLights = new ChristmasLights();
});

// Add keyboard controls for lights
document.addEventListener('keydown', (event) => {
    if (!window.christmasLights) return;
    
    switch(event.key.toLowerCase()) {
        case 'l':
            if (event.ctrlKey) {
                event.preventDefault();
                window.christmasLights.nextPattern();
            }
            break;
        case 'p':
            if (event.ctrlKey) {
                event.preventDefault();
                if (window.christmasLights.isRunning) {
                    window.christmasLights.pause();
                } else {
                    window.christmasLights.resume();
                }
            }
            break;
        case 'arrowup':
            if (event.ctrlKey) {
                event.preventDefault();
                window.christmasLights.setBrightness(1.5);
            }
            break;
        case 'arrowdown':
            if (event.ctrlKey) {
                event.preventDefault();
                window.christmasLights.setBrightness(0.5);
            }
            break;
    }
});

// Auto-adjust lights based on time of day
const adjustLightsForTime = () => {
    const hour = new Date().getHours();
    let brightness = 1;
    
    if (hour >= 6 && hour < 18) {
        // Daytime - dimmer lights
        brightness = 0.7;
    } else {
        // Evening/Night - brighter lights
        brightness = 1.2;
    }
    
    if (window.christmasLights) {
        window.christmasLights.setBrightness(brightness);
    }
};

// Adjust lights when page loads and every hour
document.addEventListener('DOMContentLoaded', adjustLightsForTime);
setInterval(adjustLightsForTime, 3600000); // Every hour
