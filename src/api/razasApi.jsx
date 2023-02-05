import axios from "axios";

export const razasApi = axios.create({
    baseURL: 'https://dog.ceo/api'
});
