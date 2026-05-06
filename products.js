// ============================================
// PRODUCT DATA
// Nepali e-commerce platform product catalogue
// Milestone 5: Enhanced with categories, filtering, search
// ============================================

const products = [
    {
        id: 1,
        name: "Traditional Dhaka Topi",
        price: 15.99,
        image: "images/products/dhaka-topi.jpg",
        description: "Handwoven traditional Nepali hat from Palpa district",
        cultural_context: "The Dhaka topi is a symbol of Nepali national identity, worn during festivals, weddings, and formal occasions. Each region of Nepal produces distinct patterns, with Palpa district being renowned for its intricate geometric designs. The hat represents pride and cultural heritage for Nepali people worldwide.",
        artisan: "Handwoven by local artisans in Tansen, Palpa",
        origin: "Palpa District, Nepal",
        category: "clothing",
        inStock: true
    },
    {
        id: 2,
        name: "Tibetan Singing Bowl",
        price: 45.00,
        image: "images/products/singing-bowl.jpg",
        description: "Authentic handcrafted singing bowl from Kathmandu",
        cultural_context: "Singing bowls have been used in meditation, healing, and religious ceremonies across the Himalayan region for centuries. Each bowl is hand-hammered from a blend of seven metals, producing unique resonant tones. They are central to Buddhist meditation practices and are believed to promote relaxation and spiritual well-being.",
        artisan: "Master craftsmen in Patan, Lalitpur",
        origin: "Kathmandu Valley, Nepal",
        category: "spiritual",
        inStock: true
    },
    {
        id: 3,
        name: "Pashmina Shawl",
        price: 89.99,
        image: "images/products/pashmina.jpg",
        description: "Premium cashmere pashmina from the Himalayan highlands",
        cultural_context: "Pashmina, derived from the Persian word 'pashm' meaning wool, has been a prized luxury textile for over 500 years. Nepali pashmina comes from the Chyangra mountain goat found above 3,000 metres in the Himalayas. The fine fibres are hand-spun and hand-woven, making each shawl a unique work of art.",
        artisan: "Women's weaving cooperative in Bhaktapur",
        origin: "Mustang District, Nepal",
        category: "clothing",
        inStock: true
    },
    {
        id: 4,
        name: "Lokta Paper Journal",
        price: 12.50,
        image: "images/products/lokta-journal.jpg",
        description: "Handmade journal using traditional Lokta paper",
        cultural_context: "Lokta paper-making is an ancient Nepali craft using bark from the Daphne shrub found in the Himalayan forests. The paper is naturally durable, insect-resistant, and environmentally sustainable as the shrub regenerates after harvesting. Historically used for sacred texts and government documents, Lokta paper represents Nepal's rich paper-making heritage.",
        artisan: "Community papermakers in Baglung",
        origin: "Baglung District, Nepal",
        category: "crafts",
        inStock: true
    },
    {
        id: 5,
        name: "Khukuri Knife",
        price: 65.00,
        image: "images/products/khukuri.jpg",
        description: "Traditional Gurkha knife, handforged in Dharan",
        cultural_context: "The khukuri is the iconic curved knife of Nepal, serving as both a practical tool and a symbol of Gurkha bravery and honour. Each khukuri is hand-forged by Kami blacksmiths using traditional techniques passed down through generations. The distinctive inward-curving blade is designed for chopping and has been carried by Gurkha soldiers since the 19th century.",
        artisan: "Traditional Kami blacksmith family in Dharan",
        origin: "Dharan, Sunsari District, Nepal",
        category: "cultural",
        inStock: true
    },
    {
        id: 6,
        name: "Prayer Flags Set",
        price: 18.00,
        image: "images/products/prayer-flags.jpg",
        description: "Traditional Buddhist prayer flags - set of 25",
        cultural_context: "Prayer flags carry sacred mantras and prayers that are believed to spread goodwill, compassion, and positive energy as the wind passes over them. The five colours represent the five elements: blue (sky), white (air), red (fire), green (water), and yellow (earth). They are hung at high points where the wind can carry their blessings.",
        artisan: "Buddhist monastery workshop in Boudhanath",
        origin: "Boudhanath, Kathmandu, Nepal",
        category: "spiritual",
        inStock: true
    },
    {
        id: 7,
        name: "Dhaka Fabric Bag",
        price: 28.50,
        image: "images/products/dhaka-bag.jpg",
        description: "Handwoven shoulder bag with traditional Dhaka patterns",
        cultural_context: "Dhaka fabric features intricate geometric patterns unique to Nepal, traditionally woven on handlooms. The diamond and zigzag motifs carry cultural significance, with different patterns representing different regions and communities. This bag combines traditional weaving with modern functionality.",
        artisan: "Women's weaving group in Palpa",
        origin: "Palpa District, Nepal",
        category: "accessories",
        inStock: true
    },
    {
        id: 8,
        name: "Nepali Tea Set",
        price: 32.00,
        image: "images/products/tea-set.jpg",
        description: "Premium Himalayan tea collection with traditional cups",
        cultural_context: "Nepali tea culture blends Tibetan butter tea traditions with Indian chai influences. Nepal's tea gardens in Ilam and Dhankuta produce some of the finest orthodox teas in the world, grown at altitudes between 1,000 and 2,000 metres. This set includes premium first-flush tea with handcrafted ceramic cups.",
        artisan: "Ceramic artisans in Thimi, Bhaktapur",
        origin: "Ilam District, Nepal",
        category: "food",
        inStock: true
    },
    {
        id: 9,
        name: "Thangka Painting",
        price: 125.00,
        image: "images/products/thangka.jpg",
        description: "Small traditional Buddhist thangka painting",
        cultural_context: "Thangka paintings are sacred Buddhist art used for meditation, teaching, and decoration. Each painting follows strict iconographic rules and can take months to complete. Artists use natural mineral pigments and gold leaf, with techniques unchanged for centuries. This thangka depicts traditional Buddhist imagery and serves as a focus for meditation practice.",
        artisan: "Thangka painting school in Patan",
        origin: "Patan, Lalitpur, Nepal",
        category: "art",
        inStock: true
    },
    {
        id: 10,
        name: "Bamboo Flute (Bansuri)",
        price: 22.00,
        image: "images/products/bansuri.jpg",
        description: "Handcrafted bamboo flute from traditional artisans",
        cultural_context: "The bansuri is central to Nepali folk music and spiritual practices, associated with Lord Krishna in Hindu mythology. Crafted from a single piece of bamboo, each flute is carefully tuned by hand. The instrument produces warm, melodic tones that are integral to traditional Nepali music, from folk songs to devotional bhajans.",
        artisan: "Traditional instrument maker in Kirtipur",
        origin: "Kirtipur, Kathmandu, Nepal",
        category: "music",
        inStock: true
    }
];

