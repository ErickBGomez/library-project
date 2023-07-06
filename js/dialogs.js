// Dialogs
const createBook = document.querySelector("#create-book-dialog");

// Buttons to invoke dialogs
// 1. Buttons for create book
const createBookBtns = {
  invoke: document.querySelector(".create-book-button"),
  cancel: document.querySelector("#create-book-dialog .cancel-button"),
  confirm: document.querySelector("#create-book-dialog .confirm-button"),
};

// Functions
function InvokeModal(dialogModal, containsInput) {
  if (containsInput) {
    const inputsArray = dialogModal.querySelectorAll("input");

    inputsArray.forEach((e) => {
      // Avoid eslint(no-param-reassign)
      const input = e;

      input.value = "";
      input.checked = false;
    });
  }

  dialogModal.showModal();
}

// Create book events
createBookBtns.invoke.addEventListener("click", () =>
  InvokeModal(createBook, true)
);
createBookBtns.cancel.addEventListener("click", () => createBook.close());
createBookBtns.confirm.addEventListener("click", () => createBook.close());
