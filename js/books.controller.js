'use strict'

function onInit() {
    createBooks()
    renderBooks()
    renderFilterByQueryStringParams()
}

function renderBooks(books = gBooks) {
    console.log('rendering Books...')

    const strCatalogHeadingsHtml = `<tr>
    <th data-trans="table-id">Id</th>
    <th data-trans="table-title">Title</th>
    <th data-trans="table-price">Price</th>
    <th data-trans="table-actions">Actions</th>
</tr>`

    const elCatalogHeadings = document.querySelector('.catalog-headings')
    elCatalogHeadings.innerHTML = strCatalogHeadingsHtml

    const strBooksHtml = books.slice(gStartIdx, gStartIdx + BOOKS_PER_PAGE).map((book) => `<tr>
   <td>${book.id}</td>
   <td>${book.name}</td>
   <td>${formatCurrency(book.price)}</td>
   <td><button class="read-btn btn btn-primary" data-trans="read-btn" onclick="onReadBook('${book.id}')">Read</button>
   <button class="update-btn btn btn-warning" data-trans="update-btn" onclick="onUpdateBook('${book.id}')">Update</button> 
   <button class="delete-btn btn btn-danger" data-trans="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td> 
   </tr>`)

    const elBookCatalog = document.querySelector('.book-catalog')
    elBookCatalog.innerHTML = strBooksHtml.join('')

    translatePage()
}

function onRemoveBook(bookId) {
    console.log(`Removing book ${bookId}...`)
    removeBook(bookId)
    renderBooks()
}

function onCreateNewBook() {
    var name = gCurrLang === 'he' ? prompt('הזן את שם הספר') : prompt('Enter book title')
    if (name) var price = gCurrLang === 'he' ? +prompt(`הזן מחיר בדולרים עבור: ${name}`) : +prompt(`Enter a price for the book: ${name} (USD)`)
    if (!isNaN(price)) addBook(name, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId)
    var price = gCurrLang === 'he' ? +prompt(`הזן מחיר בדולרים עבור: ${book.name}`) : +prompt(`Enter a price for the book: ${name} (USD)`)
    if (isNaN(price)) return;
    updateBook(book, price);
    renderBooks()
}

function onReadBook(bookId) {
    renderModal(bookId)
    saveQueryStringParams(bookId)
}

function renderModal(bookId) {
    if (!bookId) return;
    const book = getBookById(bookId)
    const strHtml =
        `<div class="modal-txt">
   ${book.name}
    <img src="img/pngegg.png" alt="book preview">
    <p data-trans="book-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis culpa corrupti tempora esse? Ad saepe
        consectetur dolore iusto odit voluptates.</p>
        ${formatCurrency(book.price)}
</div>

<label data-trans="rating">Rating</label>
<div class="book-rating bg-secondary mb-2">
    <button class="minus btn btn-danger" onClick="onDecreasBook('${bookId}')">-</button>
    <span class="popularity">${book.rate}</span>
    <button class="minus btn btn-success" onClick="onIncreaseBook('${bookId}')">+</button>
</div>
<button data-trans="close" class="close-btn btn btn-sm btn-outline-light" onclick="onCloseModal()">Close</button>`

    const elModal = document.querySelector('.book-modal')
    elModal.innerHTML = strHtml;
    elModal.classList.add('shown')

    translatePage()
}

function onCloseModal() {
    const elModal = document.querySelector('.book-modal')
    elModal.classList.remove('shown');
    saveQueryStringParams()
}

function onDecreasBook(bookId) {
    console.log('Decreasing...');
    changeBookRating(bookId, -1);
}

function onIncreaseBook(bookId) {
    console.log('increasing...');
    changeBookRating(bookId, 1);
}

function renderRatingDisplay(rating) {
    const elRating = document.querySelector('.popularity')
    elRating.innerText = rating
}


function onSetFilterBy(key, value) {
    console.log('sorting...');
    gFilterBy[key] = value;
    const filteredBooks = filterBooks()
    renderBooks(filteredBooks)

    saveQueryStringParams()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)

    const paramsFilter = {
        select: queryStringParams.get('sortBy'),
        text: queryStringParams.get('searchTxt'),
        bookId: queryStringParams.get('bookId'),
    }

    if (!paramsFilter.select && !paramsFilter.text && !paramsFilter.bookId) return

    document.querySelector('.select').value = paramsFilter.select
    document.querySelector('.txtbox').value = paramsFilter.text

    gFilterBy.select = paramsFilter.select
    gFilterBy.text = paramsFilter.text

    const filteredBooks = filterBooks()
    renderBooks(filteredBooks)
    //open modal
    onReadBook(paramsFilter.bookId)
}

function onNextPage() {
    console.log('turning to next page...');
    nextPage()
    renderBooks()
}

function onPreviousPage() {
    console.log('turning to previous page...');
    previousPage()
    renderBooks()
}

function saveQueryStringParams(bookId = '') {
    const queryStringParams = `?sortBy=${gFilterBy.select}&searchTxt=${gFilterBy.text}&bookId=${bookId}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

///lang
function onSetLang(lang) {
    console.log(`changing lang to ${lang}...`);
    setLang(lang)
    renderFont(lang)
    translatePage()
    renderBooks()
}

function renderFont(lang) {
    const elBody = document.body

    lang === 'he' ? elBody.classList.add('he', 'rtl') :
        elBody.classList.remove('he', 'rtl')
}