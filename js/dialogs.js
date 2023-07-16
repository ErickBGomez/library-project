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

export const openBook = {
  modal: document.querySelector("#open-book-dialog"),
  buttons: {
    cancel: document.querySelector("#open-book-dialog .cancel-button"),
  },
};

// Functions
function ClearInputs(dialogObject) {
  if ("inputs" in dialogObject) {
    const inputsArray = Array.from(
      dialogObject.modal.querySelectorAll("input")
    );

    for (const input of inputsArray) {
      if (input.type !== "checkbox") {
        input.value = "";
        input.dataset.state = "valid";
      } else {
        input.checked = false;
      }
    }
  }
}

export function InvokeModal(dialogObject) {
  ClearInputs(dialogObject);

  dialogObject.modal.showModal();
}

// Create book events
createBook.buttons.invoke.addEventListener("click", () =>
  InvokeModal(createBook)
);
createBook.buttons.cancel.addEventListener("click", () =>
  createBook.modal.close()
);
createBook.modal.addEventListener("close", () => ClearInputs(createBook));

// Open book events
openBook.buttons.cancel.addEventListener("click", () => openBook.modal.close());
