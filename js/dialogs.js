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
  info: {
    currentBook: null,
    currentIndex: null,
  },
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

export const deleteBook = {
  modal: document.querySelector("#delete-book-dialog"),
  buttons: {
    invoke: document.querySelector("#book-info-dialog .delete-icon"),
    cancel: document.querySelector("#delete-book-dialog .cancel-button"),
    delete: document.querySelector("#delete-book-dialog .delete-button"),
  },
  elements: {
    title: document.querySelector("#delete-book-dialog .book-title"),
    author: document.querySelector("#delete-book-dialog .book-author"),
  },
};

const editBook = {
  modal: document.querySelector("#edit-book-dialog"),
  buttons: {
    invoke: document.querySelector("#book-info-dialog .edit-icon"),
    cancel: document.querySelector("#edit-book-dialog .cancel-button"),
    confirm: document.querySelector("#edit-book-dialog .confirm-button"),
  },
  inputs: {
    title: document.querySelector("#edit-book-dialog input#edit-book-title"),
    author: document.querySelector("#edit-book-dialog input#edit-book-author"),
    pages: document.querySelector("#edit-book-dialog input#edit-book-pages"),
    readState: document.querySelector(
      "#edit-book-dialog input#edit-book-read-state"
    ),
  },
};

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
  editBook.inputs.title.value = book.title;
  editBook.inputs.author.value = book.author;
  editBook.inputs.pages.value = book.pages;
  editBook.inputs.readState.checked = book.checked;

  InvokeModal(editBook);
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
