
import axios from 'axios';

export class CropsApi {
    #http;

    constructor(baseURL = import.meta.env.VITE_SKYCROP_API_URL) {
        this.#http = axios.create({baseURL});
    }

    getAll() {
        return this.#http.get('/crops');
    }

    getById(id) {
        return this.#http.get(`/crops/${encodeURIComponent(id)}`);
    }

    create(resource) {
        return this.#http.post('/crops', resource);
    }
}
