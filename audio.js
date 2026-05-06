// ============================================
// AUDIO FEEDBACK MODULE
// Provides audio cues as alternative/complement to haptic feedback
// Milestone 5: New feature - fallback for iOS/desktop
// ============================================

const AudioFeedback = {
    
    // Audio context for generating tones
    _audioContext: null,
    
    // ============================================
    // CHECK USER PREFERENCE
    // ============================================
    
    isEnabled: function() {
        const preference = localStorage.getItem('audioEnabled');
        // Default to false - audio is opt-in
        return preference === 'true';
    },
    
    // ============================================
    // SET USER PREFERENCE
    // ============================================
    
    setEnabled: function(enabled) {
        localStorage.setItem('audioEnabled', String(enabled));
        console.log('Audio feedback ' + (enabled ? 'enabled' : 'disabled'));
    },
    
    // ============================================
    // GET OR CREATE AUDIO CONTEXT
    // ============================================
    
    _getContext: function() {
        if (!this._audioContext) {
            try {
                this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.error('Web Audio API not supported:', e);
                return null;
            }
        }
        return this._audioContext;
    },
    
    // ============================================
    // SOUND DEFINITIONS
    // Using Web Audio API for lightweight synthesized sounds
    // No external audio files needed - keeps page load fast
    // ============================================
    
    sounds: {
        // Short click for minor interactions
        tap: { frequency: 800, duration: 0.05, type: 'sine', volume: 0.15 },
        
        // Pleasant tone for add to cart
        addToCart: { frequency: 600, duration: 0.1, type: 'sine', volume: 0.2 },
        
        // Lower tone for removal
        removeFromCart: { frequency: 400, duration: 0.08, type: 'sine', volume: 0.15 },
        
        // Two-tone success sound
        success: { frequency: 800, duration: 0.15, type: 'sine', volume: 0.2, 
                   secondFreq: 1200, secondDelay: 0.1 },
        
        // Descending tone for error
        error: { frequency: 500, duration: 0.15, type: 'square', volume: 0.12,
                 secondFreq: 350, secondDelay: 0.1 },
        
        // Notification ping
        notification: { frequency: 1000, duration: 0.12, type: 'sine', volume: 0.18 },
        
        // Checkout complete - happy ascending tones
        checkoutComplete: { frequency: 600, duration: 0.12, type: 'sine', volume: 0.2,
                           secondFreq: 900, secondDelay: 0.12 }
    },
    
    // ============================================
    // PLAY SOUND
    // ============================================
    
    play: function(soundName) {
        if (!this.isEnabled()) {
            return false;
        }
        
        const ctx = this._getContext();
        if (!ctx) return false;
        
        const sound = this.sounds[soundName];
        if (!sound) {
            console.error('Unknown audio sound: ' + soundName);
            return false;
        }
        
        try {
            // Resume context if suspended (browser autoplay policy)
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            
            // Create primary tone
            this._playTone(ctx, sound.frequency, sound.duration, sound.type, sound.volume, 0);
            
            // Create secondary tone if defined (for two-tone sounds)
            if (sound.secondFreq) {
                this._playTone(ctx, sound.secondFreq, sound.duration, sound.type, sound.volume, sound.secondDelay);
            }
            
            console.log('Audio played: ' + soundName);
            return true;
        } catch (error) {
            console.error('Audio playback failed:', error);
            return false;
        }
    },
    
    // ============================================
    // PLAY INDIVIDUAL TONE
    // ============================================
    
    _playTone: function(ctx, frequency, duration, type, volume, delay) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
        
        gainNode.gain.setValueAtTime(volume, ctx.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start(ctx.currentTime + delay);
        oscillator.stop(ctx.currentTime + delay + duration + 0.05);
    }
};

// ============================================
// LOG AUDIO STATUS ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Audio.js loaded');
    console.log('Audio enabled:', AudioFeedback.isEnabled());
});
