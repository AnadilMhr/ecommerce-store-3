document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    // Function to load order history from localStorage
    function loadOrderHistoryFromLocalStorage() {
        const orderHistoryJSON = localStorage.getItem('orderHistory');
        if (orderHistoryJSON) {
            const orderHistory = JSON.parse(orderHistoryJSON);

            orderHistory.forEach(order => {
                const orderItem = document.createElement('li');
                orderItem.innerHTML = `
                    <h3>Order Date: ${order.date}</h3>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} x${item.quantity} - $${item.price}</li>`).join('')}
                    </ul>
                    <p>Total: $${calculateOrderTotal(order.items)}</p>
                `;
                orderList.appendChild(orderItem);
            });
        }
    }

    // Function to calculate the total price for an order
    function calculateOrderTotal(items) {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.quantity; // Calculate total for each item
        });
        return total;
    }

    // Load order history when the page loads
    loadOrderHistoryFromLocalStorage();
});









// document.addEventListener('DOMContentLoaded', function () {
//     const orderList = document.getElementById('order-list');

    // Function to load order history from localStorage
    // function loadOrderHistoryFromLocalStorage() {
    //     const orderHistoryJSON = localStorage.getItem('orderHistory');
    //     if (orderHistoryJSON) {
    //         const orderHistory = JSON.parse(orderHistoryJSON);

    //         orderHistory.forEach(order => {
    //             const orderItem = document.createElement('li');
    //             orderItem.innerHTML = `
    //                 <h3>Order Date: ${order.date}</h3>
    //                 <ul>
    //                     ${order.items.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
    //                 </ul>
    //                 <p>Total: $${calculateOrderTotal(order.items)}</p> <!-- Calculate and display total -->
    //             `;
    //             orderList.appendChild(orderItem);
    //         });
    //     }
    // }

    // Function to calculate the total price for an order
    // function calculateOrderTotal(items) {
    //     let total = 0;
    //     items.forEach(item => {
    //         total += item.price;
    //     });
    //     return total;
    // }

    // Load order history when the page loads
//     loadOrderHistoryFromLocalStorage();
// });
