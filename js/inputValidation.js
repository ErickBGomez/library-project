import { createBook } from "./dialogs.js";

function ValidateInput(e) {
  if (e.target.value) {
    e.target.setCustomValidity("");
  } else {
    e.target.setCustomValidity("Required field!");
  }
}

createBook.inputs.title.addEventListener("input", ValidateInput);
createBook.inputs.author.addEventListener("input", ValidateInput);
createBook.inputs.pages.addEventListener("input", ValidateInput);
