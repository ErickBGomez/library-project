import { ValidateInput, SetCustomValidity } from "./inputValidation.js";

// Dialogs
const invokeCreateBookButton = document.querySelector(
  "button.create-book-button"
);

function InputsFactory(dialog) {
  const inputs = {
    title: dialog.querySelector(`input#${dialog.id}-title`),
    author: dialog.querySelector(`input#${dialog.id}-author`),
    pages: dialog.querySelector(`input#${dialog.id}-pages`),
    readState: dialog.querySelector(`input#${dialog.id}-read-state`),
  };

  for (const e in inputs) {
    if (e === "readState") break;
    inputs[e].customValidate = SetCustomValidity;
    inputs[e].addEventListener("input", ValidateInput);
  }

  return inputs;
}

function OutputsFactory(dialog) {
  return {
    title: dialog.querySelector(".output-title"),
    author: dialog.querySelector(".output-author"),
    pages: dialog.querySelector(".output-pages"),
    readState: dialog.querySelector(".output-read-state"),
  };
}

function ButtonsFactory(dialog, buttonNames) {
  const buttons = {};

  buttonNames.forEach((buttonName) => {
    buttons[buttonName] = dialog.querySelector(`button.${buttonName}`);

    if (buttonName === "cancel") {
      buttons[buttonName].addEventListener("click", () => dialog.close());
    }
  });

  return buttons;
}

class Dialog {
  constructor(dialogSelector, buttonNames) {
    this.modal = document.querySelector(dialogSelector);
    this.buttons = ButtonsFactory(this.modal, buttonNames);
  }

  ClearInputs = () => {
    const inputsArray = Array.from(this.modal.querySelectorAll("input"));

    for (const input of inputsArray) {
      if (input.type !== "checkbox") {
        input.value = "";
        input.dataset.state = "valid";
      } else {
        input.checked = false;
      }
    }
  };

  InvokeModal = () => {
    if ("inputs" in this) {
      this.ClearInputs();
    }

    this.modal.showModal();
  };

  set invoke(node) {
    this._invoke = node;

    node.addEventListener("click", this.InvokeModal);
  }
}

export const createBook = new Dialog("#create-book", ["cancel", "confirm"]);
export const editBook = new Dialog("#edit-book", ["cancel", "confirm"]);
export const bookInfo = new Dialog("#book-info", ["cancel"]);
export const deleteBook = new Dialog("#delete-book", ["cancel", "delete"]);

// Input Mixins
createBook.inputs = InputsFactory(createBook.modal);
editBook.inputs = InputsFactory(editBook.modal);

// Output Mixins
bookInfo.outputs = OutputsFactory(bookInfo.modal);
deleteBook.outputs = OutputsFactory(deleteBook.modal);

// Set invoke elements
createBook.invoke = invokeCreateBookButton;
editBook.invoke = console.log(createBook);
console.log(deleteBook);

// Functions

export function InvokeBookInfo(book, index) {
  // Object info
  bookInfo.info.currentBook = book;
  bookInfo.info.currentIndex = index;

  // Book info to dialog
  bookInfo.elements.title.innerText = book.title;
  bookInfo.elements.author.innerText = book.author;
  bookInfo.elements.pages.innerText = `${book.pages} pages`;
  bookInfo.elements.readState.innerText = book.readState
    ? "Already read"
    : "Not read yet";

  InvokeModal(bookInfo);
}

export function InvokeDeleteBook(book) {
  deleteBook.elements.title.innerText = book.title;
  deleteBook.elements.author.innerText = book.author;

  InvokeModal(deleteBook);
}

function InvokeEditBook(book) {
  InvokeModal(editBook);

  editBook.inputs.title.value = book.title;
  editBook.inputs.author.value = book.author;
  editBook.inputs.pages.value = book.pages;
  editBook.inputs.readState.checked = book.readState;
}

deleteBook.buttons.invoke.addEventListener("click", () => {
  InvokeDeleteBook(bookInfo.info.currentBook);
});

// Edit book events
editBook.buttons.invoke.addEventListener("click", () =>
  InvokeEditBook(bookInfo.info.currentBook)
);
