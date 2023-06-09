// Dialogs

export const createBook = {
  modal: document.querySelector("#create-book-dialog"),
  buttons: {
    invoke: document.querySelector(".create-book-button"),
    cancel: document.querySelector("#create-book-dialog .cancel-button"),
    confirm: document.querySelector("#create-book-dialog .confirm-button"),
  },
  inputs: {
    title: document.querySelector("#create-book-dialog input#book-title"),
    author: document.querySelector("#create-book-dialog input#book-author"),
    pages: document.querySelector("#create-book-dialog input#book-pages"),
    readState: document.querySelector(
      "#create-book-dialog input#book-read-state"
    ),
  },
};

// Functions
function ClearInputs(dialogModal) {
  if ("inputs" in dialogModal) {
    const inputsArray = dialogModal.modal.querySelectorAll("input");

    inputsArray.forEach((e) => {
      // Avoid eslint(no-param-reassign)
      const input = e;

      input.value = "";
      input.checked = false;
    });
  }
}

function InvokeModal(dialogModal) {
  ClearInputs(dialogModal);

  dialogModal.modal.showModal();
}

// Create book events
createBook.buttons.invoke.addEventListener("click", () =>
  InvokeModal(createBook)
);
createBook.buttons.cancel.addEventListener("click", () =>
  createBook.modal.close()
);
createBook.modal.addEventListener("submit", () => createBook.modal.close());
createBook.modal.addEventListener("close", () => ClearInputs(createBook));
