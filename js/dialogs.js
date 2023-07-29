/* eslint-disable max-classes-per-file */
// Dialogs

const invokeCreateBookButton = document.querySelector(
  "button.create-book-button"
);

function InputsFactory(dialogSelector) {
  const dialogQuery = `dialog${dialogSelector} input${dialogSelector}`;

  const title = document.querySelector(`${dialogQuery}-title`);
  const author = document.querySelector(`${dialogQuery}-author`);
  const pages = document.querySelector(`${dialogQuery}-pages`);
  const readState = document.querySelector(`${dialogQuery}-read-state`);

  return { title, author, pages, readState };
}

function OutputsFactory(dialogSelector) {
  const title = document.querySelector(`dialog${dialogSelector} .output-title`);
  const author = document.querySelector(
    `dialog${dialogSelector} .output-author`
  );
  const pages = document.querySelector(`dialog${dialogSelector} .output-pages`);
  const readState = document.querySelector(
    `dialog${dialogSelector} .output-read-state`
  );

  return { title, author, pages, readState };
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

  set invoke(node) {
    this._invoke = node;

    node.addEventListener("click", () => console.log("a"));
  }
}

class DialogInput extends Dialog {
  constructor(dialogSelector, buttonNames) {
    super(dialogSelector, buttonNames);

    this.inputs = InputsFactory(dialogSelector);
  }
}

class DialogOutput extends Dialog {
  constructor(dialogSelector, buttonNames) {
    super(dialogSelector, buttonNames);

    this.outputs = OutputsFactory(dialogSelector);
  }
}

export const createBook = new DialogInput("#create-book", [
  "cancel",
  "confirm",
]);
export const editBook = new DialogInput("#edit-book", ["cancel", "confirm"]);
export const bookInfo = new DialogOutput("#book-info", ["cancel"]);
export const deleteBook = new DialogOutput("#delete-book", [
  "cancel",
  "delete",
]);

createBook.invoke = invokeCreateBookButton;

console.log(createBook);

// Functions
function ClearInputs(dialogObject) {
  const inputsArray = Array.from(dialogObject.modal.querySelectorAll("input"));

  for (const input of inputsArray) {
    if (input.type !== "checkbox") {
      input.value = "";
      input.dataset.state = "valid";
    } else {
      input.checked = false;
    }
  }
}

export function InvokeModal(dialogObject) {
  if ("inputs" in dialogObject) {
    ClearInputs(dialogObject);
  }

  dialogObject.modal.showModal();
}

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
createBook.invokeElement.addEventListener("click", () =>
  InvokeModal(createBook)
);
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
