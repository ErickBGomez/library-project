const createBookDialog = document.querySelector("#create-book-dialog");
const createBookButton = document.querySelector(".create-book-button");
const cancelButton = document.querySelector(".cancel-button");

function OpenDialogBox(dialog) {
  dialog.classList.remove("close-dialog");
  dialog.classList.add("open-dialog");

  dialog.showModal();
}

function CloseDialogBox(dialog) {
  dialog.classList.remove("open-dialog");
  dialog.classList.add("close-dialog");

  // Wait until animation has finished
  // And only close when dialog is at closing state
  dialog.addEventListener("animationend", (e) => {
    if (e.target.classList.value === "close-dialog") e.target.close();
  });
}

createBookButton.addEventListener("click", () =>
  OpenDialogBox(createBookDialog)
);

cancelButton.addEventListener("click", () => CloseDialogBox(createBookDialog));
