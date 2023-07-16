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

export const bookInfo = {
  modal: document.querySelector("#book-info-dialog"),
  buttons: {
    cancel: document.querySelector("#book-info-dialog .cancel-button"),
  },
  elements: {
    title: document.querySelector("#book-info-dialog .title"),
    author: document.querySelector("#book-info-dialog .author"),
    pages: document.querySelector("#book-info-dialog .pages"),
    readState: document.querySelector("#book-info-dialog .read-state"),
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

// Improve here and add pages and readstate strings
export function InvokeBookInfo(book) {
  bookInfo.elements.title.innerText = book.title;
  bookInfo.elements.author.innerText = book.author;
  bookInfo.elements.pages.innerText = book.pages;
  bookInfo.elements.readState.innerText = book.readState;

  InvokeModal(bookInfo);
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
bookInfo.buttons.cancel.addEventListener("click", () => bookInfo.modal.close());
