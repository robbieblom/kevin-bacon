
const API_KEY = process.env.API_KEY

export const isConnectedToActor = async (source_actor, target_actor, degree = 1, connectionPath = []) => {
    const source_movies = await getMovies(source_actor) // [movie_id, movide_id, ...]
    if (degree == 1) {
        for (let movie of source_movies) {
            const cast = await getCast(movie) // [actor_id, actor_id, ...]
            for (let cast_member of cast) {
                if (cast_member == target_actor) {
                    connectionPath = [...connectionPath, [movie, cast_member]]
                    return [true, connectionPath]
                }
            }
        }
        return [false, []]
    } else {
        for (let movie of source_movies) {
            const cast = await getCast(movie) // [actor_id, actor_id, ...]
            for (let cast_member of cast) {
                connectionPath = [...connectionPath, [movie, cast_member]]
                return await isConnectedToActor(cast_member, target_actor, degree = degree - 1, connectionPath = connectionPath)
            }
        }
    }
}

export const getMovies = async (actor_id) => {
    console.log(`Finding movies for actor ${actor_id}`)
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const url = `https://api.themoviedb.org/3/person/${actor_id}/movie_credits?api_key=${API_KEY}&language=en-US`
            const response = await fetch(url).catch(error => console.log(error))
            const castedMovies = await response.json()
            resolve(castedMovies.cast.map(cm => cm.id))
        }, 500)
    })
}


export const getCast = async (movie_id) => {
    console.log(`Finding cast for movie ${movie_id}`)
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
            const response = await fetch(url).catch(error => console.log(error))
            const castMembers = await response.json()
            resolve(castMembers.cast.map(cm => cm.id))
        }, 500)
    })
}


export const getActor = async (actor_id) => {
    console.log(`Finding actor for actor id ${actor_id}`)
    const url = `https://api.themoviedb.org/3/person/${actor_id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url).catch(error => console.log(error))
    return await response.json()
}


export const getMovie = async (movie_id) => {
    console.log(`Finding movie for movie id ${movie_id}`)
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(url).catch(error => console.log(error))
    return await response.json()
}


export const getActorId = async (actor_name) => {
    console.log(`Finding actor id for actor named ${actor_name}`)
    const url = `http://api.tmdb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(actor_name)}`
    const response = await fetch(url).catch(error => console.log(error))
    const responseJSON = await response.json()
    const actors = responseJSON.results.filter(x => x.known_for_department == 'Acting')
    const mostPopularActorWithName = actors.reduce((a1, a2) => a2.popularity > a1.popularity ? a2 : a1)
    return mostPopularActorWithName.id
}


export const formatConnectionPath = async (connectionPath) => {
    const [movie_id, actor_id] = connectionPath
    const movie = await getMovie(movie_id)
    const actor = await getActor(actor_id)
    const formattedConnectionPath = [movie.title, actor.name]
    return formattedConnectionPath
}

