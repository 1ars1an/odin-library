class Book {
    constructor(title, author, genre, isRead, rating) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isRead = isRead;
        this.rating = rating;
    }

    toggleReadStatus() {
        this.isRead = this.isRead === 'Yes' ? 'No' : 'Yes';
    }
}

class Library {
    constructor() {
        this.books = [];
        this.container = document.querySelector('.container');
        this.form = document.getElementById('bookForm');
        this.addBookBtn = document.querySelector('.add-btn');
        this.init();
    }

    init() {
        this.addInitialBook();
        this.setupEventListeners();
        this.displayBooks();
    }

    addInitialBook() {
        const initialBook = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'Yes', '4.5');
        this.addBook(initialBook);
    }

    setupEventListeners() {
        this.addBookBtn.addEventListener('click', () => this.toggleForm());
        this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        this.container.addEventListener('click', (e) => this.handleContainerClick(e));
    }

    toggleForm() {
        this.form.classList.toggle('invisible');
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const bookData = Object.fromEntries(formData.entries());
        const newBook = new Book(bookData.title, bookData.author, bookData.genre, bookData.isRead, bookData.rating);
        this.addBook(newBook);
        this.displayBooks();
        this.form.reset();
    }

    handleContainerClick(e) {
        if (e.target.matches('.remove-btn')) {
            this.removeBook(e.target.getAttribute('data-id'));
        } else if (e.target.matches('.update-btn')) {
            this.updateReadStatus(e.target.getAttribute('data-id'));
        }
        this.displayBooks();
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        this.books.splice(id, 1);
    }

    updateReadStatus(id) {
        this.books[id].toggleReadStatus();
    }

    createBookCard(book, id) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookCard.innerHTML = `
            <h4 class="book-info">${book.title || 'Unknown Title'}</h4>
            <span class="book-info">Author: ${book.author || 'Unknown Author'}</span>
            <span class="book-info">Genre: ${book.genre || 'Unknown Genre'}</span>
            <span class="book-info">Read: ${book.isRead}</span>
            <span class="book-info">Rating: ${book.rating || 'No Rating'}/5</span>
            <span class="btn-box">
                <button class="remove-btn card-btn" data-id="${id}">Remove Book</button>
                <button class="update-btn card-btn" data-id="${id}">Update Read Status</button>
            </span>
        `;
        return bookCard;
    }

    displayBooks() {
        this.clearGrid();
        const footer = document.querySelector('.add-book');
        this.books.forEach((book, index) => {
            const newBook = this.createBookCard(book, index);
            this.container.insertBefore(newBook, footer);
        });
    }

    clearGrid() {
        const children = Array.from(this.container.children);
        for (let child of children) {
            if (child.classList.contains('add-book') || child.classList.contains('form')) continue;
            this.container.removeChild(child);
        }
    }
}

// Initialize the library
const library = new Library();