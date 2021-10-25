export const bookCardTemplate = (title, author, completedPages, totalPages, isRead) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("book-card");
    wrapper.innerHTML = `<div class="book-title-cnt">
                            <span>&ldquo;</span>
                            <h2 class="book-title">${title}</h1>
                            <span>&rdquo;</span>
                         </div>
                         <h3>-${author}</h2>
                         <div class="book-pages">
                            <input type="number" name="pages-completed" id="pages-completed" min=0 max=${totalPages} value="${completedPages}">
                            <h4>&nbsp;| ${totalPages}</h4>
                         </div>
                         <div class="isread" data-value="${isRead}"></div>
                         <div class="book-options-cnt">
                            <img class="book-options-ic" src="./assets/remove.svg" alt="remove">
                            <img class="book-options-ic" src="./assets/edit.svg" alt="remove">
                            <img class="book-options-ic" src="./assets/library_add.svg" alt="remove">
                        </div>`;
    return wrapper;
}