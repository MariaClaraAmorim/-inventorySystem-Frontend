import axios from "axios";

export const api = axios.create({
  baseURL: "https://inventorysystem-backend.onrender.com/",
});
