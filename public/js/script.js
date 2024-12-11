const avatarBtn = document.querySelector("#avatar-btn");
const avatarMenu = document.querySelector("#avatar-menu");

avatarBtn.addEventListener("click", toggleMenu);
document.addEventListener("click", (event) => {
  if (!avatarBtn.contains(event.target) && !avatarMenu.contains(event.target)) {
    avatarMenu.classList.add("hidden");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    avatarMenu.classList.add("hidden");
  }
});

function toggleMenu() {
  avatarMenu.classList.toggle("hidden");
}
