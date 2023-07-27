// Dialogs

function InputsFactory(dialogSelector) {
  const dialogQuery = `dialog${dialogSelector} input${dialogSelector}`;

  const inputs = {
    title: document.querySelector(`${dialogQuery}-title`),
    author: document.querySelector(`${dialogQuery}-author`),
    pages: document.querySelector(`${dialogQuery}-pages`),
    readState: document.querySelector(`${dialogQuery}-read-state`),
  };

  return inputs;
}

function DialogFactory(dialogSelector) {
  const dialog = {
    modal: document.querySelector(dialogSelector),
    buttons: {},
  };

  return dialog;
}

function DialogWithInputFactory(dialogSelector) {
  const dialogParent = DialogFactory(dialogSelector);

  const dialogWithInput = {
    inputs: InputsFactory(dialogSelector),
  };

  return Object.assign({}, dialogParent, dialogWithInput);
}

export const createBook = DialogWithInputFactory("#create-book");
export const editBook = DialogWithInputFactory("#edit-book");
export const bookInfo = DialogFactory("#book-info");
export const deleteBook = DialogFactory("#delete-book");

// export const createBook = {
//   modal: document.querySelector("dialog#create-book"),
//   buttons: {
//     invoke: document.querySelector(".create-book-button"),
//     cancel: document.querySelector("dialog#create-book .cancel-button"),
//     confirm: document.querySelector("dialog#create-book .confirm-button"),
//   },
//   inputs: {
//     title: document.querySelector("dialog#create-book input#create-book-title"),
//     author: document.querySelector(
//       "dialog#create-book input#create-book-author"
//     ),
//     pages: document.querySelector("dialog#create-book input#create-book-pages"),
//     readState: document.querySelector(
//       "dialog#create-book input#create-book-read-state"
//     ),
//   },
// };

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
createBook.buttons.invoke.addEventListener("click", () =>
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
