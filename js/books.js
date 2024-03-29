const books = [];
let bookCards = [];
let bookId;

const emptyLibraryLabel = document.querySelector(".empty-library");
const booksContainer = document.querySelector(".books-container");

class Book {
  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }
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

    bookCards = Array.from(document.querySelectorAll(".book-card"));
  } else {
    emptyLibraryLabel.style.display = "block";
  }
}

function AddBook(title, author, pages, readState) {
  // Cannot access Book before initialization
  const newBook = new Book(title, author, pages, readState);
  books.push(newBook);

  RefreshBooks();
}

function DeleteBook(bookIndex) {
  books.splice(bookIndex, 1);

  RefreshBooks();
}

function EditBook(index, title, author, pages, readState) {
  delete books[index];

  const newBook = new Book(title, author, pages, readState);
  books[index] = newBook;

  RefreshBooks();
}

RefreshBooks();

export { books, bookCards, AddBook, DeleteBook, EditBook };
