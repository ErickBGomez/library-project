const books = [];

// Select DOM elements
const emptyLibraryText = document.querySelector(".empty-library");

function DisplayBooks() {
  if (books.length) {
    emptyLibraryText.style.display = "none";
  } else {
    emptyLibraryText.style.display = "block";
  }
}

DisplayBooks();
