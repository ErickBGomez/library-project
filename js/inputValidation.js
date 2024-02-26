const numbersRegex = /^\d+$/;

function SetCustomValidity(message) {
  const validationMsg = this.parentElement.querySelector("span.validation-msg");

  if (!message) {
    this.dataset.state = "valid";
    return;
  }

  this.dataset.state = "invalid";
  validationMsg.innerText = `* ${message}`;
}

function ValidateInput() {
  if (this.type === "checkbox") return;

  if (!this.value) {
    this.customValidate("Field cannot be empty");
  } else if (this.type === "tel" && !numbersRegex.test(this.value)) {
    this.customValidate("Field can only contain numbers");
  } else {
    this.customValidate();
  }
}

function CustomSubmit(e, callback) {
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

export { SetCustomValidity, ValidateInput, CustomSubmit };
