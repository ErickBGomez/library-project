const books = [];

// Select DOM elements
const emptyLibraryText = document.querySelector(".empty-library");
const booksContainer = document.querySelector(".books-container");

const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const bookPagesInput = document.querySelector("#book-pages");
const bookReadState = document.querySelector("#book-read-state");

const confirmButton = document.querySelector(".confirm-button");

function Book(title, author, pages, readState) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

function CreateBookCard(book) {
  // Book card container
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  // Book cover background and icon
  const bookCover = document.createElement("div");
  bookCover.classList.add("cover");

  const bookCoverIcon = document.createElement("i");
  bookCoverIcon.classList.add("material-symbols-outlined");
  bookCoverIcon.classList.add("fill");
  bookCoverIcon.classList.add("cover-icon");
  bookCoverIcon.textContent = "book";

  bookCover.appendChild(bookCoverIcon);

  // Book title
  const bookTitle = document.createElement("div");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;

  // Book author
  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("author");
  bookAuthor.textContent = book.author;

  // Book read state icon
  const bookReadStateIcon = document.createElement("i");
  bookReadStateIcon.classList.add("material-symbols-outlined");
  bookReadStateIcon.classList.add("read-icon");
  bookReadStateIcon.textContent = "check";

  if (book.readState) {
    bookCard.classList.add("read");
  }

  bookCard.appendChild(bookCover);
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookReadStateIcon);

  booksContainer.appendChild(bookCard);
}

function RefreshBooksContainer() {
  booksContainer.innerHTML = "";

  if (books.length) {
    emptyLibraryText.style.display = "none";

    books.forEach((book) => CreateBookCard(book));
  } else {
    emptyLibraryText.style.display = "block";
  }
}

function CreateBook(title, author, pages, readState) {
  books.push(new Book(title, author, pages, readState));

  RefreshBooksContainer();
  CloseDialogBox(createBookDialog);
}

confirmButton.addEventListener("click", () =>
  CreateBook(
    bookTitleInput.value,
    bookAuthorInput.value,
    bookPagesInput.value,
    bookReadState.value
  )
);

books.push(new Book("Dracula", "Bram Stoker", 418, false));
books.push(new Book("The Divine Comedy", "Dante Alighieri", 304, true));
books.push(
  new Book("The Little Prince", "Antoine de Saint-Exupéry", 96, false)
);
books.push(new Book("Don Quixote", "Miguel de Cervantes", 462, true));
books.push(new Book("Luz negra", "Álvaro Menéndez Leal", 130, true));

RefreshBooksContainer();
