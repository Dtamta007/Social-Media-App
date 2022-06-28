import axios from 'axios';

export const axiosInstance = axios.create({
    baseUrl: 'https://dtamtasocialmedia.herokuapp.com/api/'
})