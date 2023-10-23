document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const errorModal = document.getElementById("errorModal");
    const errorText = document.getElementById("errorText");
    const modalOkButton = document.getElementById("modalOkButton");
    const closeModalIcon = document.getElementById("closeModalIcon");
  
    // Check if user has visited before and logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn === "true") {
      window.location.href = "website.html"; // Redirect to the main page
    }
  
    if (signupForm) {
      signupForm.style.display = "block"; // Show the form
      signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        // Store data in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
  
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
  
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
  
        if (loginEmail === storedEmail && loginPassword === storedPassword) {
          // localStorage.setItem("code","secret")
          // Update userLoggedIn status and redirect to the main page
          localStorage.setItem("userLoggedIn", "true");
          window.location.href = "website.html";
        } else {
          // alert(ok)
          errorText.textContent = "Email or password is incorrect! Try again.";
          errorModal.style.display = "block";
        }
      });
  
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
    }
  });
  
  
  











   