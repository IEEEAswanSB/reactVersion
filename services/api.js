import axios from "axios";

// const baseURL = process.env.API_DOMAIN + '/api/';

<<<<<<< HEAD
// const baseURL = "http://localhost:8081/api/"; //for development

// const baseURL = "http://10.171.240.166:8081/api/"; //for development

// const baseURL = "https://ieee.aswu.edu.eg/api/"; //for deployment

// get from env
const baseURL = import.meta.env.VITE_API_KEY;
=======
const baseURL = 'http://localhost:8081/api/'; //for development
// const baseURL = "https://ieee.aswu.edu.eg/api/"; //for deployment
// const baseURL = "http://10.171.240.197:8081/api/"; //for development
>>>>>>> 5b7546b1165aacf35ffbbfe593a3007180ac4709

export const api = axios.create({
  baseURL,
});
