import { bookInfo, createBook, editBook } from "./dialogs.js";
import { AddBook, EditBook } from "./books.js";

const createBookForm = document.querySelector("form#create-book-form");
const editBookForm = document.querySelector("form#edit-book-form");
const numbersRegex = /^\d+$/;

function SetCustomValidity(inputElement, message) {
  const validationMsg = inputElement.parentElement.querySelector(
    "span.validation-msg"
  );

  if (!message) {
    inputElement.dataset.state = "valid";
    return;
  }

  inputElement.dataset.state = "invalid";
  validationMsg.innerText = `* ${message}`;
}

export function ValidateInput() {
  if (this.type === "checkbox") return;

  if (!this.value) {
    SetCustomValidity(this, "Field cannot be empty");
  } else if (this.type === "tel" && !numbersRegex.test(this.value)) {
    SetCustomValidity(this, "Field can only contain numbers");
  } else {
    SetCustomValidity(this);
  }
}

function AddBookCallback() {
  AddBook(
    createBook.inputs.title.value,
    createBook.inputs.author.value,
    createBook.inputs.pages.value,
    createBook.inputs.readState.checked
  );
}

function EditBookCallback() {
  EditBook(
    bookInfo.info.currentIndex,
    editBook.inputs.title.value,
    editBook.inputs.author.value,
    editBook.inputs.pages.value,
    editBook.inputs.readState.checked
  );
}

function CustomSubmit(e, dialogObject, callback) {
  e.preventDefault();

  // Count invalid inputs
  let invalidInputs = 0;

  for (const input in dialogObject.inputs) {
    const currentInput = dialogObject.inputs[input];

    ValidateInput(currentInput);

    if (currentInput.dataset.state === "invalid") {
      invalidInputs++;
    }
  }

  // Submit
  if (!invalidInputs) {
    callback();

    e.target.submit();
  }
}

createBookForm.addEventListener("submit", (e) =>
  CustomSubmit(e, createBook, AddBookCallback)
);
editBookForm.addEventListener("submit", (e) =>
  CustomSubmit(e, editBook, EditBookCallback)
);
