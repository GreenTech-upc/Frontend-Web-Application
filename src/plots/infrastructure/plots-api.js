import axios from 'axios';

export class PlotsApi {
  #http;

  constructor(baseURL = import.meta.env.VITE_SKYCROP_API_URL) {
    this.#http = axios.create({baseURL});
  }

  getAll() {
    return this.#http.get('/plots');
  }

  getById(id) {
    return this.#http.get(`/plots/${encodeURIComponent(id)}`);
  }

  create(resource) {
    return this.#http.post('/plots', resource);
  }
}
