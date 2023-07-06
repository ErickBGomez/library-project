const books = [];

const emptyLibraryText = document.querySelector(".empty-library");
const booksContainer = document.querySelector(".books-container");

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

function CreateBook(title, author, pages, readState) {
  books.push(new Book(title, author, pages, readState));

  InsertBookCard(books[books.length - 1]);
  RefreshBooksContainer();
}

RefreshBooksContainer();
