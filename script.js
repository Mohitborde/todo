// EliteStore - JavaScript Functionality

// DOM Elements
const body = document.body;
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const filterButtons = document.querySelectorAll('.filter-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const quantitySelectors = document.querySelectorAll('.quantity-selector');
const removeButtons = document.querySelectorAll('.remove-btn');
const form = document.querySelector('form');

// Product Data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=1', rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: 299.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=2', rating: 4.7 },
    { id: 3, name: 'Designer Dress', price: 149.99, category: 'fashion', image: 'https://picsum.photos/300/300?random=3', rating: 4.3 },
    { id: 4, name: 'Running Shoes', price: 89.99, category: 'shoes', image: 'https://picsum.photos/300/300?random=4', rating: 4.6 },
    { id: 5, name: 'Leather Wallet', price: 49.99, category: 'accessories', image: 'https://picsum.photos/300/300?random=5', rating: 4.2 },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=6', rating: 4.4 },
    { id: 7, name: 'Sunglasses', price: 129.99, category: 'accessories', image: 'https://picsum.photos/300/300?random=7', rating: 4.1 },
    { id: 8, name: 'Casual Shirt', price: 39.99, category: 'fashion', image: 'https://picsum.photos/300/300?random=8', rating: 4.0 },
    { id: 9, name: 'Gaming Laptop', price: 1299.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=9', rating: 4.8 },
    { id: 10, name: 'Fitness Tracker', price: 59.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=10', rating: 4.2 },
    { id: 11, name: 'Leather Boots', price: 119.99, category: 'shoes', image: 'https://picsum.photos/300/300?random=11', rating: 4.5 },
    { id: 12, name: 'Classic Handbag', price: 199.99, category: 'accessories', image: 'https://picsum.photos/300/300?random=12', rating: 4.6 },
    { id: 13, name: 'Denim Jacket', price: 89.99, category: 'fashion', image: 'https://picsum.photos/300/300?random=13', rating: 4.4 },
    { id: 14, name: 'Formal Shoes', price: 149.99, category: 'shoes', image: 'https://picsum.photos/300/300?random=14', rating: 4.3 },
    { id: 15, name: 'Travel Backpack', price: 79.99, category: 'accessories', image: 'https://picsum.photos/300/300?random=15', rating: 4.7 },
    { id: 16, name: 'Wireless Mouse', price: 29.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=16', rating: 4.2 },
    { id: 17, name: 'Graphic T-Shirt', price: 24.99, category: 'fashion', image: 'https://picsum.photos/300/300?random=17', rating: 4.1 },
    { id: 18, name: 'Sports Sneakers', price: 99.99, category: 'shoes', image: 'https://picsum.photos/300/300?random=18', rating: 4.5 },
    { id: 19, name: 'Luxury Watch', price: 499.99, category: 'accessories', image: 'https://picsum.photos/300/300?random=19', rating: 4.9 },
    { id: 20, name: 'Noise Cancelling Earbuds', price: 149.99, category: 'electronics', image: 'https://picsum.photos/300/300?random=20', rating: 4.6 },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Dark Mode Toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }
}

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Search Functionality
if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Filter Functionality
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredProducts = category === 'all' ?
                products :
                products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        });
    });
}

// Display Products
function displayProducts(productsToDisplay) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="rating">
                <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                <span>${product.rating}</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `product-details.html?id=${product.id}`;

        }

    });
    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product.id));
    return card;
}


// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);


    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });

    }

    updateCart();
    showToast(`${product.name} added to cart!`);
    saveCart();
}

// Update Cart

function updateCart() {
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Update cart page if exists

    const cartMain = document.querySelector('.cart-main');
    if (cartMain) {
        displayCartItems();
    }


    // Update sidebar totals if present
    const sidebarSubtotal = document.getElementById('sidebar-subtotal');
    const sidebarTotal = document.getElementById('sidebar-total');
    if (sidebarSubtotal && sidebarTotal) {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        sidebarSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        sidebarTotal.textContent = `$${subtotal.toFixed(2)}`;
    }

}

// Display Cart Items

function displayCartItems() {
    const cartContainer = document.querySelector('.cart .container');
    if (!cartContainer) return;

    const existingItems = cartContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());


    const cartTotal = cartContainer.querySelector('.cart-total');
    if (cartTotal) cartTotal.remove();

    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartContainer.insertBefore(cartItem, cartContainer.lastElementChild);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
        <div>Total: $${total.toFixed(2)}</div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
    cartContainer.appendChild(totalElement);

    totalElement.querySelector('.checkout-btn').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Create Cart Item
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <div>$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;

    cartItem.querySelector('.minus').addEventListener('click', () => updateQuantity(item.id, -1));
    cartItem.querySelector('.plus').addEventListener('click', () => updateQuantity(item.id, 1));
    cartItem.querySelector('.quantity-input').addEventListener('change', (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity - item.quantity);
        } else {
            removeFromCart(item.id);
        }
    });
    cartItem.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.id));

    return cartItem;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Form Validation
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            showToast('Form submitted successfully!');
            form.reset();
        } else {
            showToast('Please fill in all fields.');
        }
    });
}

// Product Details Page
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.main-image').src = product.image;
        document.querySelector('.product-info-details h1').textContent = product.name;
        document.querySelector('.product-info-details .price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-info-details .rating .stars').textContent = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        document.querySelector('.product-info-details .rating span').textContent = product.rating;
        document.querySelector('.product-info-details p').textContent = `This is a detailed description of the ${product.name}. It features high-quality materials and modern design. Perfect for everyday use.`;

        // Quantity selector
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');

        minusBtn.addEventListener('click', () => {
            const current = parseInt(quantityInput.value);
            if (current > 1) quantityInput.value = current - 1;
        });

        plusBtn.addEventListener('click', () => {
            const current = parseInt(quantityInput.value);
            quantityInput.value = current + 1;
        });

        document.querySelector('.add-to-cart').addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            for (let i = 0; i < quantity; i++) {
                addToCart(product.id);
            }
        });

        // Thumbnail images
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                document.querySelector('.main-image').src = `https://picsum.photos/400/400?random=${index + 1}`;
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    if (document.querySelector('.product-grid')) {
        displayProducts(products);
    }

    if (document.querySelector('.product-details')) {
        loadProductDetails();
    }

    if (document.querySelector('.cart')) {
        displayCartItems();
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Banner Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        // Create dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => showSlide(idx));
            dotsContainer.appendChild(dot);
        });

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
            currentSlide = idx;
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }
        function prevSlide() {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        slides[0].parentElement.addEventListener('mouseenter', stopAutoSlide);
        slides[0].parentElement.addEventListener('mouseleave', startAutoSlide);

        showSlide(0);
        startAutoSlide();
    }
});