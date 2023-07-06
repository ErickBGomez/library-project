// Dialogs

export const createBook = {
  modal: document.querySelector("#create-book-dialog"),
  invoke: document.querySelector(".create-book-button"),
  cancel: document.querySelector("#create-book-dialog .cancel-button"),
  confirm: document.querySelector("#create-book-dialog .confirm-button"),
};

// Functions
function InvokeModal(dialogModal, containsInput) {
  if (containsInput) {
    const inputsArray = dialogModal.querySelectorAll("input");

    inputsArray.forEach((e) => {
      // Avoid eslint(no-param-reassign)
      const input = e;

      input.value = "";
      input.checked = false;
    });
  }

  dialogModal.showModal();
}

// Create book events
createBook.invoke.addEventListener("click", () =>
  InvokeModal(createBook.modal, true)
);
createBook.cancel.addEventListener("click", () => createBook.modal.close());
createBook.confirm.addEventListener("click", () => createBook.modal.close());
