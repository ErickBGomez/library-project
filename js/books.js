import { InvokeBookInfo } from "./dialogs.js";

const books = [];
let bookCards = [];

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

function RefreshBookContainer() {
  booksContainer.innerHTML = "";

  if (books.length) {
    emptyLibraryText.style.display = "none";

    books.forEach((book) => {
      InsertBookCard(book);
    });

    bookCards = document.querySelectorAll(".book-card");

    bookCards.forEach((bookCard, index) => {
      bookCard.addEventListener("click", () => InvokeBookInfo(books[index]));
    });
  } else {
    emptyLibraryText.style.display = "block";
  }
}

export function AddNewBook(title, author, pages, readState) {
  const newBook = new Book(title, author, pages, readState);
  books.push(newBook);

  RefreshBookContainer();
}

// Testing: Start program with pre-prefined books
AddNewBook("Dracula", "Bram Stoker", 418, false);
AddNewBook("The Divine Comedy", "Dante Alighieri", 304, true);
AddNewBook("The Little Prince", "Antoine de Saint-Exupéry", 96, false);
AddNewBook("Don Quixote", "Miguel de Cervantes", 462, true);
AddNewBook("Luz negra", "Álvaro Menéndez Leal", 130, true);

RefreshBookContainer();
