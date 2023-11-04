document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    // Function to load order history from local storage
    function loadOrderHistoryFromLocalStorage() {
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
            const orderHistoryJSON = localStorage.getItem(`orderHistory_${loggedInUser}`);

            if (orderHistoryJSON) {
                const orderHistory = JSON.parse(orderHistoryJSON);

                // Loop through each order in the orderHistory and add it to the table
                orderHistory.forEach(order => {
                    addOrderItemToTable(order);
                });
            }
        }
    }

   // Function to add an order item to the table
function addOrderItemToTable(order) {
    // Loop through the items in the order
    order.items.forEach(item => {
        const newRow = orderList.insertRow();
        const cellDate = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellQuantity = newRow.insertCell(2);
        const cellPrice = newRow.insertCell(3);
        const cellTotal = newRow.insertCell(4); // Add the "Total" cell

        cellDate.innerHTML = order.date; // Display the same order date for all items in the order
        cellName.innerHTML = item.name;
        cellQuantity.innerHTML = item.quantity;

        // Parse the price and calculate the total for the current item
        const priceStr = String(item.price).replace(/\D/g, ''); // Ensure price is a string
        const price = parseFloat(priceStr);
        const quantity = parseInt(item.quantity);
        const total = price * quantity;

        cellPrice.innerHTML = '$' + price.toFixed(0); // Remove decimal places
        cellTotal.innerHTML = '$' + total.toFixed(0); // Remove decimal places
    });
}

// Load order history when the page loads
    loadOrderHistoryFromLocalStorage();
});













