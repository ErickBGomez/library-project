import {
  ValidateInput,
  SetCustomValidity,
  CustomSubmit,
} from "./inputValidation.js";
import { books, bookCards, AddBook, EditBook } from "./books.js";

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

  InvokeCallback = null;

  InvokeModal = (bookIndex) => {
    if ("inputs" in this) {
      this.ClearInputs();
    }

    this.modal.showModal();

    if (!this.InvokeCallback) return;
    this.InvokeCallback(bookIndex);
  };

  set invoke(node) {
    this._invoke = node;

    if (Array.isArray(node)) {
      node.forEach((n) =>
        n.addEventListener(
          "click",
          this.InvokeModal.bind(this, n.dataset.bookid)
        )
      );
    } else {
      node.addEventListener("click", this.InvokeModal);
    }
  }
}

const createBook = new Dialog("#create-book", ["cancel", "confirm"]);
const editBook = new Dialog("#edit-book", ["cancel", "confirm"]);
const bookInfo = new Dialog("#book-info", ["cancel"]);
const deleteBook = new Dialog("#delete-book", ["cancel", "delete"]);

// Input Mixins
createBook.inputs = InputsFactory(createBook);
editBook.inputs = InputsFactory(editBook);

// Unique properties:
// Book info
Object.defineProperty(bookInfo, "currentIndex", {
  set(index) {
    this.currentBook = books[index];
    this._currentIndex = index;
  },

  get() {
    return this._currentIndex;
  },
});

// Submit callbacks
createBook.submitCallback = function () {
  AddBook(
    createBook.inputs.title.value,
    createBook.inputs.author.value,
    createBook.inputs.pages.value,
    createBook.inputs.readState.checked
  );

  bookInfo.invoke = bookCards;
};

editBook.submitCallback = function () {
  EditBook(
    bookInfo.currentIndex,
    editBook.inputs.title.value,
    editBook.inputs.author.value,
    editBook.inputs.pages.value,
    editBook.inputs.readState.checked
  );
};

// Invoke callbacks
editBook.InvokeCallback = () => {
  editBook.inputs.title.value = bookInfo.currentBook.title;
  editBook.inputs.author.value = bookInfo.currentBook.author;
  editBook.inputs.pages.value = bookInfo.currentBook.pages;
  editBook.inputs.readState.checked = bookInfo.currentBook.readState;
};

bookInfo.InvokeCallback = (bookIndex) => {
  bookInfo.currentIndex = bookIndex;

  bookInfo.outputs.title.innerText = bookInfo.currentBook.title;
  bookInfo.outputs.author.innerText = bookInfo.currentBook.author;
  bookInfo.outputs.pages.innerText = `${bookInfo.currentBook.pages} pages`;
  bookInfo.outputs.readState.innerText = bookInfo.currentBook.readState
    ? "Already read"
    : "Not read yet";
};

deleteBook.InvokeCallback = () => {
  deleteBook.outputs.title.innerText = bookInfo.currentBook.title;
  deleteBook.outputs.author.innerText = bookInfo.currentBook.author;
};

// Output Mixins
bookInfo.outputs = OutputsFactory(bookInfo);
deleteBook.outputs = OutputsFactory(deleteBook);

// Set invoke elements
createBook.invoke = document.querySelector("button.create-book-button");
editBook.invoke = bookInfo.modal.querySelector("i.edit");
deleteBook.invoke = bookInfo.modal.querySelector("i.delete");
