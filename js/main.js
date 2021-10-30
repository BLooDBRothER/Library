import {
  availableCollectionTemplate,
  bookCardTemplate,
  genreCardTemplate,
} from "./template.js";

// Library Object Prototype Logic

function Book(
  title,
  author,
  completedPages,
  totalPages,
  isRead = false,
  groups = []
) {
  this.title = title;
  (this.author = author),
    (this.completedPages = completedPages),
    (this.totalPages = totalPages),
    (this.isRead = isRead),
    (this.groups = groups);
}

function Library(books = [], libraryGroups = []) {
  this.books = books;
  this.libraryGroups = libraryGroups;
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

Library.prototype.updateBook = function (idx, book) {
  this.books[idx] = book;
};

Library.prototype.removeBook = function (title) {
  this.books = this.books.filter((book) => replaceSpaceUnderscore(book.title.toLowerCase()) !== title);
};

Library.prototype.returnBook = function (title) {
  return this.books.findIndex((book) => replaceSpaceUnderscore(book.title.toLowerCase())=== title);
};

Library.prototype.checkBookExists = function (newBook, bookIdx) {
  return this.books.some((book, idx) => {
    return (
      replaceSpaceUnderscore(book.title.toLowerCase()) === replaceSpaceUnderscore(newBook.title.toLowerCase()) &&
      bookIdx !== idx
    );
  });
};
Library.prototype.addCollections = function (collectionObj) {
  this.libraryGroups.push(collectionObj);
};

Library.prototype.editCollectionsToBook = function (bookTitle, collectionName) {
  console.log(bookTitle, collectionName)
  const bookIdx = this.returnBook(bookTitle);
  let count;
  this.books[bookIdx].groups.some((name) => name === collectionName)
    ? ((this.books[bookIdx].groups = this.books[bookIdx].groups.filter(
        (name) => name !== collectionName
      )),
      (count = this.collectionCount(collectionName, 0)))
    : (this.books[bookIdx].groups.push(collectionName),
      (count = this.collectionCount(collectionName, 1)));
  console.log(this.books);
  return count;
};

Library.prototype.collectionCount = function (collectionName, value) {
  let count;
  this.libraryGroups.forEach((group) => {
    if (group[collectionName] !== undefined) {
      value ? group[collectionName]++ : group[collectionName]--;
      count = group[collectionName];
    }
  });
  return count;
};

Library.prototype.returnBookCollections = function (bookTitle) {
  console.log(bookTitle)
  const bookIdx = this.returnBook(bookTitle);
  return this.books[bookIdx].groups;
};

Library.prototype.checkCollectionExists = function (name) {
  return this.libraryGroups.some(
    (collection) => collection[name.toLowerCase()] !== undefined
  );
};

const myLibrary = new Library();
// --------------------------------------------Book methods----------------------------------------------
// DOM
console.log(myLibrary);
const addBookIC = document.querySelector(".control-ic[data-icon='books']");
const addCollectionIC = document.querySelector(
  ".control-ic[data-icon='collections']"
);
const toggleCollectionIC = document.querySelector(
  ".control-ic[data-icon='toggle-collections']"
);
const librarySearch = document.querySelector(".library-search");
const sectionTitle = document.querySelector(".section-title");
const bookCardsCnt = document.querySelector(".book-cards");
const bookCollectionsCnt = document.querySelector(".book-collections");
const formCnt = document.querySelector(".add-forms");
const addBookForm = document.querySelector(".add-book-form");
const closeFormIC = document.querySelector(".close-form");
const formBtn = document.querySelectorAll(".form_button");
const addBookBtn = document.querySelector(".form_button[data-value='book']");

// add book form value
const title = addBookForm.querySelector(".book__form-text[data-name='title']");
const author = addBookForm.querySelector(
  ".book__form-text[data-name='author']"
);
const completedPages = addBookForm.querySelector(
  ".book__form-text[data-name='compPage']"
);
const error = addBookForm.querySelectorAll(".err");
const totalPages = addBookForm.querySelector(
  ".book__form-text[data-name='totPage']"
);
const isReadCheckBox = addBookForm.querySelector(".book__form-checkbox");

function toggleBookForm() {
  document.querySelector("body").style.overflowY = "hidden";
  formCnt.style.top = document.querySelector("html").scrollTop + "px";
  toggleDisplay([formCnt, addBookForm], [1, 1]);
  addBookForm.querySelectorAll(".book__form-text").forEach((elem) => {
    elem.value = "";
  });
}

toggleCollectionIC.addEventListener("click", function (e) {
  if (this.dataset.toggled === "false") {
    this.style.fill = "var(--secondary-color)";
    librarySearch.placeholder = "Search Collections";
    this.dataset.toggled = "true";
    sectionTitle.innerText = "Collections";
    toggleDisplay(
      [addBookIC, addCollectionIC, bookCardsCnt, bookCollectionsCnt],
      [0, 1, 0, 1]
    );
  } else {
    backCollectionIC.click();
    this.style.fill = "var(--form)";
    this.dataset.toggled = "false";
    librarySearch.placeholder = "Search Books";
    sectionTitle.innerText = "All Books";
    toggleDisplay(
      [addBookIC, addCollectionIC, bookCardsCnt, bookCollectionsCnt],
      [1, 0, 1, 0]
    );
  }
});

addBookIC.addEventListener("click", toggleBookForm);

closeFormIC.addEventListener("click", (e) => {
  document.querySelector("body").style.overflowY = "initial";
  toggleDisplay([formCnt, addBookForm], [0, 0]);
  addBookBtn.innerText = "Add To Library";
});

completedPages.addEventListener("click", (e) => {
  if (e.target.readOnly) {
    e.preventDefault();
    error[1].innerText = "Fill Total Pages";
    setTimeout(() => {
      error[1].innerText = "";
    }, 1000);
  }
});

const pagesRE = /[^\d]/gi;

completedPages.addEventListener("input", function (e) {
  if (this.value.match(pagesRE) || this.value.length > 5) {
    this.value = this.value.slice(0, this.value.length - 1);
    return;
  }
  if (+this.value > +totalPages.value) {
    error[1].innerText = "Cannot Exceed Total Pages";
    setTimeout(() => {
      error[1].innerText = "";
    }, 1000);
    this.value = this.value.slice(0, this.value.length - 1);
  }
});

totalPages.addEventListener("input", function (e) {
  completedPages.readOnly = this.value !== "" ? false : true;
  if (this.value.match(pagesRE) || this.value.length > 5) {
    this.value = this.value.slice(0, this.value.length - 1);
    return;
  }
  completedPages.value = "";
});

formBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.dataset.value === "book" && this.innerText === "Add To Library") {
      addBookOnCick();
    } else if (
      this.dataset.value === "book" &&
      this.innerText === "Update Book"
    ) {
      updateBookOnClick(this);
    }
  });
});

