import { InvokeBookInfo } from "./dialogs.js";

const books = [];
let bookCards = [];
let bookId;

const emptyLibraryLabel = document.querySelector(".empty-library");
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
  <div class="book-card" data-readState="${book.readState}" data-bookId="${bookId}">
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

function RefreshBooks() {
  booksContainer.innerHTML = "";
  bookId = 0;

  if (books.length) {
    emptyLibraryLabel.style.display = "none";

    books.forEach((book) => {
      InsertBookCard(book);
      bookId++;
    });

    // books[bookCard.dataset.bookid]

    bookCards = document.querySelectorAll(".book-card");

    bookCards.forEach((bookCard, index) => {
      bookCard.addEventListener("click", () => InvokeBookInfo(books[index]));
    });
  } else {
    emptyLibraryLabel.style.display = "block";
  }
}

export function AddBook(title, author, pages, readState) {
  const newBook = new Book(title, author, pages, readState);
  books.push(newBook);

  RefreshBooks();
}

// Testing: Start program with pre-predefined books
AddBook("Dracula", "Bram Stoker", 418, false);
AddBook("The Divine Comedy", "Dante Alighieri", 304, true);
AddBook("The Little Prince", "Antoine de Saint-Exupéry", 96, false);
AddBook("Don Quixote", "Miguel de Cervantes", 462, true);
AddBook("Luz negra", "Álvaro Menéndez Leal", 130, true);

RefreshBooks();