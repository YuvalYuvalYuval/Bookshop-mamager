'use strict'

var gBooks = loadBooks();
var gFilterBy = {
    select: 'Select',
    deacending: false,
    text: ''
}
const BOOKS_PER_PAGE = 5
var gStartIdx = 0

function nextPage() {
    if (gStartIdx >= gBooks.length - BOOKS_PER_PAGE) return
    gStartIdx += BOOKS_PER_PAGE
}

function previousPage() {
    if (gStartIdx === 0) return
    gStartIdx -= BOOKS_PER_PAGE
}

function createBooks() {
    if (!gBooks || !gBooks.length) {
        gBooks = [];

        for (var i = 0; i < 12; i++) {
            addBook(getRandomName(), getRandomPrice());
        }
    }
}

function addBook(name, price) {
    const book = {
        id: makeId(),
        name,
        price,
        rate: 0
    }
    gBooks.unshift(book)
    saveBooks(gBooks)
}

function removeBook(bookId) {
    gBooks = gBooks.filter(book => book.id !== bookId)
    saveBooks(gBooks)
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function updateBook(book, newPrice) {
    if (book.price !== newPrice) {
        book.price = newPrice;
        saveBooks(gBooks)
    }
}

function changeBookRating(bookId, diff) {
    const book = getBookById(bookId)
    const newRating = book.rate + diff

    if (newRating < 0 || newRating > 10) return
    book.rate = newRating

    saveBooks(gBooks)
    renderRatingDisplay(newRating)
}

function filterBooks() {
    gStartIdx = 0

    var order = gFilterBy.deacending ? -1 : 1
    var filterSelect = gFilterBy.select

    gBooks.sort((a, b) => {
        if (filterSelect === 'price') return (a.price - b.price) * order
        else if (filterSelect === 'title') return a.name > b.name ? order : -order
        else if (filterSelect === 'rating') return (a.rate - b.rate) * order
    })
    var searchTxt = gFilterBy.text.toLowerCase()
    return gBooks.filter((book) => book.name.toLowerCase().includes(searchTxt))
}