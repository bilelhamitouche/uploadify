const avatarBtn = document.querySelector("#avatar-btn");
const avatarMenu = document.querySelector("#avatar-menu");
const uploadFileModalBtn = document.querySelector("#upload-file-modal-btn");
const closeFileModalBtn = document.querySelector("#close-file-modal-btn");
const createFolderModalBtn = document.querySelector("#create-folder-modal-btn");
const closeFolderModalBtn = document.querySelector("#close-folder-modal-btn");
const uploadFileModal = document.querySelector("#upload-file-modal");
const createFolderModal = document.querySelector("#create-folder-modal");

avatarBtn.addEventListener("click", () => {
  avatarMenu.classList.toggle("hidden");
});

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

uploadFileModalBtn.addEventListener("click", () => {
  uploadFileModal.showModal();
});

createFolderModalBtn.addEventListener("click", () => {
  createFolderModal.showModal();
});
closeFileModalBtn.addEventListener("click", () => {
  uploadFileModal.classList.add("closing");
  setTimeout(() => {
    uploadFileModal.close();
    uploadFileModal.classList.remove("closing");
  }, 500);
});

closeFolderModalBtn.addEventListener("click", () => {
  createFolderModal.classList.add("closing");
  setTimeout(() => {
    createFolderModal.close();
    createFolderModal.classList.remove("closing");
  }, 500);
});