// add Book
function checkFilled() {
  let returnValue = false;
  addBookForm.querySelectorAll(".book__form-text").forEach((elem) => {
    if (elem.value === "") {
      returnValue = true;
      elem.style.borderColor = "var(--negative)";
      setTimeout(() => {
        elem.style.borderColor = "var(--accent)";
      }, 1000);
    }
  });
  return returnValue;
}

function createBook() {
  const bookTitle = replaceAngularBracket(title.value);
  const bookAuthor = replaceAngularBracket(author.value);
  const bookCompletedPages = +completedPages.value;
  const bookTotalPages = +totalPages.value;
  const bookIsRead = isReadCheckBox.checked;
  return new Book(
    bookTitle,
    bookAuthor,
    bookCompletedPages,
    bookTotalPages,
    bookIsRead
  );
}

function validateForm(idx = -1) {
  if (checkFilled()) return false;
  const newBook = createBook();
  if (myLibrary.checkBookExists(newBook, idx)) {
    error[0].innerText = "Book Already exists";
    title.style.borderColor = "var(--negative)";
    setTimeout(() => {
      error[0].innerText = "";
      title.style.borderColor = "var(--accent)";
    }, 1000);
    return false;
  }
  return newBook;
}

function addBookOnCick() {
  const newBook = validateForm();
  if (!newBook) return;
  myLibrary.addBook(newBook);
  displayData(newBook, "book");
  saveData();
  closeFormIC.click();
}

function updateBookForm(bookTitle) {
  const bookFormBtn = document.querySelector(".form_button[data-value='book']");
  bookFormBtn.innerText = "Update Book";
  toggleBookForm();
  const bookIdx = myLibrary.returnBook(bookTitle);
  bookFormBtn.dataset.idx = bookIdx;
  const book = myLibrary.books[bookIdx];
  title.value = book.title;
  author.value = book.author;
  completedPages.value = book.completedPages;
  completedPages.readOnly = false;
  totalPages.value = book.totalPages;
  isReadCheckBox.checked = book.isRead;
}

function updateBookOnClick(btn) {
  const bookIdx = +btn.dataset.idx;
  const updatedBook = validateForm(bookIdx);
  if (!updatedBook) return;
  const oldBookCard = bookCardsCnt.querySelector(
    `.book-card[data-title="${replaceSpaceUnderscore(myLibrary.books[bookIdx].title.toLowerCase())}"]`
  );
  console.log(oldBookCard);
  const groups = oldBookCard ? oldBookCard.dataset : {};
  for(let i in groups){
    if(groups[i] === "true"){
      updatedBook.groups.push(i);
    }
  }
  console.log(updatedBook);
  const newBookCard = bookCardTemplate(
    updatedBook.title,
    updatedBook.author,
    updatedBook.completedPages,
    updatedBook.totalPages,
    updatedBook.isRead,
    updatedBook.groups
  );
  bookCardsCnt.replaceChild(newBookCard, oldBookCard);
  newBookCard.querySelectorAll(".book-options-ic").forEach((option) => {
    option.addEventListener("click", editBook);
  });
  myLibrary.updateBook(bookIdx, updatedBook);
  btn.innerText = "Add To Library";
  btn.dataset.idx = "null";
  saveData();
  closeFormIC.click();
}

