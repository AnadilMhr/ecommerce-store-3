const cartProducts = document.getElementById('cart-products');
const cartTotal = document.getElementById('cart-total');

let cartItems = [];

// Function to render cart products
function renderCartProducts() {
    cartProducts.innerHTML = '';
    let total = 0;

    cartItems.forEach(product => {
        const cartProductItem = document.createElement('div');
        cartProductItem.classList.add('cart-product-item');
        cartProductItem.innerHTML = `
            <div><img src="image/${product.image}"/></div>
            <div class="opo">
            <h3 class="name">${product.name}</h3>
            <div class="handle">
            <button class="increment-btn" data-id="${product.id}">+</button>
            <span class="quantity">${product.quantity}</span>
            <button class="decrement-btn" data-id="${product.id}">-</button>
            </div>
            </div>
            <p class="price">Price: $${product.price}</p>
           <button class="remove-btn" data-id="${product.id}">Remove from Cart</button>
        `;

        const incrementBtn = cartProductItem.querySelector('.increment-btn');
        incrementBtn.addEventListener('click', () => incrementProduct(product.id));

        const decrementBtn = cartProductItem.querySelector('.decrement-btn');
        decrementBtn.addEventListener('click', () => decrementProduct(product.id));

        const removeBtn = cartProductItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => removeProduct(product.id));

        cartProducts.appendChild(cartProductItem);

        total += product.price * product.quantity;
    });

    cartTotal.textContent = `Total: $${total}`;
}

// Function to increment product quantity in cart
function incrementProduct(productId) {
    const productIndex = cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cartItems[productIndex].quantity += 1;
        renderCartProducts();
        updateLocalStorage();
    }
}

// Function to decrement product quantity in cart
function decrementProduct(productId) {
    const productIndex = cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
        cartItems[productIndex].quantity -= 1;
        renderCartProducts();
        updateLocalStorage();
    }
}

// Function to remove product from cart
function removeProduct(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    renderCartProducts();
    updateLocalStorage();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart items from local storage on page load
function loadCartItemsFromLocalStorage() {
    const cartItemsJSON = localStorage.getItem('cartItems');
    if (cartItemsJSON) {
        cartItems = JSON.parse(cartItemsJSON);
    }
}

// Initialize the cart page
function initCartPage() {
    loadCartItemsFromLocalStorage();
    renderCartProducts();
}

initCartPage();