let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

Book.prototype.displayBook = function() {
    let bookCard = document.createElement('div');
    bookCard.className = 'book';
    bookCard.id = this.title;
    let bookInfo;

    //display with read status
    if (this.read == true) {
        bookInfo = `<h3>${this.title}</h3>
        <b>By ${this.author}</b>
        <p>Pages: ${this.pages}</p>
        <button id="readBook" onclick="toggleRead('${bookCard.id}')">Read</button>
        <button id="removeBook" onClick="deleteBook('${bookCard.id}')">Remove</button>
        </div>`;
    }
    else if (this.read == false) {
        bookInfo = `<h3>${this.title}</h3>
        <b>By ${this.author}</b>
        <p>Pages: ${this.pages}</p>
        <button id="unreadBook" onclick="toggleRead('${bookCard.id}')">Unread</button>
        <button id="removeBook" onClick="deleteBook('${bookCard.id}')">Remove</button>
        </div>`;
    }



    bookCard.innerHTML = (bookInfo);
    library.appendChild(bookCard);

}

//Creating sample books
const SampleBook1 = new Book("Harry Potter", "J.K. Rowling", 250, true);
const SampleBook2 = new Book("Arthur", "Marc Brown", 22, false);
const SampleBook3 = new Book("Dune", "Frank Herbert", 475, true);

SampleBook1.addBookToLibrary();
SampleBook2.addBookToLibrary();
SampleBook3.addBookToLibrary();


//library container from DOM
const library = document.querySelector(".library");

//Modal
const modal = document.getElementById("bookModal");
const modalButton = document.getElementById("addBook");

//Open modal on click
modalButton.onclick = function() {
    modal.style.display = "block";
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

    if (title == "" || author == "" || pages == "" || read == "") {
        alert("Error. please fill all fields!");
        return;
    }

    //convert read status to boolean
    if (read == "true") {
        read = true;
    }
    else {
        read = false;
    }


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

//Toggle read/unread status of a book 
function toggleRead (bookId) {
    let index = myLibrary.findIndex(book => book.title === bookId);
    if (myLibrary[index].read == true) {
        myLibrary[index].read = false;
    }
    else {
        myLibrary[index].read = true; 
    }

    displayLibrary(myLibrary);
}

//prevent users from entering invalid page numbers
function enforceMinMax(e){
    if(e.value != ""){
      if(parseInt(e.value) < 1){
        e.value = 1;
      }
      else if(parseInt(e.value) > 10000){
        e.value = 10000;
      }
    }
  }

