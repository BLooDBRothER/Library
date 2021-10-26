import { bookCardTemplate } from "./template.js";

// Library Object Prototype Logic

function Book(title, author, completedPages, totalPages, isRead=false, groups=[]){
    this.title = title;
    this.author = author,
    this.completedPages = completedPages,
    this.totalPages = totalPages,
    this.isRead = isRead,
    this.groups = groups
}

function Library(books=[], libraryGroups=[]){
    this.books = books;
    this.libraryGroups = libraryGroups;
}

Library.prototype.addBook = function (book){
    this.books.push(book);
}

Library.prototype.updateBook = function (idx, book){
    this.books[idx] = book;
}

Library.prototype.removeBook = function (title){
    this.books = this.books.filter(book => book.title !== title);
}

Library.prototype.returnBook = function (title){
    return this.books.findIndex(book => book.title === title);
}

Library.prototype.checkBookExists = function (newBook){
    return this.books.some(book => book.title === newBook.title);
}

const myLibrary = new Library();
// DOM
console.log(myLibrary)
const addBookIC = document.querySelector(".control-ic[data-icon='books']");
const addCollectionIC = document.querySelector(".control-ic[data-icon='collections']");
const toggleCollectionIC = document.querySelector(".control-ic[data-icon='toggle-collections']");
const librarySearch = document.querySelector(".library-search"); 
const sectionTitle = document.querySelector(".section-title");
const bookCardsCnt = document.querySelector(".book-cards");
const bookCollectionsCnt = document.querySelector(".book-collections");
const formCnt = document.querySelector(".add-forms");
const addBookForm = document.querySelector(".add-book-form");
const closeFormIC = document.querySelector(".close-form");
const formBtn = document.querySelectorAll(".form_button");

// add book form value
const title = addBookForm.querySelector(".book__form-text[data-name='title']");
const author = addBookForm.querySelector(".book__form-text[data-name='author']");
const completedPages = addBookForm.querySelector(".book__form-text[data-name='compPage']");
const error = addBookForm.querySelectorAll(".err");
const totalPages = addBookForm.querySelector(".book__form-text[data-name='totPage']");
const isReadCheckBox = addBookForm.querySelector(".book__form-checkbox");

function toggleBookForm(){
    document.querySelector("body").style.overflowY = "hidden";
    formCnt.style.top = document.querySelector("html").scrollTop + "px";
    toggleDisplay([formCnt, addBookForm], [1, 1]);
    addBookForm.querySelectorAll(".book__form-text").forEach(elem => {elem.value = "";})
}

toggleCollectionIC.addEventListener("click", function(e){
    if(this.dataset.toggled === "false"){
        this.style.fill = "var(--secondary-color)";
        librarySearch.placeholder = "Search Collections";
        this.dataset.toggled = "true";
        sectionTitle.innerText = "Collections";
        toggleDisplay([addBookIC, addCollectionIC, bookCardsCnt, bookCollectionsCnt], [0, 1, 0 ,1]);
    }
    else{
        this.style.fill = "var(--form)";
        this.dataset.toggled = "false";
        librarySearch.placeholder = "Search Books";
        sectionTitle.innerText = "All Books";
        toggleDisplay([addBookIC, addCollectionIC, bookCardsCnt, bookCollectionsCnt], [1, 0, 1 ,0]);

    }
});

addBookIC.addEventListener("click", toggleBookForm);

closeFormIC.addEventListener("click", (e) => {
    document.querySelector("body").style.overflowY = "initial"
    toggleDisplay([formCnt, addBookForm], [0, 0]);
});

completedPages.addEventListener("click", (e) => {
    if(e.target.readOnly){
        error[1].innerText = "Fill Total Pages";
        setTimeout(() => {error[1].innerText = ""}, 1000);
    }
});

const pagesRE = /[^\d]/gi;

completedPages.addEventListener("input", function(e){
    if(this.value.match(pagesRE) || this.value.length > 5){
        console.log(this.value)
        this.value = this.value.slice(0, this.value.length-1);
        return;
    }
    if(+this.value > +totalPages.value){
        error[1].innerText = "Cannot Exceed Total Pages";
        setTimeout(() => {error[1].innerText = ""}, 1000);
        this.value = this.value.slice(0, this.value.length-1);
    }
});

