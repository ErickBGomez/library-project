function ValidateInput() {
  if (this.value) {
    this.setCustomValidity("");
  } else {
    this.setCustomValidity("Required field!");
  }

  console.log("a");
}

const input = document.querySelector("input#book-title");

input.addEventListener("input", ValidateInput);
