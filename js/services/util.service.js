'use strict'

function getRandomPrice() {
    return getRandomIntInc(5, 35)
}

function getRandomName() {
    const subjects = ['Java', 'Python', 'CSS', 'CPP', 'Web-Dev', 'Programming', 'Magic', 'Making Films', 'Bible', 'Poetry', 'History']
    const crowd = ['Fish', 'Zebras', 'Youngsters', 'All', 'Wizzards', 'Dummies', 'Turtles', 'Soldiers', 'School kids', 'Zoo keepers']

    const name = subjects[getRandomIntInc(0, subjects.length - 1)] + ' For ' + crowd[getRandomIntInc(0, crowd.length - 1)];
    return name;
}

function getRandomIntInc(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeId(length = 3) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}