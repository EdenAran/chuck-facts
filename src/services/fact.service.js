const axios = require('axios');

const BASE_URL = 'https://api.chucknorris.io/jokes/';
const headers = {
    accept: 'application/json'
}

var gCategories = JSON.parse(localStorage.getItem('categories'))

export const factService = {
    getRandomFact,
    getFacts,
    getCategories
}


async function getRandomFact(filter = {}) {
    if (filter.category === 'all') filter = { name: filter.name }
    const res = await axios.get(`${BASE_URL}/random`, { headers, params: filter });
    return res.data;
}

async function getFacts(query = '') {
    const res = await axios.get(`${BASE_URL}/search`, { headers, params: { query } });
    return res.data;
}

async function getCategories() {
    if (gCategories) return gCategories
    const res = await axios.get(`${BASE_URL}/categories`, { headers });
    localStorage.setItem('categories', JSON.stringify(res.data));
    return res.data;
}