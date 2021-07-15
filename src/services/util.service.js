export const utilService = {
    capitalize,
    loadFromStorage,
    saveToStorage
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}