const axios = require('axios');

const BASE_URL = 'https://api.chucknorris.io/jokes/';

const headers = {
    accept: 'application/json'
}

export const factService = {
    getRandomFact,
    getFacts,
    getCategories
}

async function getRandomFact(filter = {}) {
    if (filter.category === 'all') filter = { name: filter.name };
    const res = await axios.get(`${BASE_URL}/random`, { headers, params: filter });
    return res.data;
}

async function getFacts(query = '') {
    const res = await axios.get(`${BASE_URL}/search`, { headers, params: { query } });
    return res.data;
}

async function getCategories() {
    const res = await axios.get(`${BASE_URL}/categories`, { headers });
    return res.data;
}