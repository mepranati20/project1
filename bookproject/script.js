// ----- Step 2: Storage Array -----
const myLibrary = [];


// ----- Step 2: Constructor -----
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();  // unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Step 6: Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


// ----- Step 2: Function to Add Book -----
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}


// ----- Step 3: Display Books -----
function displayBooks() {
  const display = document.getElementById("libraryDisplay");
  display.innerHTML = ""; // clear display first

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id; // Step 5

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>

      <button class="toggleReadBtn">Toggle Read</button>
      <button class="deleteBtn">Delete</button>
    `;

    display.appendChild(card);
  });

  attachCardButtons();
}


// ----- Step 5 & 6: Button Events -----
function attachCardButtons() {
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.parentElement.dataset.id;
      removeBook(bookId);
    });
  });

  document.querySelectorAll(".toggleReadBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.parentElement.dataset.id;
      toggleReadStatus(bookId);
    });
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}


// ----- Step 4: Form Handling -----
const dialog = document.getElementById("bookFormDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");
const bookForm = document.getElementById("bookForm");

newBookBtn.onclick = () => dialog.showModal();
closeDialog.onclick = () => dialog.close();

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page refresh

  // get values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  dialog.close();
});


// Optional: Add dummy books for testing display
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Atomic Habits", "James Clear", 280, false);