import axios from 'axios';

const movieDB = axios.create({
    baseURL:'http://localhost:8762/ms-inventory-movies',
})

export default movieDB;