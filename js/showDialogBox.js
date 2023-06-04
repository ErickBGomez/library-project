const createBookDialog = document.querySelector("#create-book-dialog");
const createBookButton = document.querySelector(".create-book-button");

function OpenDialogBox(dialog) {
  dialog.showModal();
}

createBookButton.addEventListener("click", () =>
  OpenDialogBox(createBookDialog)
);
