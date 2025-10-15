// Christmas Countdown JavaScript

class ChristmasCountdown {
    constructor() {
        this.targetDate = new Date('December 25, 2025 00:00:00').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            message: document.getElementById('message'),
            progressFill: document.getElementById('progressFill')
        };
        
        this.messages = [
            "🎄 Christmas magic is in the air! 🎄",
            "🎅 Santa is preparing his sleigh! 🎅",
            "🎁 The elves are wrapping presents! 🎁",
            "❄️ Let it snow, let it snow! ❄️",
            "🦌 Rudolph is ready to guide the way! 🦌",
            "⭐ Wishing upon a Christmas star! ⭐",
            "🔔 Can you hear the jingle bells? 🔔",
            "🍪 Cookies for Santa are ready! 🍪"
        ];
        
        this.currentMessageIndex = 0;
        this.startYear = new Date('January 1, 2025 00:00:00').getTime();
        
        this.init();
    }
    
    init() {
        this.updateCountdown();
        this.updateMessage();
        
        // Update countdown every second
        setInterval(() => this.updateCountdown(), 1000);
        
        // Change message every 5 seconds
        setInterval(() => this.updateMessage(), 5000);
        
        // Fetch from API every 30 seconds for server sync
        setInterval(() => this.fetchFromAPI(), 30000);
        this.fetchFromAPI();
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.handleChristmasArrived();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.updateDisplay(days, hours, minutes, seconds);
        this.updateProgressBar(now);
    }
    
    updateDisplay(days, hours, minutes, seconds) {
        this.elements.days.textContent = this.padZero(days);
        this.elements.hours.textContent = this.padZero(hours);
        this.elements.minutes.textContent = this.padZero(minutes);
        this.elements.seconds.textContent = this.padZero(seconds);
        
        // Add pulse animation to seconds
        this.elements.seconds.style.animation = 'none';
        setTimeout(() => {
            this.elements.seconds.style.animation = 'pulse 1s ease-in-out';
        }, 10);
    }
    
    updateProgressBar(now) {
        const totalDuration = this.targetDate - this.startYear;
        const elapsed = now - this.startYear;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        
        this.elements.progressFill.style.width = `${progress}%`;
    }
    
    updateMessage() {
        this.elements.message.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.message.textContent = this.messages[this.currentMessageIndex];
            this.elements.message.style.opacity = '1';
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
        }, 300);
    }
    
    handleChristmasArrived() {
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
        this.elements.message.textContent = '🎄 MERRY CHRISTMAS! 🎄';
        this.elements.progressFill.style.width = '100%';
        
        // Add celebration effects
        document.body.classList.add('christmas-arrived');
        this.startCelebration();
    }
    
    startCelebration() {
        // Create falling gift boxes
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createFallingGift();
            }, i * 200);
        }
    }
    
    createFallingGift() {
        const gift = document.createElement('div');
        gift.textContent = '🎁';
        gift.style.position = 'fixed';
        gift.style.fontSize = '2rem';
        gift.style.left = Math.random() * 100 + '%';
        gift.style.top = '-50px';
        gift.style.zIndex = '1000';
        gift.style.animation = 'fall 3s linear forwards';
        
        document.body.appendChild(gift);
        
        setTimeout(() => {
            gift.remove();
        }, 3000);
    }
    
    async fetchFromAPI() {
        try {
            const response = await fetch('/api/countdown');
            const data = await response.json();
            
            if (data.target_date) {
                const serverTargetDate = new Date(data.target_date).getTime();
                if (Math.abs(serverTargetDate - this.targetDate) > 1000) {
                    this.targetDate = serverTargetDate;
                    console.log('Countdown synchronized with server');
                }
            }
        } catch (error) {
            console.log('Using client-side countdown (server sync unavailable)');
        }
    }
    
    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}

// Add CSS for celebration
const celebrationStyle = `
    .christmas-arrived {
        animation: celebration 2s ease-in-out infinite alternate;
    }
    
    @keyframes celebration {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const style = document.createElement('style');
style.textContent = celebrationStyle;
document.head.appendChild(style);

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChristmasCountdown();
});

// Add click effects to time units
document.addEventListener('DOMContentLoaded', () => {
    const timeUnits = document.querySelectorAll('.time-unit');
    
    timeUnits.forEach(unit => {
        unit.addEventListener('click', () => {
            unit.style.transform = 'perspective(1000px) rotateY(360deg) scale(1.1)';
            setTimeout(() => {
                unit.style.transform = 'perspective(1000px) rotateX(5deg)';
            }, 600);
        });
    });
});
