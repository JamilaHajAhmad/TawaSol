import axios from "axios";

const serverURL = "http://localhost:4001";

export const api = axios.create({
    baseURL: serverURL,
    headers: {
        "Content-Type": "application/json",
    },
});