let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

Book.prototype.displayBook = function() {
    let bookCard = document.createElement('div');
    bookCard.className = 'book';
    bookCard.id = this.title;

    let bookInfo = `<h3>${this.title}</h3>
    <b>By ${this.author}</b>
    <p>Pages: ${this.pages}</p>
    <p>Read: ${this.read}</p>
    <button onClick="deleteBook('${bookCard.id}')">Remove</button>
    </div>`;

    bookCard.innerHTML = (bookInfo);
    library.appendChild(bookCard);

}

//Creating sample books
const SampleBook1 = new Book("Harry Potter", "J.K. Rowling", 250, true);
const SampleBook2 = new Book("Arthur", "Marc Brown", 22, false);
const SampleBook3 = new Book("Dune", "Frank Herbert", 475, true);
const SampleBook4 = new Book("Harry Potter2", "J.K. Rowling", 250, true);
const SampleBook5 = new Book("Arthur2", "Marc Brown", 22, false);
const SampleBook6 = new Book("Dune2", "Frank Herbert", 475, true);
const SampleBook7 = new Book("Harry Potter3", "J.K. Rowling", 250, true);
const SampleBook8 = new Book("Arthur3", "Marc Brown", 22, false);
const SampleBook9 = new Book("Dune3", "Frank Herbert", 475, true);

SampleBook1.addBookToLibrary();
SampleBook2.addBookToLibrary();
SampleBook3.addBookToLibrary();
SampleBook4.addBookToLibrary();
SampleBook5.addBookToLibrary();
SampleBook6.addBookToLibrary();
SampleBook7.addBookToLibrary();
SampleBook8.addBookToLibrary();
SampleBook9.addBookToLibrary();

//library container from DOM
const library = document.querySelector(".library");

//Modal
const modal = document.getElementById("bookModal");
const modalButton = document.getElementById("addBook");
const span = document.getElementsByClassName("close")[0];

//Open modal on click
modalButton.onclick = function() {
    modal.style.display = "block";
}

//close modal when X clicked
span.onclick = function() {
    modal.style.display = "none";
}

//close modal when clicked outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//function to display all current books in myLibrary array
function displayLibrary (myLibrary) {
    //Wipe the library display clean before redisplaying
    library.innerHTML = "";
    myLibrary.forEach((book) => book.displayBook());
}

displayLibrary(myLibrary);

//function to gather book information from user form
function readForm () {
    let form = document.getElementById("bookForm");
    let title = form.elements[0].value;
    let author = form.elements[1].value;
    let pages = form.elements[2].value;
    let read = form.elements["read"].value;

    const newBook = new Book(title, author, pages, read);
    newBook.addBookToLibrary();
    displayLibrary(myLibrary);

    form.reset();

}

//Remove book from library
function deleteBook (bookId) {
    const bookRemoved = document.getElementById(bookId);
    bookRemoved.remove();

    let index = myLibrary.findIndex(book => book.title === bookId);
    myLibrary.splice(index,1);

    displayLibrary(myLibrary);

}

