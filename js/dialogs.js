// Dialogs

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

function DialogFactory(dialogSelector, buttonNames) {
  const modal = document.querySelector(dialogSelector);
  const buttons = ButtonsFactory(dialogSelector, buttonNames);

  return { modal, buttons };
}

function InputDialogFactory(dialogSelector, buttonNames) {
  const dialogParent = DialogFactory(dialogSelector, buttonNames);

  const inputs = InputsFactory(dialogSelector);

  return Object.assign({}, dialogParent, { inputs });
}

function OutputDialogFactory(dialogSelector, buttonNames) {
  const dialogParent = DialogFactory(dialogSelector, buttonNames);

  const outputs = OutputsFactory(dialogSelector);

  return Object.assign({}, dialogParent, { outputs });
}

export const createBook = InputDialogFactory("#create-book", [
  "cancel",
  "confirm",
]);
export const editBook = InputDialogFactory("#edit-book", ["cancel", "confirm"]);
export const bookInfo = OutputDialogFactory("#book-info", ["cancel"]);
export const deleteBook = OutputDialogFactory("#delete-book", [
  "cancel",
  "delete",
]);

const invokeCreateBookButton = document.querySelector(
  "button.create-book-button"
);

console.log(createBook);
// console.log(editBook);
// console.log(bookInfo);
// console.log(deleteBook);

// export const bookInfo = {
//   info: {
//     currentBook: null,
//     currentIndex: null,
//   },
//   modal: document.querySelector("dialog#book-info"),
//   buttons: {
//     cancel: document.querySelector("dialog#book-info .cancel-button"),
//   },
//   elements: {
//     title: document.querySelector("dialog#book-info .title"),
//     author: document.querySelector("dialog#book-info .author"),
//     pages: document.querySelector("dialog#book-info .pages"),
//     readState: document.querySelector("dialog#book-info .read-state"),
//   },
// };

// export const deleteBook = {
//   modal: document.querySelector("dialog#delete-book"),
//   buttons: {
//     invoke: document.querySelector("dialog#book-info .delete-icon"),
//     cancel: document.querySelector("dialog#delete-book .cancel-button"),
//     delete: document.querySelector("dialog#delete-book .delete-button"),
//   },
//   elements: {
//     title: document.querySelector("dialog#delete-book .book-title"),
//     author: document.querySelector("dialog#delete-book .book-author"),
//   },
// };

// export const editBook = {
//   modal: document.querySelector("dialog#edit-book"),
//   buttons: {
//     invoke: document.querySelector("dialog#book-info .edit-icon"),
//     cancel: document.querySelector("dialog#edit-book .cancel-button"),
//     confirm: document.querySelector("dialog#edit-book .confirm-button"),
//   },
//   inputs: {
//     title: document.querySelector("dialog#edit-book input#edit-book-title"),
//     author: document.querySelector("dialog#edit-book input#edit-book-author"),
//     pages: document.querySelector("dialog#edit-book input#edit-book-pages"),
//     readState: document.querySelector(
//       "dialog#edit-book input#edit-book-read-state"
//     ),
//   },
// };

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
