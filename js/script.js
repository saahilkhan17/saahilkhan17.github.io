const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

// Password gate for the My Tools section
const toolsSection = document.querySelector("#tools");
const toolsLink = document.querySelector(".tools-link");
const toolsIcon = document.querySelector(".tools-lock-icon");
const toolsLocked = document.querySelector("#tools-locked");
const toolsContent = document.querySelector("#tools-content");
const unlockToolsBtn = document.querySelector("#unlock-tools-btn");
const passwordModal = document.querySelector("#password-modal");
const modalClose = document.querySelector("#modal-close");
const passwordForm = document.querySelector("#password-form");
const passwordInput = document.querySelector("#password-input");
const passwordError = document.querySelector("#password-error");
const TOOLS_PASSWORD = "Sizl@05";

function isUnlocked() {
  try {
    return sessionStorage.getItem("toolsUnlocked") === "true";
  } catch (e) {
    return false;
  }
}

function openPasswordModal() {
  passwordModal.hidden = false;
  passwordError.hidden = true;
  passwordInput.value = "";
  passwordInput.focus();
}

function closePasswordModal() {
  passwordModal.hidden = true;
  passwordInput.value = "";
  passwordError.hidden = true;
}

function unlockTools() {
  toolsContent.hidden = false;
  toolsLocked.hidden = true;
  toolsIcon.classList.replace("fa-lock", "fa-unlock");
}

toolsLink.addEventListener("click", (e) => {
  if (isUnlocked()) return;
  e.preventDefault();
  openPasswordModal();
});

unlockToolsBtn.addEventListener("click", openPasswordModal);
modalClose.addEventListener("click", closePasswordModal);

passwordModal.addEventListener("click", (e) => {
  if (e.target === passwordModal) closePasswordModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !passwordModal.hidden) closePasswordModal();
});

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === TOOLS_PASSWORD) {
    try {
      sessionStorage.setItem("toolsUnlocked", "true");
    } catch (err) {
      // Storage unavailable — section still unlocks for this page view
    }
    unlockTools();
    closePasswordModal();
    toolsSection.scrollIntoView({ behavior: "smooth" });
  } else {
    passwordInput.value = "";
    passwordError.hidden = false;
    passwordError.classList.remove("shake");
    void passwordError.offsetWidth;
    passwordError.classList.add("shake");
    passwordInput.focus();
  }
});

if (isUnlocked()) {
  unlockTools();
} else if (window.location.hash === "#tools") {
  openPasswordModal();
}
