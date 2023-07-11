
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function() {
        return  `${this.title} by ${this.author}, ${this.pages} pages, ${
            this.read ? 'read' : 'not read'
          }.`;
    }
}


const addBookToLibrary = (title, author, pages, read) => {
    // let title = prompt("Enter the book title: ");
    // let author = prompt("Enter the book author");
    // let pages = prompt("Enter the number of pages");
    // let read = confirm("Has the book been read? ");

    let newBook = new Book(title, author, pages, read);

    let library = myLibrary.push(newBook);

    return library;
};

const saveLibraryToLocalStorage = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

const loadLibraryFromLocalStorage = () => {
    let libraryData = localStorage.getItem('library');
    if(libraryData) {
        myLibrary = JSON.parse(libraryData);
        displayBook();
    }
}

loadLibraryFromLocalStorage();



console.log(myLibrary);

const displayBook = () => {

    let booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';



    myLibrary.forEach((book, index) => {
        let bookElement = document.createElement('div');
        bookElement.id = 'book';
        bookElement.innerHTML = `
            <h4>Title: ${book.title}</h4>
            <h4>Author: ${book.author}</h4>
            <h4>Pages: ${book.pages}</h4>
            <h4>Read: ${book.read ? 'Yes' : 'No'}</h4>
        `;

       

        let removeBookButton = document.createElement('button');
        removeBookButton.textContent = 'Remove Book';
        removeBookButton.dataset.index = index;
        removeBookButton.addEventListener('click', removeButton);


        let readStatusButton = document.createElement('button');
        readStatusButton.textContent = 'Read';
        readStatusButton.dataset.index = index;
        readStatusButton.addEventListener('click', toggleReadStatus);

        bookElement.appendChild(removeBookButton);
        bookElement.appendChild(readStatusButton);
        booksContainer.appendChild(bookElement);
    });
};


const toggleReadStatus = (e) => {
    let status = e.target.dataset.index;
    myLibrary[status].read = !myLibrary[status].read;
    displayBook();
}


const removeButton = (e) => {
    let index = e.target.dataset.index;
    myLibrary.splice(index, 1);

    displayBook();
}




const handleFormSubmit = (e) => {
    e.preventDefault();

    let title = document.getElementById('title-input').value;
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('pages-input').value;
    let read = document.getElementById('read-input').checked;

    addBookToLibrary(title, author, pages, read);

    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('pages-input').value = '';
    document.getElementById('read-input').checked = false;

  displayBook();

}

document.getElementById('new-book-form').addEventListener('submit', handleFormSubmit);






// const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 218, true)

// console.log(book1.getInfo());

// console.log(Object.getPrototypeOf(book1) === Book.prototype)
// console.log(book1.valueOf());