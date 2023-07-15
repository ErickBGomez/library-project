import { createBook } from "./dialogs.js";

const form = document.querySelector("form#book-form");

function ValidateInput(input) {
  if (input.type === "checkbox") return;

  if (input.value) {
    input.dataset.state = "valid";
    return null;
  } else {
    input.dataset.state = "invalid";
    return input;
  }
}

function CustomSubmit(e) {
  e.preventDefault();

  // Count invalid inputs
  let invalidInputs = 0;

  for (const input in createBook.inputs) {
    const currentInput = createBook.inputs[input];

    ValidateInput(currentInput);

    if (currentInput.dataset.state === "invalid") {
      invalidInputs++;
    }
  }

  // Submit
  if (!invalidInputs) e.target.submit();
}

form.addEventListener("submit", CustomSubmit);