function editBook(e) {
  const bookTitle = e.target.parentElement.dataset.title;
  if (e.target.dataset.value === "delete") {
    myLibrary.removeBook(bookTitle);
    bookCardsCnt.removeChild(
      bookCardsCnt.querySelector(`.book-card[data-title="${bookTitle}"]`)
    );
  }
  if (e.target.dataset.value === "edit") {
    updateBookForm(bookTitle);
  } else if (e.target.dataset.value === "collections") {
    closeCollectionCnt.dataset.title = e.target.parentElement.dataset.title;
    enableGroupsPresent(
      myLibrary.returnBookCollections(closeCollectionCnt.dataset.title)
    );
    toggleDisplay([closeCollectionCnt], [1]);
  } else {
    e.target.dataset.value =
      e.target.dataset.value === "false" ? "true" : "false";
    const oldBookIdx = myLibrary.returnBook(
      e.target.parentElement.dataset.title
    );
    myLibrary.books[oldBookIdx].isRead =
      e.target.dataset.value === "false" ? false : true;
    if (myLibrary.books[oldBookIdx].isRead) {
      e.target.parentElement.querySelector(".book-completedPages").value =
        myLibrary.books[oldBookIdx].totalPages;
      myLibrary.books[oldBookIdx].completedPages =
        myLibrary.books[oldBookIdx].totalPages;
    }
    saveData();
  }
}

function displayData(data, cntName) {
  cntName === "book"
    ? (bookCardsCnt.appendChild(
        bookCardTemplate(
          data.title,
          data.author,
          data.completedPages,
          data.totalPages,
          data.isRead,
          data.groups
        )
      ),
      addBookCardListener(bookCardsCnt.lastChild))
    : (bookCollectionsCnt.appendChild(
        genreCardTemplate(Object.keys(data)[0], Object.values(data)[0])
      ),
      collectionListsCnt.appendChild(
        availableCollectionTemplate(Object.keys(data)[0])
      ),
      addCollectionCardListener(bookCollectionsCnt.lastChild),
      addCollectionListListener(collectionListsCnt.lastChild));
}

function displayAllData(data, cntName) {
  cntName === "book"
    ? data.forEach((obj) => {
        myLibrary.addBook(obj);
        displayData(obj, cntName);
      })
    : data.forEach((obj) => {
        myLibrary.addCollections(obj);
        displayData(obj, cntName);
      });
}

function enableGroupsPresent(groups) {
  const collectionList = document.querySelectorAll(".collection-list");
  if (collectionList.length === 0) return;
  collectionList.forEach((list) => {
    list.dataset.checked = "false";
  });
  groups.forEach((name) => {
    console.log(name)
    document.querySelector(
      `.collection-list[data-name="${replaceSpaceUnderscore(name.toLowerCase())}"]`
    ).dataset.checked = "true";
  });
}

function addBookCardListener(elem) {
  const bookCardCompletedPagesInput = elem.querySelector(
    ".book-completedPages"
  );
  elem.querySelectorAll(".book-options-ic").forEach((option) => {
    option.addEventListener("click", editBook);
  });
  bookCardCompletedPagesInput.addEventListener("input", function (e) {
    if (this.value.match(pagesRE) || this.value.length > 5) {
      this.value = this.value.slice(0, this.value.length - 1);
      return;
    }
    if (+this.value > +this.dataset.pages) {
      error[1].innerText = "Cannot Exceed Total Pages";
      setTimeout(() => {
        error[1].innerText = "";
      }, 1000);
      this.value = this.value.slice(0, this.value.length - 1);
    }
    const bookIdx = myLibrary.returnBook(
      e.target.parentElement.parentElement.dataset.title
    );
    myLibrary.books[+bookIdx].completedPages = +this.value;
    saveData();
  });
}

// --------------------------------------------Groups methods----------------------------------------------
// DOM
const closeCollectionCnt = document.querySelector(".display-collection-lists");
const closeCollectionIC = document.querySelector(".close-collection-ic");
const collectionListsCnt = document.querySelector(".collection-lists");
const createCollectionInput = document.querySelector(".collection-name");
const createCollectionIc = document.querySelector(".create-collection-ic");
const backCollectionIC = document.querySelector(".back-collection");
const collectionListDisp = document.querySelector(".cl-list-cnt");

