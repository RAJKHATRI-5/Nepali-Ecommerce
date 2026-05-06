// ============================================
// HAPTIC FEEDBACK MODULE
// Handles Web Vibration API integration
// Milestone 5: Enhanced with debouncing, more patterns
// ============================================

const HapticFeedback = {
    
    // Debounce tracking
    _lastVibrationTime: 0,
    _minInterval: 300, // Minimum 300ms between vibrations
    
    // ============================================
    // CHECK DEVICE SUPPORT
    // ============================================
    
    isSupported: function() {
        return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
    },
    
    // ============================================
    // CHECK USER PREFERENCE
    // ============================================
    
    isEnabled: function() {
        const preference = localStorage.getItem('hapticsEnabled');
        // Default to true if not set
        return preference === null || preference === 'true';
    },
    
    // ============================================
    // SET USER PREFERENCE
    // ============================================
    
    setEnabled: function(enabled) {
        localStorage.setItem('hapticsEnabled', String(enabled));
        console.log('Haptics ' + (enabled ? 'enabled' : 'disabled'));
    },
    
    // ============================================
    // VIBRATION PATTERNS
    // Based on UX research for mobile commerce
    // Intensity calibrated per Milestone 3 design
    // ============================================
    
    patterns: {
        // Low intensity: Neutral/minor actions (30-50ms)
        tap: 50,                        // View details, filter selection
        
        // Medium-low: Cart actions (100ms)
        addToCart: 100,                 // Primary use case - satisfaction feedback
        
        // Distinct pattern for removal
        removeFromCart: [30, 20, 30],   // Double pulse - distinguishes from add
        
        // Medium: Confirmations (100-150ms)
        confirm: 150,                   // Proceeding to checkout
        success: [100, 50, 100],        // Payment complete - success celebration
        
        // Higher intensity: Errors/alerts (200ms+)
        error: [30, 20, 30, 20, 30],   // Triple short pulse - alert pattern
        notification: 200,              // Important notifications
        
        // Special: Checkout complete - strongest feedback
        checkoutComplete: [200, 100, 200]  // Double long pulse - celebration
    },
    
    // ============================================
    // TRIGGER VIBRATION (with debouncing)
    // ============================================
    
    vibrate: function(patternName) {
        // Check if supported
        if (!this.isSupported()) {
            console.log('Vibration API not supported on this device');
            return false;
        }
        
        // Check if user has enabled haptics
        if (!this.isEnabled()) {
            console.log('Haptics disabled by user preference');
            return false;
        }
        
        // Debounce: prevent rapid-fire vibrations
        const now = Date.now();
        if (now - this._lastVibrationTime < this._minInterval) {
            console.log('Haptic debounced - too soon after last vibration');
            return false;
        }
        
        // Get pattern
        const pattern = this.patterns[patternName];
        
        if (!pattern) {
            console.error('Unknown haptic pattern: ' + patternName);
            return false;
        }
        
        // Trigger vibration
        try {
            navigator.vibrate(pattern);
            this._lastVibrationTime = now;
            console.log('Vibration triggered: ' + patternName);
            return true;
        } catch (error) {
            console.error('Vibration failed:', error);
            return false;
        }
    },
    
    // ============================================
    // STOP ALL VIBRATIONS
    // ============================================
    
    stop: function() {
        if (this.isSupported()) {
            navigator.vibrate(0);
        }
    },
    
    // ============================================
    // DISPLAY STATUS TO USER
    // ============================================
    
    getStatusMessage: function() {
        if (!this.isSupported()) {
            return 'Haptic feedback not supported on this device';
        }
        if (!this.isEnabled()) {
            return 'Haptic feedback is disabled';
        }
        return 'Haptic feedback is enabled';
    }
};

// ============================================
// LOG HAPTICS STATUS ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Haptics.js loaded');
    console.log('Device support:', HapticFeedback.isSupported());
    console.log('User enabled:', HapticFeedback.isEnabled());
});
