import { bookInfo, createBook, editBook } from "./dialogs.js";
import { AddBook, EditBook } from "./books.js";

const createBookForm = document.querySelector("form#create-book-form");
const editBookForm = document.querySelector("form#edit-book-form");

function ValidateInput(input) {
  if (input.type === "checkbox") return;

  if (input.value) {
    input.dataset.state = "valid";
  } else {
    input.dataset.state = "invalid";
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

// Add event to every input

function ValidateDialogInputs(dialogObject) {
  for (const input in dialogObject.inputs) {
    const currentInput = dialogObject.inputs[input];

    if (currentInput.type !== "checkbox") {
      currentInput.addEventListener("input", () => {
        ValidateInput(currentInput);
      });
    }
  }
}

ValidateDialogInputs(createBook);
ValidateDialogInputs(editBook);

createBookForm.addEventListener("submit", (e) =>
  CustomSubmit(e, createBook, AddBookCallback)
);
editBookForm.addEventListener("submit", (e) =>
  CustomSubmit(e, editBook, EditBookCallback)
);
