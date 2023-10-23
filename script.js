document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
  

  
    // Check if user has visited before and logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn === "true") {
      window.location.href = "website.html"; // Redirect to main page
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
  
        // Update userLoggedIn status and redirect to login page
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
          // Update userLoggedIn status and redirect to main page
          localStorage.setItem("userLoggedIn", "true");
          window.location.href = "website.html";
        } else {
         alert("wronggg");
         
        }
      });
    }
  });                       
      
      
  
  