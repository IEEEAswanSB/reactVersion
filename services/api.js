import axios from "axios";

// const baseURL = process.env.API_DOMAIN + '/api/';

// const baseURL = "http://localhost:8081/api/"; //for development
const baseURL = "https://ieee.aswu.edu.eg/api/"; //for deployment

// const baseURL = "http://10.171.240.166:8081/api/"; //for development

export const api = axios.create({
  baseURL,
});
