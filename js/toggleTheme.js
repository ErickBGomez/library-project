const root = document.documentElement;
const themeIcon = document.querySelector("i.theme");
let currentTheme = "light";

function setTheme(newTheme) {
  root.className = newTheme;
  themeIcon.innerText = `${currentTheme}_mode`;
}

function toggleTheme() {
  currentTheme = root.className === "light" ? "dark" : "light";
  setTheme(currentTheme);
}

themeIcon.addEventListener("click", toggleTheme);

setTheme(currentTheme);
