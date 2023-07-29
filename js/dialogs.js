import {
  ValidateInput,
  SetCustomValidity,
  CustomSubmit,
} from "./inputValidation.js";
import { AddBook, EditBook } from "./books.js";

// Invoke dialogs
const invokeCreateBookNode = document.querySelector(
  "button.create-book-button"
);

function InputsFactory(dialog) {
  const modal = dialog.modal;
  const form = modal.querySelector("form");

  const inputs = {
    title: modal.querySelector(`input#${modal.id}-title`),
    author: modal.querySelector(`input#${modal.id}-author`),
    pages: modal.querySelector(`input#${modal.id}-pages`),
    readState: modal.querySelector(`input#${modal.id}-read-state`),
  };

  for (const e in inputs) {
    if (e === "readState") break;
    inputs[e].customValidate = SetCustomValidity;
    inputs[e].validate = ValidateInput;
    inputs[e].addEventListener("input", inputs[e].validate);
  }

  dialog.customSubmit = CustomSubmit;
  dialog.submitCallback = null;

  form.addEventListener("submit", (e) =>
    dialog.customSubmit(e, dialog.submitCallback)
  );

  return inputs;
}

function OutputsFactory(dialog) {
  const modal = dialog.modal;

  return {
    title: modal.querySelector(".output-title"),
    author: modal.querySelector(".output-author"),
    pages: modal.querySelector(".output-pages"),
    readState: modal.querySelector(".output-read-state"),
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

const createBook = new Dialog("#create-book", ["cancel", "confirm"]);
const editBook = new Dialog("#edit-book", ["cancel", "confirm"]);
const bookInfo = new Dialog("#book-info", ["cancel"]);
const deleteBook = new Dialog("#delete-book", ["cancel", "delete"]);

// Input Mixins
createBook.inputs = InputsFactory(createBook);
editBook.inputs = InputsFactory(editBook);

// Unique properties
bookInfo.currentBook = null;
bookInfo.currentIndex = null;

// Submit callbacks
createBook.submitCallback = function () {
  AddBook(
    createBook.inputs.title.value,
    createBook.inputs.author.value,
    createBook.inputs.pages.value,
    createBook.inputs.readState.checked
  );
};

editBook.submitCallback = function () {
  EditBook(
    editBook.currentIndex,
    editBook.inputs.title.value,
    editBook.inputs.author.value,
    editBook.inputs.pages.value,
    editBook.inputs.readState.checked
  );
};

// Output Mixins
bookInfo.outputs = OutputsFactory(bookInfo);
deleteBook.outputs = OutputsFactory(deleteBook);

// Set invoke elements
createBook.invoke = invokeCreateBookNode;

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
