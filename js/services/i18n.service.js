'use strict'

var gCurrLang = 'en';

var gTrans = {
    heading: {
        en: 'Welcome to Yuval\'s bookshop manager',
        he: 'ברוכים הבאים למנהל חנות הספרים של יובל'
    },
    'sort-by-label': {
        en: 'Sort by',
        he: 'מיין לפי',
    },
    'filter-select': {
        en: 'Select',
        he: 'בחר'
    },
    'filter-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'rating': {
        en: 'Rating',
        he: 'דירוג',
    },
    'filter-title': {
        en: 'Title',
        he: 'שם',
    },
    'deacending-label': {
        en: 'Deacending',
        he: 'סדר יורד',
    },
    'searchbox-placeholder': {
        en: 'Search for title...',
        he: 'חפש ספר...',
    },
    'new-book-btn': {
        en: 'Create new book',
        he: 'צור ספר חדש'
    },
    'table-id': {
        en: 'Id',
        he: 'מקט'
    },
    'table-title': {
        en: 'Title',
        he: 'שם'
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'book-description': {
        en: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis culpa corrupti tempora esse? Ad saepe Quis culpa corrupti',
        he: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים'
    },
    next: {
        en: 'Next',
        he: 'הבא'
    },
    previous: {
        en: 'Previous',
        he: 'הקודם'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function translatePage() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.localName === "input") {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
        num = usdToIls(num)
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
    }
    else return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

function usdToIls(price) {
    return price * 3.34
}