import { ValidateInput } from "./inputValidation.js";
// Dialogs

const invokeCreateBookButton = document.querySelector(
  "button.create-book-button"
);

function InputsFactory(dialogSelector) {
  const dialogQuery = `dialog${dialogSelector} input${dialogSelector}`;

  const inputs = {
    title: document.querySelector(`${dialogQuery}-title`),
    author: document.querySelector(`${dialogQuery}-author`),
    pages: document.querySelector(`${dialogQuery}-pages`),
    readState: document.querySelector(`${dialogQuery}-read-state`),
  };

  for (const e in inputs) {
    if (e === "readState") break;
    inputs[e].addEventListener("input", ValidateInput);
  }

  return inputs;
}

function OutputsFactory(dialogSelector) {
  return {
    title: document.querySelector(`dialog${dialogSelector} .output-title`),
    author: document.querySelector(`dialog${dialogSelector} .output-author`),
    pages: document.querySelector(`dialog${dialogSelector} .output-pages`),
    readState: document.querySelector(
      `dialog${dialogSelector} .output-read-state`
    ),
  };
}

function ButtonsFactory(dialogSelector, buttonNames) {
  const buttons = {};

  buttonNames.forEach((buttonName) => {
    buttons[buttonName] = document.querySelector(
      `dialog${dialogSelector} button.${buttonName}`
    );
  });

  return buttons;
}

class Dialog {
  constructor(dialogSelector, buttonNames) {
    this.modal = document.querySelector(dialogSelector);
    this.buttons = ButtonsFactory(dialogSelector, buttonNames);
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
createBook.inputs = InputsFactory("#create-book");
editBook.inputs = InputsFactory("#edit-book");

// Output Mixins
bookInfo.outputs = OutputsFactory("#book-info");
deleteBook.outputs = OutputsFactory("#delete-book");

// Set invoke elements
createBook.invoke = invokeCreateBookButton;

console.log(createBook);

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

// Create book events

createBook.buttons.cancel.addEventListener("click", () =>
  createBook.modal.close()
);
createBook.modal.addEventListener("close", () => ClearInputs(createBook));

// Open book events
bookInfo.buttons.cancel.addEventListener("click", () => bookInfo.modal.close());

// Delete book events
deleteBook.buttons.cancel.addEventListener("click", () =>
  deleteBook.modal.close()
);
deleteBook.buttons.invoke.addEventListener("click", () => {
  InvokeDeleteBook(bookInfo.info.currentBook);
});

// Edit book events
editBook.buttons.invoke.addEventListener("click", () =>
  InvokeEditBook(bookInfo.info.currentBook)
);
editBook.buttons.cancel.addEventListener("click", () => editBook.modal.close());
