// 📱 Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// 📊 Homepage Yield Chart
const yieldChart = document.getElementById("yieldChart");
if (yieldChart) {
  new Chart(yieldChart, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Predicted Yield (tons/ha)",
        data: [3.5, 3.8, 4.0, 4.2, 4.5],
        borderColor: "hsl(120, 60%, 35%)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
      }]
    }
  });
}

// 🌦️ Dashboard Weather Chart
const weatherChart = document.getElementById("weatherChart");
if (weatherChart) {
  new Chart(weatherChart, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Rainfall (mm)",
        data: [12, 5, 8, 20, 15, 10, 18],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgb(37, 99, 235)",
        borderWidth: 1
      }]
    }
  });
}

// 📊 Dashboard Analytics Chart
const analyticsChart = document.getElementById("analyticsChart");
if (analyticsChart) {
  new Chart(analyticsChart, {
    type: "doughnut",
    data: {
      labels: ["Wheat", "Rice", "Maize", "Pulses"],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: ["#16a34a", "#facc15", "#f97316", "#3b82f6"]
      }]
    }
  });
}

// 📝 Registration Form
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password strength
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// 🔑 Login Form
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}

// 🚪 Logout
const logoutBtn = document.querySelectorAll(".logout-btn");
logoutBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
});

// 🔒 Protect Dashboard + Show Username
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!isLoggedIn || !storedUser) {
    alert("Please login first.");
    window.location.href = "login.html";
  } else {
    const userNameEl = document.getElementById("user-name");
    const navUserEl = document.getElementById("nav-username");
    const mobileUserEl = document.getElementById("mobile-username");

    if (userNameEl) userNameEl.textContent = storedUser.username;
    if (navUserEl) navUserEl.textContent = "Hello, " + storedUser.username;
    if (mobileUserEl) mobileUserEl.textContent = "👤 " + storedUser.username;
  }
}
