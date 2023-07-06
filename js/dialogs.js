// Dialogs
const createBook = document.querySelector("#create-book-dialog");

// Buttons to invoke dialogs

// 1. Buttons for create book
const invokeCreateBookBtn = document.querySelector(".create-book-button");
const cancelCreateBookBtn = document.querySelector(
  "#create-book-dialog .cancel-button"
);
const confirmCreateBookBtn = document.querySelector(
  "#create-book-dialog .confirm-button"
);

// Create book events
invokeCreateBookBtn.addEventListener("click", () => createBook.showModal());
cancelCreateBookBtn.addEventListener("click", () => createBook.close());
confirmCreateBookBtn.addEventListener("click", () => createBook.close());
