// Add book - form
const addBookIC = document.querySelector(".control-ic[data-icon='books']");
const formCnt = document.querySelector(".add-forms");
const addBookForm = document.querySelector(".add-book-form");
const closeFormIC = document.querySelectorAll(".close-form");

addBookIC.addEventListener("click", (e) => {
    document.querySelector("body").style.overflowY = "hidden";
    formCnt.style.top = document.querySelector("html").scrollTop + "px";
    toggleDisplay([formCnt, addBookForm], [1, 1]);
});

closeFormIC.forEach(IC => {
    IC.addEventListener("click", (e) => {
        document.querySelector("body").style.overflowY = "initial"
        toggleDisplay([formCnt, addBookForm], [0, 0]);
    });
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