// document.addEventListener('DOMContentLoaded', function () {
//     const orderList = document.getElementById('order-list');

    // Function to load order history from localStorage

    // function loadOrderHistoryForCurrentUser() {
    //     const loggedInUser = localStorage.getItem('loggedInUser');

    //     if (loggedInUser) {
    //         const orderHistoryJSON = localStorage.getItem(`orderHistory_${loggedInUser}`);
            
    //         if (orderHistoryJSON) {
    //             const orderHistory = JSON.parse(orderHistoryJSON);

    //             orderHistory.forEach(order => {
    //                 const orderItem = document.createElement('li');
    //                 orderItem.innerHTML = `
    //                     <h3>Order Date: ${order.date}</h3>
    //                     <ul>
    //                         ${order.items.map(item => `<li>${item.name} x${item.quantity} - $${item.price}</li>`).join('')}
    //                     </ul>
    //                     <p>Total: $${calculateOrderTotal(order.items)}</p>
    //                 `;
    //                 orderList.appendChild(orderItem);
    //             });
    //         }
    //     }
    // }

    // Function to calculate the total price for an order

    // function calculateOrderTotal(items) {
    //     let total = 0;
    //     items.forEach(item => {
    //         total += item.price * item.quantity; 
    //     });
    //     return total;
    // }

    // Load order history when the page loads

//     loadOrderHistoryForCurrentUser();
// });




document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    // Function to load order history from local storage
    function loadOrderHistoryFromLocalStorage() {
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
            const orderHistoryJSON = localStorage.getItem(`orderHistory_${loggedInUser}`);

            if (orderHistoryJSON) {
                const orderHistory = JSON.parse(orderHistoryJSON);

                orderHistory.forEach(order => {
                    addOrderItemToTable(order);
                });
            }
        }
    }

    // Function to add an order item to the table
    function addOrderItemToTable(order) {
        const newRow = orderList.insertRow();
        const cellDate = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellQuantity = newRow.insertCell(2);
        const cellPrice = newRow.insertCell(3);
        const cellTotal = newRow.insertCell(4); // Add the "Total" cell

        cellDate.innerHTML = order.date;
        cellName.innerHTML = order.items[0].name;
        cellQuantity.innerHTML = order.items[0].quantity;

        // Parse the price and calculate the total
        const priceStr = String(order.items[0].price).replace(/\D/g, ''); // Ensure price is a string
        const price = parseFloat(priceStr);
        const quantity = parseInt(order.items[0].quantity);
        const total = price * quantity;

        cellPrice.innerHTML = '$' + price.toFixed(0); // Remove decimal places
        cellTotal.innerHTML = '$' + total.toFixed(0); // Remove decimal places
    }

    // Load order history when the page loads
    loadOrderHistoryFromLocalStorage();
});













