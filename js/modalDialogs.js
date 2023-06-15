const createBookDialog = {
  modal: document.querySelector("dialog#create-book-dialog"),
  buttons: {
    cancel: document.querySelector(
      "dialog#create-book-dialog button.cancel-button"
    ),
    submit: document.querySelector(
      "dialog#create-book-dialog button.confirm-button"
    ),
  },
  inputs: Array.from(
    document.querySelectorAll("dialog#create-book-dialog input")
  ),
};

// createBookDialog.modal.showModal();
