
  document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.querySelector('.cart-count');
  const productList = document.getElementById('product-list');
  const searchInput = document.getElementById('search');
  const tabButtons = document.querySelectorAll('.btn-a');


  let cartItems = [];
  let products = []; // All products (including category)
  let currentCategory = "All Products"; // Default category
  let searchQuery = ''; // Initialize the search query

  // Sample product data with category property
  const allProducts = [
{ id: 1, category: "Shoes", image: 'p-5-min_11zon.jpg', name: 'Product 1', price: 10 },
{ id: 2, category: "Shoes", image:'p-7-min_11zon.jpg',  name: 'Product 2', price: 15 },
{ id: 3, category: "Shoes", image:'n-4-min_11zon.jpg',  name: 'Product 3', price: 28 },
{ id: 4, category: "Shoes", image:'n-5-min_11zon.jpg',  name: 'Product 4', price: 57 },
{ id: 5, category: "Beauty", image:'p-10-min_11zon.jpg',  name: 'Product 5', price: 64 },
{ id: 6, category: "Beauty", image:'p-b1-min_11zon.jpg',  name: 'Product 6', price: 73 },
{ id: 7, category: "Beauty", image:'p-b7-min_11zon.jpg',  name: 'Product 7', price: 144 },
{ id: 8, category: "Beauty", image:'n-6-min_11zon.jpg',  name: 'Product 8', price: 99 },
{ id: 9, category: "Jewellery", image:'n-1-min_11zon.jpg',  name: 'Product 9', price: 144 },
{ id: 10, category: "Jewellery", image:'p-j3-min_11zon.jpg',  name: 'Product 10', price: 99 },
{ id: 11, category: "Jewellery", image:'p-j5-min_11zon.jpg',  name: 'Product 11', price: 80 },
{ id: 12, category: "Jewellery", image:'n-10-min_11zon.jpg',  name: 'Product 12', price: 105 },
{ id: 13, category: "Clothes", image:'pl-3-min_11zon.jpg',  name: 'Product 13', price: 66 },
{ id: 14, category: "Clothes", image:'p-c5-min_11zon.jpg',  name: 'Product 14', price: 128 },
{ id: 15, category: "Clothes", image:'p-c1-min_11zon.jpg',  name: 'Product 15', price: 90 },
{ id: 16, category: "Clothes", image:'banner3-min_11zon.jpg',  name: 'Product 16', price: 43 },
{ id: 17, category: "Watch", image:'n-8-min_11zon.jpg',  name: 'Product 17', price: 89 },
{ id: 18, category: "Watch", image:'p-w9-min_11zon.jpg',  name: 'Product 18', price: 105 },
{ id: 19, category: "Watch", image:'p-w1-min_11zon.jpg',  name: 'Product 19', price: 64 },
{ id: 20, category: "Watch", image:'n-9-min_11zon.jpg',  name: 'Product 20', price: 73 },
      // Add more products here with category property
  ];

  // Function to update the cart count
  // function updateCartCount() {
  //     cartCount.textContent = cartItems.length;
  // }

   // Function to update the cart count
  function updateCartCount() {
  const cartCountValue = cartItems.length >= 10 ? '9+' : cartItems.length.toString();
  cartCount.textContent = cartCountValue;
   }

  // Function to render products based on the selected category and search query
  function renderProducts() {
      productList.innerHTML = '';

      const filteredProducts = products.filter(product =>
          (currentCategory === "All Products" || product.category === currentCategory) &&
          (product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      filteredProducts.forEach(product => {
          const productItem = document.createElement('div');
          productItem.classList.add('product-item');
          productItem.innerHTML = `
              <img src="image/${product.image}">
              <h3>${product.name}</h3>
              <p>Price: $${product.price}</p>
              <div class="abc">
                  <button class="add-to-cart-btn" aria-hidden="true" data-id="${product.id}">Add to Cart</button>
                  </div>
                  <div class="abc2">
                  <button class="delete-button" data-id="${product.id}">Delete</button>
                  <button class="update-button" data-id="${product.id}">Update</button>
                  </div>
          `;

          const addToCartButton = productItem.querySelector('.add-to-cart-btn');
          addToCartButton.addEventListener('click', () => addToCart(product));

          productList.appendChild(productItem);
      });
  }

  // Function to handle tab button click
  function handleTabButtonClick(event) {
      const clickedButton = event.target;
      const category = clickedButton.textContent;

      // Update the current category
      currentCategory = category;

      // Activate the clicked button and deactivate others
      tabButtons.forEach(button => {
          button.classList.remove('active');
      });
      clickedButton.classList.add('active');

      // Render products based on the selected category and search query
      renderProducts();
  }

  // Function to add a product to the cart
  // function addToCart(product) {
  //     cartItems.push({ ...product, quantity: 1 });
  //     updateCartCount();
  //     updateLocalStorage();
  // }


  //  Function to add a product to the cart
function addToCart(product) {
   const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem) {
      existingCartItem.quantity += 1;
       } else {
      cartItems.push({ ...product, quantity: 1 });
  }

  updateCartCount();
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
          updateCartCount();
      }
  }

 // Function to handle the "Delete" button click
  function handleDeleteButtonClick(event) {
      if (event.target.classList.contains('delete-button')) {
          const productId = parseInt(event.target.getAttribute('data-id'));
          const productIndex = products.findIndex(product => product.id === productId);
          if (productIndex !== -1) {
              products.splice(productIndex, 1);
              renderProducts();
              updateLocalStorage();
          }
      }
  }

  productList.addEventListener('click', handleDeleteButtonClick);
  // Initialize the page
  function init() {
      loadCartItemsFromLocalStorage();
      products = allProducts; 
      renderProducts();
      tabButtons.forEach(button => {
          button.addEventListener('click', handleTabButtonClick);
      });
      searchInput.addEventListener('input', () => {
          searchQuery = searchInput.value; 
          renderProducts();
      });
  }

  init();
});

