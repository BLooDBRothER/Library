import { bookCardTemplate } from "./template.js";

// Library Class Logic
class Book{
    constructor(title, author, completedPages, totalPages, isRead=false, groups=[]){
        this.title = title;
        this.author = author,
        this.completedPages = completedPages,
        this.totalPages = totalPages,
        this.isRead = isRead,
        this.groups = groups
    }
}

class library{
    constructor(books=[], libraryGroups=[]){
        this.books = books;
        this.libraryGroups = libraryGroups;
    }

    addBook(book){
        this.books.push(book);
    }

    displayBook(books){
        books.forEach(book => {
            bookCardsCnt.appendChild(bookCardTemplate(book.title, book.author, book.completedPages, book.totalPages, book.isRead, book.groups));
        });
    }
}

// DOM
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

addBookIC.addEventListener("click", (e) => {
    document.querySelector("body").style.overflowY = "hidden";
    formCnt.style.top = document.querySelector("html").scrollTop + "px";
    toggleDisplay([formCnt, addBookForm], [1, 1]);
});

closeFormIC.addEventListener("click", (e) => {
    document.querySelector("body").style.overflowY = "initial"
    toggleDisplay([formCnt, addBookForm], [0, 0]);
});

//window listener
window.addEventListener("keyup", (e) => {
    if(e.key === "Escape" && !formCnt.classList.contains("none")){
        document.querySelector("body").style.overflowY = "initial"
        toggleDisplay([formCnt, addBookForm], [0, 0]);
    }
});

// function to toggle display none
function toggleDisplay([...elem], [...value]){
    elem.forEach((each, idx) => {
        value[idx] ? each.classList.remove("none") : each.classList.add("none");
    });
}