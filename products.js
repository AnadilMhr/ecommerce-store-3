// js for accessories


   // Sample product data (replace this with your actual product data)
   const products = [
    { id: 1, image:'1.jpg',  name: 'product 1', category: 'jewellery', price: 100 },
    { id: 2, image:'cap-3.png',  name: 'Product 2', category: 'cap', price: 50 },
    { id: 3, image:'jacket-5.jpg',  name: 'Product 3', category: 'jacket', price: 120 },
    { id: 4, image:'watch-1.jpg',   name: 'Product 4', category: 'watch', price: 80 },
    { id: 5, image:'clothes-1.jpg',  name: 'Product 5', category: 'shirt', price: 99 },
    { id: 6, image:'shoes-1.png',  name: 'Product 6', category: 'shoes', price: 150 },
    { id: 7, image:'jewellery-3.jpg',   name: 'Product 7', category: 'jewellery', price: 100 },
    { id: 8, image:'product-06.png',   name: 'Product 8', category: 'beauty', price: 65 },
    { id: 9, image:'cap1.png',   name: 'Product 9', category: 'cap', price: 118 },
    { id: 10, image:'woman-jak1.png',  name: 'Product 10', category: 'jacket', price: 165 },
    { id: 11, image:'watch-11.png',  name: 'Product 11', category: 'watch', price: 55 },
    { id: 12, image:'man-jak1.png',  name: 'Product 12', category: 'jacket', price: 120 },
    { id: 13, image:'shoes-3.png',  name: 'Product 13', category: 'shoes', price: 74 },
    { id: 14, image:'14.jpg',  name: 'Product 14', category: 'jewellery', price: 190 },
    { id: 15, image:'product-02.png',  name: 'Product 15', category: 'beauty', price: 120 },
    // Add more products here
  ];

  // Initialize cart with an empty array to store cart items
  let cart = [];

  // Function to display products in the gallery
  function displayProducts() {
    const gallery = document.getElementById('productGallery');
    gallery.innerHTML = '';

    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
      <img src="image/${product.image}">
        <h4>${product.name}</h4>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

      gallery.appendChild(item);
    });
  }

  // Function to filter products by category
  function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayFilteredProducts(filteredProducts);
  }

  // Function to display filtered products
  function displayFilteredProducts(filteredProducts) {
    const gallery = document.getElementById('productGallery');
    gallery.innerHTML = '';

    filteredProducts.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
       <div><img src="image/${product.image}"/></div>
        <h4>${product.name}</h4>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

      gallery.appendChild(item);
    });
  }

  // Function to add an item to the cart
  function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);

    if (productToAdd) {
      const existingCartItem = cart.find(item => item.id === productId);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cart.push({ ...productToAdd, quantity: 1 });
      }

      displayCart();
    }
  }

  // Function to display the cart and update total price
  function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>$${item.price * item.quantity}</span>
      `;

      cartItems.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice;
  }

  // Initial display of all products in the gallery and an empty cart
  displayProducts();
  displayCart();
  

 let delBtn = document.getElementById("del-btn")
 let cartItems = document.getElementById("cartItems");
//  console.log(cartItems)
function del(a){
 cartItems.splice(a, 1);
 displayCart();

}
let shopCart = document.getElementById("shop-cart");

function toggleCart(){
  shopCart.style.transform = "translateX(0%)";
}

// function toggleCart(){
//   if(toggleCart){
//     shopCart.style.transform = "translateX(0%)";
//   }else{
//     shopCart.style.transform = "translateX(100%)";
//   }

// }


function closeMenu(){
  shopCart.style.transform = "translateX(100%)";
}