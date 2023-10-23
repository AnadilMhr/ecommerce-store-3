document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const errorModal = document.getElementById("errorModal");
  const errorText = document.getElementById("errorText");
  const modalOkButton = document.getElementById("modalOkButton");
  const closeModalIcon = document.getElementById("closeModalIcon");

  // Initialize user data as an array or retrieve it if it exists
  let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const userType = document.querySelector('select[name="user_type"]').value;

      if ((username !== "admin" || email !== "admin@gmail.com") && userType === "admin") {
        // Show an alert when non-admin users try to select "admin"
        alert("This email is not registered.");
      } else if (username === "admin" && email === "admin@gmail.com" && userType === "user") {
        // Show an alert when admin credentials are used for user-type
        alert("This email is not registered.");
      } else if (usersData.some(user => user.email === email)) {
        // Check if the email is already registered
        alert("This email is already registered. Please choose another.");
      } else {
        // Store user data in an object
        const password = document.getElementById("password").value;
        const userData = {
          username,
          email,
          password,
          userType
        };

        // Push the user data to the array
        usersData.push(userData);

        // Store the updated array in local storage
        localStorage.setItem("usersData", JSON.stringify(usersData));

        // Redirect to the login page for regular users
        localStorage.setItem("userLoggedIn", "false");
        window.location.href = "login.html";
      }
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
        if (user.userType === "admin") {
          // Redirect to dash.html for admin users
          window.location.href = "test1.html";
        } else {
          // Redirect to website.html for regular users
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("loggedInUser", user.email);
          localStorage.setItem("username", user.username);
          window.location.href = "website.html";
        }
      } else {
        alert("Email or password is incorrect! Try again.");
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














