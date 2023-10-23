const cartProducts = document.getElementById('cart-products');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const modal = document.getElementById('myModal');
const closeModalButton = document.querySelector('.close');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const goToHomepageBtn = document.querySelector('.go-to-homepage-btn');

let cartItems = [];
let total = 0;


// Function to save an order to order history
function saveOrderToHistory(order) {
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

//  Function to render cart products
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
           <button class="remove-btn" data-id="${product.id}">Remove</button>
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
        total += cartItems[productIndex].price; // Update the total
        renderCartProducts();
        updateLocalStorage();
    }
}

// Function to decrement product quantity in cart
function decrementProduct(productId) {
    const productIndex = cartItems.findIndex(item => item.id === productId);
    if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
        cartItems[productIndex].quantity -= 1;
        total -= cartItems[productIndex].price; // Update the total
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

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Add event listener to the Checkout button
checkoutBtn.addEventListener('click', function() {
  checkout();
  openModal();
});

// Add event listener to close the modal using the "Close" button within modal content
modalCloseBtn.addEventListener('click', closeModal);

// Add event listener to close the modal using the "X" button
closeModalButton.addEventListener('click', closeModal);

// Add event listener to close the modal and go to the homepage
goToHomepageBtn.addEventListener('click', function() {
    closeModal();
    // Redirect to the homepage (website.html in this case)
    window.location.href = 'website.html';
  });



// Function to handle the checkout process
function checkout() {
  // Hide cart products and set the total to zero
  cartProducts.innerHTML = '';
  cartTotal.textContent = 'Total: $0';


  // Create an order object
  const order = {
    date: new Date().toLocaleDateString(), // Capture the current date
    // total: total,
    items: [...cartItems],
    //  items: cartItems,
};

// Save the order to order history
saveOrderToHistory(order);


 // Clear the cart items array
  cartItems = [];

  // Update local storage to clear the cart
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
