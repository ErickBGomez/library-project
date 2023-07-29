import { bookInfo, createBook, editBook } from "./dialogs.js";
import { AddBook, EditBook } from "./books.js";

const createBookForm = document.querySelector("form#create-book-form");
const editBookForm = document.querySelector("form#edit-book-form");
const numbersRegex = /^\d+$/;

export function SetCustomValidity(message) {
  const validationMsg = this.parentElement.querySelector("span.validation-msg");

  if (!message) {
    this.dataset.state = "valid";
    return;
  }

  this.dataset.state = "invalid";
  validationMsg.innerText = `* ${message}`;
}

export function ValidateInput() {
  if (this.type === "checkbox") return;

  if (!this.value) {
    this.customValidate("Field cannot be empty");
  } else if (this.type === "tel" && !numbersRegex.test(this.value)) {
    this.customValidate("Field can only contain numbers");
  } else {
    this.customValidate();
  }
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

export function CustomSubmit(e, callback) {
  e.preventDefault();

  // Count invalid inputs
  let invalidInputs = 0;

  for (const input in this.inputs) {
    if (input === "readState") break;
    const currentInput = this.inputs[input];

    currentInput.validate();

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

editBookForm.addEventListener("submit", (e) =>
  CustomSubmit(e, editBook, EditBookCallback)
);
