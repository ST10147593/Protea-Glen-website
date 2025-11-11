// ===== LOCAL DASHBOARD FUNCTIONALITY =====

// Load saved data from localStorage
function loadData() {
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  const materials = JSON.parse(localStorage.getItem("materials")) || [];

  displayItems("article-list", articles, "articles");
  displayItems("notification-list", notifications, "notifications");
  displayItems("material-list", materials, "materials");
}

// Display data
function displayItems(containerId, items, key) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No items added yet.</p>";
    return;
  }

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item-box");

    if (key === "materials") {
      div.innerHTML = `
        <strong>${item.title}</strong><br>
        <a href="${item.link}" target="_blank">Download</a>
        <button class="delete-btn" data-key="${key}" data-index="${index}">Delete</button>
      `;
    } else {
      div.innerHTML = `
        <strong>${item.title}</strong>
        <p>${item.content}</p>
        <button class="delete-btn" data-key="${key}" data-index="${index}">Delete</button>
      `;
    }

    container.appendChild(div);
  });
}

// Add new items
function setupForm(formId, key) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let title, content, link;

    if (key === "materials") {
      title = document.getElementById("material-title").value.trim();
      link = document.getElementById("material-link").value.trim();
    } else {
      title = document.getElementById(`${key.slice(0, -1)}-title`).value.trim();
      content = document.getElementById(`${key.slice(0, -1)}-content`).value.trim();
    }

    const items = JSON.parse(localStorage.getItem(key)) || [];
    const newItem =
      key === "materials"
        ? { title, link }
        : { title, content };

    items.push(newItem);
    localStorage.setItem(key, JSON.stringify(items));
    form.reset();
    loadData();
  });
}

// Delete items
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const key = e.target.dataset.key;
    const index = e.target.dataset.index;

    const items = JSON.parse(localStorage.getItem(key)) || [];
    items.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(items));
    loadData();
  }
});

// Setup all forms
document.addEventListener("DOMContentLoaded", () => {
  setupForm("article-form", "articles");
  setupForm("notification-form", "notifications");
  setupForm("material-form", "materials");
  loadData();
});
