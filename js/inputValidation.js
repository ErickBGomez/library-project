import { createBook } from "./dialogs.js";

const form = document.querySelector("form#book-form");

function ValidateInput(input) {
  if (input.value) {
    input.dataset.state = "valid";
    return null;
  } else if (input.type !== "checkbox") {
    input.dataset.state = "invalid";
    return input;
  }
}

function CustomSubmit(e) {
  e.preventDefault();

  // Count invalid inputs
  let invalidInputs = 0;

  for (let input in createBook.inputs) {
    const currentInput = createBook.inputs[input];

    ValidateInput(currentInput);

    if (currentInput.dataset.state === "invalid") {
      invalidInputs++;
    }
  }

  if (!invalidInputs) e.target.submit();
}

form.addEventListener("submit", CustomSubmit);
