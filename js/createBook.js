import { openBook, InvokeModal } from "./dialogs.js";

const books = [];
let bookIdCounter = 0;

const emptyLibraryText = document.querySelector(".empty-library");
const booksContainer = document.querySelector(".books-container");

function Book(title, author, pages, readState) {
  this.id = `book-${bookIdCounter}`;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;

  bookIdCounter++;
}

function InsertBookCard(book) {
  // User backticks instead of DOM methods to simplify function structure
  const newBookCard = `
  <div class="book-card" data-readState="${book.readState}" data-bookId="${book.id}">
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
  if (books.length) {
    emptyLibraryText.style.display = "none";
  } else {
    emptyLibraryText.style.display = "block";
  }
}

function AddBookInformationEvent() {
  booksContainer.childNodes.forEach((node) =>
    node.addEventListener("click", () => InvokeModal(openBook))
  );
}

export function InitializeBook(title, author, pages, readState) {
  const newBook = new Book(title, author, pages, readState);

  books.push(newBook);
  InsertBookCard(newBook);

  RefreshBookContainer();

  AddBookInformationEvent();
}

// Testing: Start program with pre-prefined books
InitializeBook("Dracula", "Bram Stoker", 418, false);
InitializeBook("The Divine Comedy", "Dante Alighieri", 304, true);
InitializeBook("The Little Prince", "Antoine de Saint-Exupéry", 96, false);
InitializeBook("Don Quixote", "Miguel de Cervantes", 462, true);
InitializeBook("Luz negra", "Álvaro Menéndez Leal", 130, true);

RefreshBookContainer();
