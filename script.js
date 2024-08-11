let myLibrary = [];
const form = document.getElementById('bookForm');
let formBtn = document.querySelector('.form-btn');
const container = document.querySelector('.container');

const book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isRead: 'True',
    rating: '4.5/5'
};
myLibrary.push(book);

function createBookCard (book, id) {
    let bookCard = document.createElement("div");
    let bookTitle = document.createElement("h4");
    let bookAuthor = document.createElement('span');
    let bookGenre = document.createElement('span');
    let bookRead = document.createElement('span');
    let bookRating = document.createElement('span');
    let removeBookBtn = document.createElement('button');
    let toggleReadStatus = document.createElement('button');

    bookCard.classList.add("card");
    [bookTitle, bookAuthor, bookGenre, bookRead, bookRating].forEach(el => el.classList.add("book-info"));
    removeBookBtn.classList.add("remove-btn", "card-btn");
    toggleReadStatus.classList.add("update-btn", "card-btn");
    removeBookBtn.setAttribute("d-id", id);
    toggleReadStatus.setAttribute("r-id", id);
    

    bookTitle.textContent = book.title || 'Unknown Title';
    bookAuthor.textContent = `Author: ${book.author || 'Unknown Author'}`;
    bookGenre.textContent = `Genre: ${book.genre || 'Unknown Genre'}`;
    bookRead.textContent = `Read: ${book.isRead == 'Yes' || book.isRead == true  ? 'True' : 'False'}`;
    bookRating.textContent = `Rating: ${book.rating || 'No Rating'}`;
    removeBookBtn.textContent = 'Remove Book';
    toggleReadStatus.textContent = 'Update Read Status';

    let tempSpan = document.createElement('span');
    tempSpan.classList.add('btn-box');
    tempSpan.append(removeBookBtn, toggleReadStatus);

    bookCard.append(bookTitle, bookAuthor, bookGenre, bookRead, bookRating, tempSpan);
        return bookCard;
}

function displayBooks() {
    clearGrid();
    const footer = document.querySelector('.add-book');
    myLibrary.forEach((book, index) => {
        const newBook = createBookCard(book, index);
        container.insertBefore(newBook, footer);
    }) 
}

function clearGrid() {
    const children = Array.from(container.children);
    for (let child of children) {
        if (child.tagName.toLowerCase() === 'footer' || 
        child.tagName.toLowerCase() == 'form') continue;
        container.removeChild(child); 
    }
}

//toggle form on the sidebar
let addBookBtn = document.querySelector('.add-btn');
addBookBtn.addEventListener('click', () => {
    form.classList.toggle('invisible');
})

//stop default behavior of form & create object from from data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('i ran');
    const formData = new FormData(form);
    const bookData = Object.fromEntries(formData.entries());
    myLibrary.push(bookData);
    displayBooks();
    form.reset();
});

displayBooks();

container.addEventListener('click', (e) => {
    if (e.target.matches('.remove-btn')) {
        removeBook(e.target);
    }
    else if (e.target.matches('.update-btn')) {
        updateReadStatus(e.target);
    }
    displayBooks();
})

function removeBook(target) {
    id = target.getAttribute('d-id');
    myLibrary.splice(id, 1);
}

function updateReadStatus(target) {
    id = target.getAttribute('r-id');
    myLibrary[id].isRead = !(myLibrary[id].isRead)
}
