export const bookCardTemplate = (title, author, completedPages, totalPages, isRead) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("book-card");
    wrapper.dataset.title = title;
    wrapper.innerHTML = `<div class="book-title-cnt">
                            <span>&ldquo;</span>
                            <h2 class="book-title">${title}</h1>
                            <span>&rdquo;</span>
                         </div>
                         <h3 class="book-author">-${author}</h2>
                         <div class="book-pages">
                            <input type="text" class="book-completedPages" name="pages-completed" data-pages="${totalPages}" value="${completedPages}">
                            <h4 class="book-totalPages">&nbsp;| ${totalPages}</h4>
                         </div>
                         <div class="isread book-options-ic" data-value="${isRead}"></div>
                         <div class="book-options-cnt" data-title="${title}">
                            <img class="book-options-ic" data-value="delete" src="./assets/remove.svg" alt="remove">
                            <img class="book-options-ic" data-value="edit" src="./assets/edit.svg" alt="edit">
                            <img class="book-options-ic" data-value="collections" src="./assets/library_add.svg" alt="collections">
                        </div>`;
    return wrapper;
}

export const availableCollectionTemplate = (name) => {
   const wrapper = document.createElement("div");
   wrapper.classList.add("collection-list");
   wrapper.dataset.checked = "false";
   wrapper.innerHTML = `<div class="checkbox">
                           <div class="checked"></div>
                        </div>
                        <h4 class="collection-title">${name}</h3>
                        <svg style="color: orange;" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="collection-remove-ic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>`
   return wrapper;
}

export const genreCardTemplate = (name, count) => {
   const wrapper = document.createElement("div");
   wrapper.classList.add("book-collection");
   wrapper.innerHTML = `<h1 class="collection-title">${name}</h1>
                        <h3 class="collection-count">Total Books: <span>${count}</span></h3>
                        <div class="collection-control">
                           <img src="./assets/edit.svg" alt="edit">
                           <img src="./assets/remove.svg" alt="">
                        </div>`
   return wrapper;
}