addCollectionIC.addEventListener("click", (e) => {
  toggleDisplay([closeCollectionCnt, collectionListDisp], [1, 0]);
});

createCollectionIc.addEventListener("click", (e) => {
  const collectionName = replaceAngularBracket(createCollectionInput.value);
  if (collectionName === "") {
    document.querySelector(".cl-err").innerText = "Can't be Empty";
    setTimeout((e) => {
      document.querySelector(".cl-err").innerText = "";
    }, 1000);
    return;
  }
  if (myLibrary.checkCollectionExists(collectionName)) {
    document.querySelector(".cl-err").innerText = "Already Exist";
    setTimeout((e) => {
      document.querySelector(".cl-err").innerText = "";
    }, 1000);
    return;
  }
  const collection = returnCollection(collectionName);
  myLibrary.addCollections(collection);
  displayData(collection);
  saveData();
  createCollectionInput.value = "";
});

closeCollectionIC.addEventListener("click", (e) => {
  toggleDisplay([closeCollectionCnt, collectionListDisp], [0, 1]);
});

backCollectionIC.addEventListener("click", (e) => {
  const allBooks = [...document.querySelectorAll(".book-card")];
  toggleDisplay(allBooks, [1]);
  toggleDisplay(
    [bookCardsCnt, bookCollectionsCnt, backCollectionIC],
    [0, 1, 0]
  );
});

function returnCollection(name) {
  const obj = {};
  obj[name] = 0;
  return obj;
}

function addCollectionListListener(elem) {
  elem.addEventListener("click", function (e) {
    const collectionName = this.querySelector(".collection-title").innerText;
    console.log(collectionName)
    document.querySelector(
      `.book-collection[data-name="${this.dataset.name}"] h3 span`
    ).innerText = myLibrary.editCollectionsToBook(
      closeCollectionCnt.dataset.title,
      collectionName
    );
    this.dataset.checked =
      this.dataset.checked === "false"
        ? (document.querySelector(
            `.book-card[data-title="${closeCollectionCnt.dataset.title}"]`
          ).dataset[replaceSpaceUnderscore(this.dataset.name.toLowerCase())] = "true",
          "true")
        : (document.querySelector(
          `.book-card[data-title="${closeCollectionCnt.dataset.title}"]`
        ).dataset[replaceSpaceUnderscore(this.dataset.name.toLowerCase())] = "false",
        "false");
    saveData();
  });
}

function addCollectionCardListener(elem) {
  elem.addEventListener("click", function (e) {
    toggleDisplay(
      [closeCollectionCnt, bookCardsCnt, bookCollectionsCnt, backCollectionIC],
      [0, 1, 0, 1]
    );
    displayCollectionBook(this.dataset.name);
  });
}

function displayCollectionBook(genreName) {
  const allBooks = [...document.querySelectorAll(".book-card")];
  toggleDisplay(allBooks, [0]);
  console.log(genreName);
  const genreBook = [
    ...document.querySelectorAll(`.book-card[data-${genreName.toLowerCase().split(" ").join("_")}="true"]`),
  ];
  console.log(genreBook);
  toggleDisplay(genreBook, [1]);
  console.log(allBooks);
}

// -------------------------------------------------Util function-------------------------------------------
// function to toggle display none
function toggleDisplay([...elem], [...value]) {
  if (elem.length !== value.length) {
    elem.forEach((each) => {
      value[0] ? each.classList.remove("none") : each.classList.add("none");
    });
    return;
  }
  elem.forEach((each, idx) => {
    value[idx] ? each.classList.remove("none") : each.classList.add("none");
  });
}

// function to replace space to underscore and vice versa
function replaceSpaceUnderscore(str){
  return str.replace(/[ ]/gi, "_");
}


// function to replace angular brackets
function replaceAngularBracket(string = "") {
  string = string.replace(/</gi, "&lt;");
  string = string.replace(/>/gi, "&gt;");
  return string;
}

// toSave locallay
function saveData() {
  localStorage.setItem("books", JSON.stringify(myLibrary.books));
  localStorage.setItem("collections", JSON.stringify(myLibrary.libraryGroups));
}

//window listener
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && !formCnt.classList.contains("none")) {
    document.querySelector("body").style.overflowY = "initial";
    toggleDisplay([formCnt, addBookForm], [0, 0]);
    addBookBtn.innerText = "Add To Library";
  }
});

window.addEventListener("DOMContentLoaded", (e) => {
  let books = localStorage.getItem("books");
  if (books) {
    books = JSON.parse(books);
    displayAllData(books, "book");
  }
  let collections = localStorage.getItem("collections");
  if (collections) {
    collections = JSON.parse(collections);
    displayAllData(collections, "collections");
  }
});
