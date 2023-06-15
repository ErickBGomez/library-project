import createBookDialog from "./modalDialogs.js";

const books = [];

// Select DOM elements
const emptyLibraryText = document.querySelector(".empty-library");
const booksContainer = document.querySelector(".books-container");
const createBookButton = document.querySelector(".create-book-button");
const debugElement = document.querySelector("#debug-element");

function Book(title, author, pages, readState) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

function InsertBookCard(book) {
  // User backticks instead of DOM methods to simplify function structure
  const newBookCard = `
  <div class="book-card" data-readState="${book.readState}">
    <div class="cover">
      <i class="material-symbols-outlined fill cover-icon">book</i>
    </div>
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <i class="material-symbols-outlined read-icon">check</i>
  </div>
  `;

  // Insert new book element to booksContainer
  booksContainer.innerHTML += newBookCard;
}

function RefreshBooksContainer() {
  booksContainer.innerHTML = "";

  if (books.length) {
    emptyLibraryText.style.display = "none";

    books.forEach((book) => InsertBookCard(book));
  } else {
    emptyLibraryText.style.display = "block";
  }
}

function CreateBook() {
  books.push(
    new Book(
      createBookDialog.inputs.title.value,
      createBookDialog.inputs.author.value,
      createBookDialog.inputs.pages.value,
      createBookDialog.inputs.readState.checked
    )
  );

  InsertBookCard(books[books.length - 1]);
  RefreshBooksContainer();
}

books.push(new Book("Dracula", "Bram Stoker", 418, false));
books.push(new Book("The Divine Comedy", "Dante Alighieri", 304, true));
books.push(
  new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, false)
);
books.push(new Book("Don Quixote", "Miguel de Cervantes", 462, true));
books.push(new Book("Luz negra", "Álvaro Menéndez Leal", 130, true));

RefreshBooksContainer();

createBookButton.addEventListener("click", () =>
  createBookDialog.modal.showModal()
);
