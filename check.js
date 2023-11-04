document.addEventListener("DOMContentLoaded", function() {
const cartProducts = document.getElementById('cart-products');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const modal = document.getElementById('myModal');
const closeModalButton = document.querySelector('.close');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const goToHomepageBtn = document.querySelector('.go-to-homepage-btn');
const goToProductpageBtn = document.getElementById('go-to-productpage-btn');


let cartItems = [];
let total = 0;

// Function to save an order to order history
function saveOrderToHistory(order) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        let orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${loggedInUser}`)) || [];
        orderHistory.push(order);
        localStorage.setItem(`orderHistory_${loggedInUser}`, JSON.stringify(orderHistory));
    }
    console.log('Logged in user:', loggedInUser);
}

// Function to render cart products
function renderCartProducts() {
    cartProducts.innerHTML = '';
    let total = 0;

    cartItems.forEach(product => {
        // ... (Your existing code for rendering cart products)
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

// ... (Your existing code for increment, decrement, and remove products)

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
    if (cartItems.length === 0) {
        // Cart is empty, show empty cart modal
        openEmptyCartModal();
    } else {
        // Cart has products, show successful order modal
        checkout();
        openModal();
    }
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
    // ... (Your existing code for clearing cart products and total)
    cartProducts.innerHTML = '';
    cartTotal.textContent = 'Total: $0';
    // Create an order object
    const order = {
        date: new Date().toLocaleDateString(), // Capture the current date
        items: [...cartItems],
       };
       console.log('Created order:', order);

    // Save the order to order history for the currently logged-in user
    saveOrderToHistory(order);

    // Clear the cart items array
    cartItems = [];

    // Update local storage to clear the cart
    updateLocalStorage();
}

// Function to open the modal for an empty cart
function openEmptyCartModal() {
    // Get the empty cart modal element
    const emptyCartModal = document.getElementById('modal-2');
    
    // Display the empty cart modal
    emptyCartModal.style.display = 'block';
}

// Add event listener to close the empty cart modal using the "productpage" button
document.getElementById('go-to-productpage-btn').addEventListener('click', function() {
    // Redirect to the Products.html page
    window.location.href = 'cart88.html';
  });

// Add event listener to close the empty cart modal using the close button (X)
document.getElementById('modal-close-button2').addEventListener('click', function() {
    // Get the empty cart modal element
    const emptyCartModal = document.getElementById('modal-2');
    
    // Close the empty cart modal
    emptyCartModal.style.display = 'none';
});







// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to set the currently logged-in user
function setLoggedInUser(email) {
    localStorage.setItem('loggedInUser', email);
}

// ... (Your existing code for loading cart items and initializing the cart page)
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
});
