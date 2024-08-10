let myLibrary = [];

const book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    rating: '4.5/5'
};

myLibrary.push(book);

function Book(name, author, genre, rating) {
    this.name = name
    this.author = author
    this.genre = genre
    this.rating = rating
}

function addBookToLibrary() {
     
}

function createBookCard (book) {
        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("h4");
        let bookAuthor = document.createElement('span');
        let bookGenre = document.createElement('span');
        let bookRating = document.createElement('span');

        bookCard.classList.add("card");
        [bookTitle, bookAuthor, bookGenre, bookRating].forEach(el => el.classList.add("book-info"));

        bookTitle.textContent = book.title || 'Unknown Title';
        bookAuthor.textContent = `Author: ${book.author || 'Unknown Author'}`;
        bookGenre.textContent = `Genre: ${book.genre || 'Unknown Genre'}`;
        bookRating.textContent = `Rating: ${book.rating || 'No Rating'}`;

        const container = document.querySelector('.container');

        bookCard.append(bookTitle, bookAuthor, bookGenre, bookRating);
        container.appendChild(bookCard);
}

createBookCard(book);