totalPages.addEventListener("input", function(e){
    completedPages.readOnly =  this.value !== "" ? false : true;
    if(this.value.match(pagesRE) || this.value.length > 5){
        console.log(this.value)
        this.value = this.value.slice(0, this.value.length-1);
        return;
    }
    completedPages.value = "";
});

formBtn.forEach(btn => {
    btn.addEventListener("click", function(e){
        if(this.dataset.value === "book" && this.innerText === "Add To Library"){
            addBook();
        }
        else if(this.dataset.value === "book" && this.innerText === "Update Book"){
            this.innerText = "Add To Library";
            updateBook();
        }
    });
});

// add Book
function checkFilled(){
    let returnValue = false;
    addBookForm.querySelectorAll(".book__form-text").forEach(elem => {
        if(elem.value === ""){
            returnValue = true;
            elem.style.borderColor = "var(--negative)";
            setTimeout(() => {elem.style.borderColor = "var(--accent)"}, 1000);
        }
    });
    return returnValue;
}

function createBook(){
    const bookTitle = replaceAngularBracket(title.value);
    const bookAuthor = replaceAngularBracket(author.value);
    const bookCompletedPages = +completedPages.value;
    const bookTotalPages = +totalPages.value;
    const bookIsRead = isReadCheckBox.checked;
    return new Book(bookTitle, bookAuthor, bookCompletedPages, bookTotalPages, bookIsRead);
}

function addBook(){
    if(checkFilled()) return;
    const newBook = createBook();
    if(myLibrary.checkBookExists(newBook)) {
        error[0].innerText = "Book Already exists";
        title.style.borderColor = "var(--negative)";
        setTimeout(() => {error[0].innerText = ""; title.style.borderColor = "var(--accent)"}, 1000);
        return
    };
    myLibrary.addBook(newBook);
    displayBook(newBook);
    closeFormIC.click();
}

function updateBookForm(bookTitle){
    const bookFormBtn = document.querySelector(".form_button[data-value='book']");
    bookFormBtn.innerText = "Update Book";
    toggleBookForm();
    const bookIdx = myLibrary.returnBook(bookTitle);
    bookFormBtn.dataset.idx = bookIdx;
    const book = myLibrary.books[bookIdx];
    title.value = book.title;
    author.value = book.author;
    completedPages.value = book.completedPages;
    totalPages.value = book.totalPages;
    isReadCheckBox.checked = book.isRead;
}

function updateBook(){

}

function editBook(e){
    const bookTitle = e.target.parentElement.dataset.title;
    console.log(bookTitle);
    if(e.target.dataset.value === "delete"){
        myLibrary.removeBook(bookTitle);
        console.log(bookCardsCnt);
        bookCardsCnt.removeChild(bookCardsCnt.querySelector(`.book-card[data-title="${bookTitle}"]`));
    }
    if(e.target.dataset.value === "edit"){
        updateBookForm(bookTitle);
    }
}

function displayBook(book){
    bookCardsCnt.appendChild(bookCardTemplate(book.title, book.author, book.completedPages, book.totalPages, book.isRead));
    bookCardsCnt.lastChild.querySelectorAll(".book-options-ic").forEach(option => {
        option.addEventListener("click", editBook);
    });
}

function displayAllBooks(books){
    books.forEach(book => {
        this.displayBook(book);
    });
}

//window listener
window.addEventListener("keyup", (e) => {
    if(e.key === "Escape" && !formCnt.classList.contains("none")){
        document.querySelector("body").style.overflowY = "initial"
        toggleDisplay([formCnt, addBookForm], [0, 0]);
    }
});

// util function

// function to toggle display none
function toggleDisplay([...elem], [...value]){
    elem.forEach((each, idx) => {
        value[idx] ? each.classList.remove("none") : each.classList.add("none");
    });
}

// function to replace angular brackets
function replaceAngularBracket(string = ""){
    string = string.replace(/</gi, "&lt;");
    string = string.replace(/>/gi, "&gt;");
    return string;
}