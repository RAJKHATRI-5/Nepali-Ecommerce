// ============================================
// SETTINGS MODULE
// Manages user preferences for haptic and audio feedback
// Milestone 5: New feature for accessibility
// ============================================

const Settings = {
    
    // ============================================
    // INITIALIZE SETTINGS PAGE
    // ============================================
    
    init: function() {
        console.log('Settings.js initializing...');
        this.renderSettingsUI();
        this.loadPreferences();
    },
    
    // ============================================
    // RENDER SETTINGS UI
    // ============================================
    
    renderSettingsUI: function() {
        var container = document.getElementById('settings-container');
        if (!container) return;
        
        var html = 
            '<div class="settings-section">' +
                '<h3>Haptic Feedback</h3>' +
                '<p class="settings-description">Vibration feedback for actions like adding to cart and completing purchases. ' +
                    'Only available on supported Android devices.</p>' +
                '<div class="settings-status" id="haptic-status"></div>' +
                '<div class="setting-row">' +
                    '<label for="haptic-toggle">Enable Haptic Feedback</label>' +
                    '<label class="toggle-switch">' +
                        '<input type="checkbox" id="haptic-toggle" onchange="Settings.toggleHaptics(this.checked)">' +
                        '<span class="toggle-slider"></span>' +
                    '</label>' +
                '</div>' +
                '<button class="btn btn-secondary btn-sm" onclick="Settings.testHaptics()">Test Vibration</button>' +
            '</div>' +
            
            '<div class="settings-section">' +
                '<h3>Audio Feedback</h3>' +
                '<p class="settings-description">Sound cues for interactions. Useful as an alternative on devices without haptic support, ' +
                    'or as a complement to vibration feedback.</p>' +
                '<div class="setting-row">' +
                    '<label for="audio-toggle">Enable Audio Feedback</label>' +
                    '<label class="toggle-switch">' +
                        '<input type="checkbox" id="audio-toggle" onchange="Settings.toggleAudio(this.checked)">' +
                        '<span class="toggle-slider"></span>' +
                    '</label>' +
                '</div>' +
                '<button class="btn btn-secondary btn-sm" onclick="Settings.testAudio()">Test Sound</button>' +
            '</div>' +
            
            '<div class="settings-section">' +
                '<h3>Cart Data</h3>' +
                '<p class="settings-description">Your shopping cart data is stored locally in your browser. ' +
                    'It persists across sessions but is specific to this device.</p>' +
                '<div class="setting-row">' +
                    '<span id="cart-data-info">Loading...</span>' +
                '</div>' +
                '<button class="btn btn-secondary btn-sm" onclick="Settings.clearCartData()">Clear Cart Data</button>' +
            '</div>' +
            
            '<div class="settings-section">' +
                '<h3>About This Platform</h3>' +
                '<p class="settings-description">Nepali Treasures is a BSc Computer Science final year project ' +
                    'exploring how haptic feedback and multimodal interaction can enhance the online shopping experience ' +
                    'for diaspora communities purchasing culturally significant products.</p>' +
                '<p class="settings-description"><strong>Student:</strong> Raj Khatri (2228573)</p>' +
                '<p class="settings-description"><strong>Technologies:</strong> HTML5, CSS3, JavaScript, Web Vibration API, Web Audio API</p>' +
            '</div>';
        
        container.innerHTML = html;
    },
    
    // ============================================
    // LOAD SAVED PREFERENCES
    // ============================================
    
    loadPreferences: function() {
        // Haptic toggle
        var hapticToggle = document.getElementById('haptic-toggle');
        if (hapticToggle && typeof HapticFeedback !== 'undefined') {
            hapticToggle.checked = HapticFeedback.isEnabled();
        }
        
        // Haptic status
        var hapticStatus = document.getElementById('haptic-status');
        if (hapticStatus && typeof HapticFeedback !== 'undefined') {
            hapticStatus.textContent = HapticFeedback.getStatusMessage();
            hapticStatus.className = 'settings-status ' + (HapticFeedback.isSupported() ? 'status-ok' : 'status-warn');
        }
        
        // Audio toggle
        var audioToggle = document.getElementById('audio-toggle');
        if (audioToggle && typeof AudioFeedback !== 'undefined') {
            audioToggle.checked = AudioFeedback.isEnabled();
        }
        
        // Cart data info
        var cartInfo = document.getElementById('cart-data-info');
        if (cartInfo && typeof Cart !== 'undefined') {
            var itemCount = Cart.getTotalItems();
            cartInfo.textContent = itemCount + ' item' + (itemCount !== 1 ? 's' : '') + ' in cart (£' + Cart.getTotal().toFixed(2) + ')';
        }
    },
    
    // ============================================
    // TOGGLE HAPTICS
    // ============================================
    
    toggleHaptics: function(enabled) {
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.setEnabled(enabled);
            this.loadPreferences();
        }
    },
    
    // ============================================
    // TOGGLE AUDIO
    // ============================================
    
    toggleAudio: function(enabled) {
        if (typeof AudioFeedback !== 'undefined') {
            AudioFeedback.setEnabled(enabled);
        }
    },
    
    // ============================================
    // TEST HAPTICS
    // ============================================
    
    testHaptics: function() {
        if (typeof HapticFeedback !== 'undefined') {
            var wasEnabled = HapticFeedback.isEnabled();
            if (!wasEnabled) {
                HapticFeedback.setEnabled(true);
            }
            var result = HapticFeedback.vibrate('success');
            if (!wasEnabled) {
                HapticFeedback.setEnabled(false);
            }
            if (!result) {
                alert('Haptic feedback not available on this device. Try on an Android phone with Chrome.');
            }
        }
    },
    
    // ============================================
    // TEST AUDIO
    // ============================================
    
    testAudio: function() {
        if (typeof AudioFeedback !== 'undefined') {
            var wasEnabled = AudioFeedback.isEnabled();
            if (!wasEnabled) {
                AudioFeedback.setEnabled(true);
            }
            AudioFeedback.play('success');
            if (!wasEnabled) {
                AudioFeedback.setEnabled(false);
            }
        }
    },
    
    // ============================================
    // CLEAR CART DATA
    // ============================================
    
    clearCartData: function() {
        if (confirm('Are you sure you want to clear all cart data?')) {
            if (typeof Cart !== 'undefined') {
                Cart.clear();
            }
            this.loadPreferences();
            alert('Cart data cleared.');
        }
    }
};

// ============================================
// INITIALIZE ON SETTINGS PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    var settingsContainer = document.getElementById('settings-container');
    if (settingsContainer) {
        Settings.init();
    }
});
