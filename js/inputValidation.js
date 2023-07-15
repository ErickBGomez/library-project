import { createBook } from "./dialogs.js";
import { InitializeBook } from "./createBook.js";

const form = document.querySelector("form#book-form");

function ValidateInput(input) {
  if (input.type === "checkbox") return;

  if (input.value) {
    input.dataset.state = "valid";
  } else {
    input.dataset.state = "invalid";
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
  if (!invalidInputs) {
    InitializeBook(
      createBook.inputs.title.value,
      createBook.inputs.author.value,
      createBook.inputs.pages.value,
      createBook.inputs.readState.checked
    );

    e.target.submit();
  }
}

// Add event to every input
for (const input in createBook.inputs) {
  const currentInput = createBook.inputs[input];

  if (currentInput.type !== "checkbox") {
    currentInput.addEventListener("input", () => {
      ValidateInput(currentInput);
    });
  }
}

form.addEventListener("submit", CustomSubmit);
