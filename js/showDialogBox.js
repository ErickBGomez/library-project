const dialogBox = {
  currentDialog: null,
  closeButton: null,
};

const openDialogButtons = document.querySelectorAll("button.open-dialog");

export default function CloseCurrentDialog() {
  dialogBox.currentDialog.className = "close-dialog";

  // Wait until animation has finished
  dialogBox.currentDialog.addEventListener(
    "animationend",
    (e) => {
      e.target.close();
      dialogBox.currentDialog = null;
      dialogBox.closeButton = null;
    },
    { once: true }
  );
}

function RefreshCurrentDialogInputs() {
  const dialogInputs = dialogBox.currentDialog.querySelectorAll("input");

  dialogInputs.forEach((e) => {
    // Assign parameter value to avoid eslint: no-param-reassing
    const input = e;

    if (input.type === "text" || input.type === "tel") {
      input.value = "";
    } else if (input.type === "checkbox") {
      input.checked = false;
    }
  });
}

function OpenDialog(dialog) {
  dialogBox.currentDialog = dialog;
  dialogBox.closeButton =
    dialogBox.currentDialog.querySelector(".cancel-button");

  RefreshCurrentDialogInputs();

  dialogBox.currentDialog.className = "open-dialog";

  dialogBox.closeButton.addEventListener("click", CloseCurrentDialog, {
    once: true,
  });

  dialog.showModal();
}

/* Each button that opens a dialog has a data- attribute with the ID of their respective dialog box */
openDialogButtons.forEach((button) => {
  const dialog = document.querySelector(`dialog#${button.dataset.dialog}`);

  button.addEventListener("click", () => OpenDialog(dialog));
});
