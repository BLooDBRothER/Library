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