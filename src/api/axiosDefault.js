import axios from "axios";

axios.defaults.baseURL = "https://globetrotters-17c2ffb8496e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
