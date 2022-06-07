'use strict'

const KEY = 'bookList';

function loadBooks() {
    return JSON.parse(localStorage.getItem(KEY))
}

function saveBooks(books) {
    localStorage.setItem(KEY, JSON.stringify(books))
}