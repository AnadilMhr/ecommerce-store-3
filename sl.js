document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    // const errorText = document.getElementById("login-error");
    const errorModal = document.getElementById("errorModal");
    const errorText = document.getElementById("errorText");
    const modalOkButton = document.getElementById("modalOkButton");
    const closeModalIcon = document.getElementById("closeModalIcon");
    const signupForm = document.getElementById("signup-form");

    // Initialize user data as an array or retrieve it if it exists
    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    // Check if the user is already logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn === "true") {
        window.location.href = "website.html"; // Redirect to the main page
    }


    if (signupForm) {
        signupForm.style.display = "block"; // Show the form
        signupForm.addEventListener("submit", (event) => {
            // ... Signup form submission code ...
            event.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
    
            // Check if the email is already registered
            const emailExists = usersData.some(user => user.email === email);
            if (emailExists) {
              errorText.textContent = "Email already exists. Please choose another.";
              errorModal.style.display = "block";
              return;
            }
    
            // Store user data in an object
            const userData = {
              username,
              email,
              password
            };
    
            // Push the user data to the array
            usersData.push(userData);
    
            // Store the updated array in local storage
            localStorage.setItem("usersData", JSON.stringify(usersData));
    
            // Update userLoggedIn status and redirect to the login page
            localStorage.setItem("userLoggedIn", "false");
            window.location.href = "login.html";
        });
    }


   if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const loginEmail = document.getElementById("login-email").value;
            const loginPassword = document.getElementById("login-password").value;

            // Find the user in the array based on email
            const user = usersData.find(user => user.email === loginEmail);

            if (user && user.password === loginPassword) {
                // Update userLoggedIn status and store the username
                localStorage.setItem("userLoggedIn", "true");
                localStorage.setItem("loggedInUser", user.email);
                localStorage.setItem("username", user.username);

                // Redirect to the main page (website.html)
                window.location.href = "website.html";
            } else {
                errorText.textContent = "Email or password is incorrect! Try again.";
            }
        });
    }

    // Rest of your code for modals and error handling remains the same.
     // Close the modal when clicking the close button
     if (closeModalIcon) {
        closeModalIcon.addEventListener("click", closeModal);
    }
    if (modalOkButton) {
        modalOkButton.addEventListener("click", closeModal);
    }

    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === errorModal) {
            closeModal();
        }
    });

    function closeModal() {
        errorModal.style.display = "none";
    }
});








