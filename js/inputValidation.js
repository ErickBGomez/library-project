import { createBook } from "./dialogs.js";

const form = document.querySelector("form#book-form");

function ValidateInput(e) {
  if (e.target.value) {
    e.target.setCustomValidity("");
  } else {
    e.target.setCustomValidity("Required field!");
  }
}

function ValidateInputs(formElement) {
  const formInputs = formElement.querySelectorAll("input");

  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
    }
  }
}

createBook.inputs.title.addEventListener("input", ValidateInput);
createBook.inputs.author.addEventListener("input", ValidateInput);
createBook.inputs.pages.addEventListener("input", ValidateInput);

form.onsubmit = (e) => {
  e.preventDefault();

  console.log("hola");
};
