// Dialogs
const createBook = document.querySelector("#create-book-dialog");

// Buttons to invoke dialogs

// 1. Buttons for create book
const createBookBtns = {
  invoke: document.querySelector(".create-book-button"),
  cancel: document.querySelector("#create-book-dialog .cancel-button"),
  confirm: document.querySelector("#create-book-dialog .confirm-button"),
};

// Create book events
createBookBtns.invoke.addEventListener("click", () => createBook.showModal());
createBookBtns.cancel.addEventListener("click", () => createBook.close());
createBookBtns.confirm.addEventListener("click", () => createBook.close());
