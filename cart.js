// ============================================
// SHOPPING CART MODULE
// Handles all cart operations with localStorage persistence
// Milestone 5: Enhanced with checkout workflow, order confirmation
// ============================================

const Cart = {
    items: [],
    
    // ============================================
    // INITIALIZE CART
    // ============================================
    
    init: function() {
        console.log('Cart.js initializing...');
        this.loadFromStorage();
        this.updateUI();
        this.attachEventListeners();
    },
    
    // ============================================
    // LOAD CART FROM LOCALSTORAGE
    // ============================================
    
    loadFromStorage: function() {
        try {
            const saved = localStorage.getItem('nepaliShopCart');
            if (saved) {
                this.items = JSON.parse(saved);
                console.log('Cart loaded from localStorage:', this.items.length + ' items');
            } else {
                console.log('No saved cart found');
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.items = [];
        }
    },
    
    // ============================================
    // SAVE CART TO LOCALSTORAGE
    // ============================================
    
    save: function() {
        try {
            localStorage.setItem('nepaliShopCart', JSON.stringify(this.items));
            console.log('Cart saved to localStorage');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    },
    
    // ============================================
    // ADD ITEM TO CART
    // ============================================
    
    addItem: function(productId, quantity) {
        quantity = quantity || 1;
        console.log('=== ADD ITEM CALLED ===');
        console.log('Product ID:', productId);
        
        // Find product in products array
        var product = products.find(function(p) { return p.id === productId; });
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }
        
        // Check if item already in cart
        var existingItem = this.items.find(function(item) { return item.id === productId; });
        
        if (existingItem) {
            existingItem.quantity += quantity;
            console.log('Increased quantity for:', product.name);
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
            console.log('Added to cart:', product.name);
        }
        
        // Save and update UI
        this.save();
        this.updateUI();
        
        // Trigger haptic feedback
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('addToCart');
        }
        
        // Trigger audio feedback
        if (typeof AudioFeedback !== 'undefined') {
            AudioFeedback.play('addToCart');
        }
        
        // Show notification
        this.showNotification('✓ ' + product.name + ' added to cart', 'success');
        console.log('=== ADD ITEM COMPLETE ===');
    },
    
    // ============================================
    // REMOVE ITEM FROM CART
    // ============================================
    
    removeItem: function(productId) {
        var item = this.items.find(function(i) { return i.id === productId; });
        var itemName = item ? item.name : 'Item';
        
        this.items = this.items.filter(function(item) { return item.id !== productId; });
        
        this.save();
        this.updateUI();
        
        // Trigger haptic feedback
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('removeFromCart');
        }
        
        // Trigger audio feedback
        if (typeof AudioFeedback !== 'undefined') {
            AudioFeedback.play('removeFromCart');
        }
        
        this.showNotification('✗ ' + itemName + ' removed from cart', 'remove');
        console.log('Removed from cart:', itemName);
    },
    
    // ============================================
    // UPDATE ITEM QUANTITY
    // ============================================
    
    updateQuantity: function(productId, newQuantity) {
        newQuantity = parseInt(newQuantity);
        
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        var item = this.items.find(function(item) { return item.id === productId; });
        if (item) {
            item.quantity = newQuantity;
            this.save();
            this.updateUI();
            console.log('Updated quantity:', item.name, newQuantity);
        }
    },
    
    // ============================================
    // CALCULATE CART TOTAL
    // ============================================
    
    getTotal: function() {
        return this.items.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    // ============================================
    // GET TOTAL ITEM COUNT
    // ============================================
    
    getTotalItems: function() {
        return this.items.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
    },
    
    // ============================================
    // CLEAR CART
    // ============================================
    
    clear: function() {
        this.items = [];
        this.save();
        this.updateUI();
        console.log('Cart cleared');
    },
    
    // ============================================
    // UPDATE UI ELEMENTS
    // ============================================
    
    updateUI: function() {
        this.updateCartBadge();
        
        var cartContainer = document.getElementById('cart-items');
        if (cartContainer) {
            this.renderCartPage();
        }
    },
    
    // ============================================
    // UPDATE CART BADGE
    // ============================================
    
    updateCartBadge: function() {
        var cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            var totalItems = this.getTotalItems();
            cartBadge.textContent = totalItems;
            
            // Add animation
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(function() {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }
    },
    
    // ============================================
    // RENDER CART PAGE
    // ============================================
    
    renderCartPage: function() {
        var container = document.getElementById('cart-items');
        var totalElement = document.getElementById('cart-total');
        var checkoutSection = document.getElementById('checkout-section');
        
        if (!container) return;
        
        // Empty cart state
        if (this.items.length === 0) {
            container.innerHTML = 
                '<div class="empty-cart">' +
                    '<h3>Your cart is empty</h3>' +
                    '<p>Add some authentic Nepali products to get started!</p>' +
                    '<a href="index.html" class="btn btn-primary">Browse Products</a>' +
                '</div>';
            if (totalElement) {
                totalElement.textContent = '£0.00';
            }
            if (checkoutSection) {
                checkoutSection.style.display = 'none';
            }
            return;
        }
        
        if (checkoutSection) {
            checkoutSection.style.display = '';
        }
        
        // Render cart items
        var html = '';
        this.items.forEach(function(item) {
            html += 
                '<div class="cart-item" data-id="' + item.id + '">' +
                    '<img src="' + item.image + '" alt="' + item.name + '" class="cart-item-image" ' +
                         'onerror="this.src=\'https://via.placeholder.com/100x100?text=Product\'">' +
                    '<div class="cart-item-details">' +
                        '<h3 class="cart-item-name">' + item.name + '</h3>' +
                        '<p class="cart-item-price">£' + item.price.toFixed(2) + '</p>' +
                    '</div>' +
                    '<div class="cart-item-quantity">' +
                        '<button class="quantity-btn" onclick="Cart.updateQuantity(' + item.id + ', ' + (item.quantity - 1) + ')">−</button>' +
                        '<input type="number" class="quantity-input" value="' + item.quantity + '" min="1" ' +
                               'onchange="Cart.updateQuantity(' + item.id + ', this.value)">' +
                        '<button class="quantity-btn" onclick="Cart.updateQuantity(' + item.id + ', ' + (item.quantity + 1) + ')">+</button>' +
                    '</div>' +
                    '<div class="cart-item-total">' +
                        '£' + (item.price * item.quantity).toFixed(2) +
                    '</div>' +
                    '<button class="cart-item-remove" onclick="Cart.removeItem(' + item.id + ')" title="Remove item">' +
                        '×' +
                    '</button>' +
                '</div>';
        });
        
        container.innerHTML = html;
        
        if (totalElement) {
            totalElement.textContent = '£' + this.getTotal().toFixed(2);
        }
    },
    
    // ============================================
    // SHOW NOTIFICATION
    // ============================================
    
    showNotification: function(message, type) {
        type = type || 'success';
        // Remove existing notifications
        var existing = document.querySelector('.cart-notification');
        if (existing) {
            existing.remove();
        }
        
        var notification = document.createElement('div');
        notification.className = 'cart-notification ' + type;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    // ============================================
    // ATTACH EVENT LISTENERS
    // ============================================
    
    attachEventListeners: function() {
        var self = this;
        
        // Checkout button
        var checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (self.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                self.showCheckoutForm();
            });
        }
    },
    
    // ============================================
    // CHECKOUT FORM
    // ============================================
    
    showCheckoutForm: function() {
        var self = this;
        
        // Trigger haptic
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('confirm');
        }
        
        var modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'checkout-modal';
        
        modal.innerHTML = 
            '<div class="modal-content checkout-modal-content">' +
                '<button class="modal-close" onclick="Cart.closeCheckout()" aria-label="Close">&times;</button>' +
                '<div class="checkout-form-container">' +
                    '<h2>Checkout</h2>' +
                    '<div class="checkout-order-summary">' +
                        '<h3>Order Summary</h3>' +
                        '<div id="checkout-items"></div>' +
                        '<div class="checkout-total">' +
                            '<strong>Total: £' + self.getTotal().toFixed(2) + '</strong>' +
                        '</div>' +
                    '</div>' +
                    '<div class="checkout-fields">' +
                        '<h3>Delivery Information</h3>' +
                        '<div class="form-group">' +
                            '<label for="checkout-name">Full Name *</label>' +
                            '<input type="text" id="checkout-name" placeholder="Enter your full name" required>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="checkout-email">Email Address *</label>' +
                            '<input type="email" id="checkout-email" placeholder="your@email.com" required>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="checkout-address">Delivery Address *</label>' +
                            '<textarea id="checkout-address" placeholder="Enter your full delivery address" rows="3" required></textarea>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="checkout-country">Country *</label>' +
                            '<select id="checkout-country">' +
                                '<option value="UK">United Kingdom</option>' +
                                '<option value="US">United States</option>' +
                                '<option value="AU">Australia</option>' +
                                '<option value="EU">Europe</option>' +
                                '<option value="other">Other</option>' +
                            '</select>' +
                        '</div>' +
                        '<h3>Payment Method</h3>' +
                        '<div class="payment-options">' +
                            '<label class="payment-option">' +
                                '<input type="radio" name="payment" value="card" checked>' +
                                '<span class="payment-label">💳 Credit/Debit Card</span>' +
                            '</label>' +
                            '<label class="payment-option">' +
                                '<input type="radio" name="payment" value="cod">' +
                                '<span class="payment-label">💵 Cash on Delivery</span>' +
                            '</label>' +
                        '</div>' +
                        '<p class="checkout-note">⚠️ This is a prototype. No real transactions are processed.</p>' +
                        '<button class="btn btn-primary btn-full" onclick="Cart.processOrder()">Place Order - £' + self.getTotal().toFixed(2) + '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        requestAnimationFrame(function() {
            modal.classList.add('show');
        });
        
        // Populate order summary items
        var checkoutItems = document.getElementById('checkout-items');
        if (checkoutItems) {
            var itemsHtml = '';
            self.items.forEach(function(item) {
                itemsHtml += '<div class="checkout-item">' +
                    '<span>' + item.name + ' × ' + item.quantity + '</span>' +
                    '<span>£' + (item.price * item.quantity).toFixed(2) + '</span>' +
                '</div>';
            });
            checkoutItems.innerHTML = itemsHtml;
        }
        
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Cart.closeCheckout();
            }
        });
    },
    
    closeCheckout: function() {
        var modal = document.getElementById('checkout-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(function() {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    },
    
    // ============================================
    // PROCESS ORDER (Simulated)
    // ============================================
    
    processOrder: function() {
        var self = this;
        
        // Validate form
        var name = document.getElementById('checkout-name');
        var email = document.getElementById('checkout-email');
        var address = document.getElementById('checkout-address');
        
        if (!name.value.trim() || !email.value.trim() || !address.value.trim()) {
            // Error feedback
            if (typeof HapticFeedback !== 'undefined') {
                HapticFeedback.vibrate('error');
            }
            if (typeof AudioFeedback !== 'undefined') {
                AudioFeedback.play('error');
            }
            self.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        if (!email.value.includes('@') || !email.value.includes('.')) {
            if (typeof HapticFeedback !== 'undefined') {
                HapticFeedback.vibrate('error');
            }
            self.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Success!
        // Generate order number
        var orderNum = 'NP-' + Date.now().toString(36).toUpperCase();
        
        // Trigger success haptic
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('checkoutComplete');
        }
        
        // Trigger success audio
        if (typeof AudioFeedback !== 'undefined') {
            AudioFeedback.play('checkoutComplete');
        }
        
        // Close checkout modal
        self.closeCheckout();
        
        // Show order confirmation
        var total = self.getTotal();
        var itemCount = self.getTotalItems();
        
        var confirmModal = document.createElement('div');
        confirmModal.className = 'modal-overlay';
        confirmModal.id = 'confirmation-modal';
        
        confirmModal.innerHTML = 
            '<div class="modal-content confirmation-modal-content">' +
                '<div class="confirmation-content">' +
                    '<div class="confirmation-icon">✓</div>' +
                    '<h2>Order Confirmed!</h2>' +
                    '<p class="order-number">Order #' + orderNum + '</p>' +
                    '<div class="confirmation-details">' +
                        '<p><strong>' + itemCount + ' item' + (itemCount !== 1 ? 's' : '') + '</strong> totalling <strong>£' + total.toFixed(2) + '</strong></p>' +
                        '<p>Shipping from Nepal to ' + (document.getElementById('checkout-country') ? document.getElementById('checkout-country').value : 'UK') + '</p>' +
                        '<p>Estimated delivery: 7-14 business days</p>' +
                    '</div>' +
                    '<p class="confirmation-note">A confirmation email will be sent to ' + email.value + '</p>' +
                    '<p class="prototype-note">⚠️ This is a prototype demonstration. No actual order has been placed.</p>' +
                    '<a href="index.html" class="btn btn-primary btn-full">Continue Shopping</a>' +
                '</div>' +
            '</div>';
        
        document.body.appendChild(confirmModal);
        
        requestAnimationFrame(function() {
            confirmModal.classList.add('show');
        });
        
        // Clear cart
        self.clear();
        
        // Close on overlay click
        confirmModal.addEventListener('click', function(e) {
            if (e.target === confirmModal) {
                confirmModal.classList.remove('show');
                setTimeout(function() {
                    confirmModal.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
};

// ============================================
// INITIALIZE CART ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    Cart.init();
});
