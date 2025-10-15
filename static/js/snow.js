// Snow Animation for Christmas Countdown

class SnowEffect {
    constructor() {
        this.container = document.querySelector('.snow-container');
        this.snowflakes = [];
        this.maxSnowflakes = 50;
        this.snowSymbols = ['❄', '❅', '✻', '✼', '❆', '✶'];
        
        this.init();
    }
    
    init() {
        this.createSnowflakes();
        this.startSnowing();
        
        // Adjust snowflake count based on performance
        this.adjustForPerformance();
    }
    
    createSnowflakes() {
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.createSnowflake();
        }
    }
    
    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = this.getRandomSnowSymbol();
        
        // Random starting position
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Random animation duration and delay
        const duration = Math.random() * 8 + 5; // 5-13 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        
        // Add slight horizontal drift
        const drift = (Math.random() - 0.5) * 100; // -50px to 50px
        snowflake.style.setProperty('--drift', drift + 'px');
        
        this.container.appendChild(snowflake);
        this.snowflakes.push(snowflake);
        
        // Remove snowflake after animation completes
        setTimeout(() => {
            this.removeSnowflake(snowflake);
        }, (duration + delay) * 1000);
    }
    
    removeSnowflake(snowflake) {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
        
        const index = this.snowflakes.indexOf(snowflake);
        if (index > -1) {
            this.snowflakes.splice(index, 1);
        }
    }
    
    startSnowing() {
        // Create new snowflakes periodically
        setInterval(() => {
            if (this.snowflakes.length < this.maxSnowflakes) {
                this.createSnowflake();
            }
        }, 300);
    }
    
    getRandomSnowSymbol() {
        return this.snowSymbols[Math.floor(Math.random() * this.snowSymbols.length)];
    }
    
    adjustForPerformance() {
        // Reduce snowflakes on mobile devices
        if (window.innerWidth < 768) {
            this.maxSnowflakes = 25;
        }
        
        // Reduce snowflakes if performance is poor
        let frameCount = 0;
        let startTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            if (frameCount === 60) { // Check after 60 frames
                const elapsed = performance.now() - startTime;
                const fps = 60000 / elapsed;
                
                if (fps < 30) { // If FPS is below 30
                    this.maxSnowflakes = Math.max(10, this.maxSnowflakes * 0.5);
                    console.log('Reduced snowflakes for better performance');
                }
            } else {
                requestAnimationFrame(checkPerformance);
            }
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    pauseSnow() {
        this.snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'paused';
        });
    }
    
    resumeSnow() {
        this.snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'running';
        });
    }
    
    increaseSnow() {
        this.maxSnowflakes = Math.min(100, this.maxSnowflakes + 10);
    }
    
    decreaseSnow() {
        this.maxSnowflakes = Math.max(5, this.maxSnowflakes - 10);
    }
}

// Enhanced snow animation with drift
const enhancedSnowStyle = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) translateX(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(50vh) translateX(var(--drift, 0px)) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) translateX(calc(var(--drift, 0px) * 2)) rotate(360deg);
            opacity: 0;
        }
    }
    
    .snowflake {
        filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
        animation-timing-function: ease-in;
    }
    
    .snowflake:hover {
        animation-play-state: paused;
        transform: scale(1.5);
        cursor: pointer;
    }
`;

// Add enhanced styles
const snowStyle = document.createElement('style');
snowStyle.textContent = enhancedSnowStyle;
document.head.appendChild(snowStyle);

// Initialize snow effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.snowEffect = new SnowEffect();
});

// Add keyboard controls for snow
document.addEventListener('keydown', (event) => {
    if (!window.snowEffect) return;
    
    switch(event.key.toLowerCase()) {
        case 's':
            if (event.ctrlKey) {
                event.preventDefault();
                window.snowEffect.pauseSnow();
            }
            break;
        case 'r':
            if (event.ctrlKey) {
                event.preventDefault();
                window.snowEffect.resumeSnow();
            }
            break;
        case '+':
        case '=':
            if (event.ctrlKey) {
                event.preventDefault();
                window.snowEffect.increaseSnow();
            }
            break;
        case '-':
            if (event.ctrlKey) {
                event.preventDefault();
                window.snowEffect.decreaseSnow();
            }
            break;
    }
});

// Pause snow when tab is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (!window.snowEffect) return;
    
    if (document.hidden) {
        window.snowEffect.pauseSnow();
    } else {
        window.snowEffect.resumeSnow();
    }
});
