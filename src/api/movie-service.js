import axios from 'axios'

export class MovieService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.themoviedb.org/3/',
            authURL: `?api_key=${API_KEY}`,
            languageURL: `&language=en-US`,
        })
    }



    async getMovies(urlParams) {
        return
    }

    async getCast(movie_id) {
        return
    }

    async getActor(actor_id) {
        return
    }

    async getMovie(movie_id) {
        return
    }

    async getPerson
}