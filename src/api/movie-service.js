import axios from 'axios'

const API_KEY = process.env.API_KEY

class MovieService {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.themoviedb.org/3/',
        })
    }

    async getMoviesForActor(actor_id) {
        try {
            const path = `/person/${actor_id}/movie_credits?api_key=${API_KEY}&language=en-US`
            const { data } = await this.instance.get(path)
            return data?.cast
        } catch (error) {
            console.log(error)
        }
    }

    async getCastForMovie(movie_id) {
        try {
            const path = `/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
            const { data } = await this.instance.get(path)
            return data?.cast
        } catch (error) {
            console.log(error)
        }
    }

    async getActorById(actor_id) {
        try {
            const path = `/person/${actor_id}?api_key=${API_KEY}&language=en-US`
            const { data } = await this.instance.get(path)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async getActorByName(actor_name) {
        try {
            const path = `/search/person?api_key=${API_KEY}&query=${encodeURIComponent(actor_name)}`
            const { data } = await this.instance.get(path)
            const actors = data.results.filter(x => x.known_for_department == 'Acting')
            return actors
        } catch (error) {
            console.log(error)
        }
    }

    async getMovieById(movie_id) {
        try {
            const path = `/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
            const { data } = await this.instance.get(path)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    getPosterImageURL(profile_path) {
        const posterImageBaseURL = 'https://image.tmdb.org/t/p/original'
        return posterImageBaseURL + profile_path
    }

}

export default new MovieService()