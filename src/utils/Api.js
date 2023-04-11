import axios from "axios";

// Entrez votre clé api ici 
const apiKey = 'Psyduck_J5O9K';

export default axios.create({
    baseURL: "http://apiex.loc/",
    headers: {
        Authorization: "api_key " + apiKey,
    }
})