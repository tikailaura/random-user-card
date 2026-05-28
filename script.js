// /Project 1 Random User Card/script.js
const generateBtn = document.getElementById("generate-btn");
const statusElement = document.getElementById("status");
const userCardElement = document.getElementById("user-card");

function setStatus(message, type = "") {
  statusElement.textContent = message;
  statusElement.className = "status";
  if (type) {
    statusElement.classList.add(type);
  }
}

function renderUser(user) {
  const fullName = `${user.name.first} ${user.name.last}`;

  userCardElement.innerHTML = `
    <img
      class="user-image"
      src="${user.picture.large}"
      alt="Portrait of ${fullName}"
    />
    <h2 class="user-name">${fullName}</h2>
    <p class="user-info"><span class="user-label">Email:</span> ${user.email}</p>
    <p class="user-info"><span class="user-label">Phone:</span> ${user.phone}</p>
    <p class="user-info"><span class="user-label">Country:</span> ${user.location.country}</p>
  `;
}

async function fetchRandomUser() {
  setStatus("Loading...", "loading");
  userCardElement.innerHTML = "";

  try {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const user = data.results[0];

    renderUser(user);
    setStatus("User loaded successfully.");
  } catch (error) {
    userCardElement.innerHTML = "";
    setStatus("Something went wrong. Please try again.", "error");
    console.error("Failed to fetch random user:", error);
  }
}

generateBtn.addEventListener("click", fetchRandomUser);

fetchRandomUser();