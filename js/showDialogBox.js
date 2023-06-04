const dialogContainer = document.querySelector(".dialog-boxes");
const dialogBoxes = document.querySelectorAll("dialog");

function CheckOpenedDialog() {
  dialogBoxes.forEach((dialogBox) => {
    if (dialogBox.attributes.open) {
      dialogContainer.classList.add("dialog-shown");
    } else {
      dialogContainer.classList.remove("dialog-shown");
    }
  });
}

CheckOpenedDialog();
