document.addEventListener("DOMContentLoaded", () => {{
loginError.textContent = "Invalid credentials. Please try again.";
}
});

document.getElementById("logout-btn").addEventListener("click", () => {
dashboardSection.classList.add("hidden");
loginSection.classList.remove("hidden");
loginForm.reset();
});


// Tab switching
tabButtons.forEach((btn) => {
btn.addEventListener("click", () => {
if (btn.classList.contains("logout")) return;
tabButtons.forEach((b) => b.classList.remove("active"));
tabContents.forEach((t) => t.classList.remove("active"));
btn.classList.add("active");
document.getElementById(btn.dataset.tab).classList.add("active");
});
});


// Article management
const articleForm = document.getElementById("article-form");
const articleList = document.getElementById("article-list");
articleForm.addEventListener("submit", (e) => {
e.preventDefault();
const title = document.getElementById("article-title").value;
const content = document.getElementById("article-content").value;
const li = document.createElement("li");
li.textContent = `${title}: ${content}`;
articleList.appendChild(li);
articleForm.reset();
});


// Material management
const materialForm = document.getElementById("material-form");
const materialList = document.getElementById("material-list");
materialForm.addEventListener("submit", (e) => {
e.preventDefault();
const fileInput = document.getElementById("material-file");
const fileName = fileInput.files[0]?.name;
if (fileName) {
const li = document.createElement("li");
li.textContent = `Uploaded: ${fileName}`;
materialList.appendChild(li);
materialForm.reset();
}
});


// Notification management
const notifForm = document.getElementById("notification-form");
const notifList = document.getElementById("notification-list");
notifForm.addEventListener("submit", (e) => {
e.preventDefault();
const title = document.getElementById("notification-title").value;
const details = document.getElementById("notification-content").value;
const li = document.createElement("li");
li.textContent = `${title}: ${details}`;
notifList.appendChild(li);
notifForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorDisplay = document.getElementById("login-error");

    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      window.location.href = "admin-dashboard.html";
    } else {
      errorDisplay.textContent = "Invalid username or password.";
    }
  });
});

// ===== Admin Login (Frontend only) =====

// Dummy credentials (you can change these)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-login-form");
  const errorMsg = document.getElementById("login-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple validation
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      errorMsg.style.color = "green";
      errorMsg.textContent = "Login successful! Redirecting...";
      form.reset();

      // Simulate redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "admin-dashboard.html";
      }, 1000);
    } else {
      errorMsg.style.color = "red";
      errorMsg.textContent = "Incorrect username or password.";
    }
  });
});