// ============================================
// CATEGORY DEFINITIONS
// ============================================

const categories = [
    { id: "all", name: "All Products", icon: "🏪" },
    { id: "clothing", name: "Clothing", icon: "👘" },
    { id: "spiritual", name: "Spiritual", icon: "🕉️" },
    { id: "crafts", name: "Crafts", icon: "🎨" },
    { id: "cultural", name: "Cultural", icon: "🏛️" },
    { id: "accessories", name: "Accessories", icon: "👜" },
    { id: "food", name: "Food & Drink", icon: "🍵" },
    { id: "art", name: "Art", icon: "🖼️" },
    { id: "music", name: "Music", icon: "🎵" }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let currentCategory = "all";
let searchQuery = "";

// ============================================
// DISPLAY PRODUCTS ON PAGE
// ============================================

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.log('Products grid not found - not on products page');
        return;
    }
    
    // Filter products
    let filtered = products;
    
    // Category filter
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Search filter
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.cultural_context.toLowerCase().includes(query)
        );
    }
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // No results message
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button class="btn btn-secondary" onclick="clearFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    // Results count
    const countEl = document.getElementById('results-count');
    if (countEl) {
        countEl.textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '') + ' found';
    }
    
    // Create product cards
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// ============================================
// CREATE PRODUCT CARD (Enhanced with detail view)
// ============================================

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.innerHTML = `
        <div class="product-image-container" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
            <div class="image-overlay">
                <span>View Details</span>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category-tag">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">£${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-origin">📍 ${product.origin}</p>
            <button class="btn btn-primary btn-full" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// ============================================
// PRODUCT DETAIL MODAL
// ============================================

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Trigger haptic feedback for view details
    if (typeof HapticFeedback !== 'undefined') {
        HapticFeedback.vibrate('tap');
    }
    
    // Trigger audio feedback
    if (typeof AudioFeedback !== 'undefined') {
        AudioFeedback.play('tap');
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductDetail()" aria-label="Close">&times;</button>
            <div class="modal-body">
                <div class="modal-image-section">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image"
                         onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}'">
                </div>
                <div class="modal-info-section">
                    <span class="product-category-tag">${product.category}</span>
                    <h2 class="modal-product-name">${product.name}</h2>
                    <p class="modal-product-price">£${product.price.toFixed(2)}</p>
                    <p class="modal-product-description">${product.description}</p>
                    
                    <div class="cultural-context">
                        <h3>Cultural Significance</h3>
                        <p>${product.cultural_context}</p>
                    </div>
                    
                    <div class="artisan-info">
                        <h3>Artisan Information</h3>
                        <p>🧑‍🎨 ${product.artisan}</p>
                        <p>📍 Origin: ${product.origin}</p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeProductDetail();">
                            Add to Cart - £${product.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductDetail();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', handleModalEscape);
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeProductDetail();
    }
}

function closeProductDetail() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalEscape);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function handleSearch(value) {
    searchQuery = value;
    displayProducts();
}

function clearSearch() {
    searchQuery = "";
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = "";
    }
    displayProducts();
}

// ============================================
// CATEGORY FILTER
// ============================================

function filterByCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active state on buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
    
    // Trigger haptic feedback
    if (typeof HapticFeedback !== 'undefined') {
        HapticFeedback.vibrate('tap');
    }
    
    displayProducts();
}

function clearFilters() {
    currentCategory = "all";
    searchQuery = "";
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = "";
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    displayProducts();
}

// ============================================
// BUILD FILTER UI
// ============================================

function buildFilterUI() {
    const filterContainer = document.getElementById('filter-container');
    if (!filterContainer) return;
    
    let html = '<div class="category-filters">';
    categories.forEach(cat => {
        const isActive = cat.id === currentCategory ? ' active' : '';
        html += `<button class="category-btn${isActive}" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
            ${cat.icon} ${cat.name}
        </button>`;
    });
    html += '</div>';
    
    filterContainer.innerHTML = html;
}

// ============================================
// ADD TO CART
// ============================================

function addToCart(productId) {
    if (typeof Cart !== 'undefined') {
        Cart.addItem(productId);
    } else {
        console.error('Cart object not loaded');
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Products.js loaded');
    buildFilterUI();
    displayProducts();
    
    // Set up search with debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                handleSearch(e.target.value);
            }, 300);
        });
    }
});
