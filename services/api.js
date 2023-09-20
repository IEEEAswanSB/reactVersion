import axios from "axios";

// const baseURL = process.env.API_DOMAIN + '/api/';

// const baseURL = 'http://localhost:8080/api/'; //for development
const baseURL = "https://ieee.aswu.edu.eg/api/"; //for deployment

export const api = axios.create({
  baseURL,
});
