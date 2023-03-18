import { Graph } from '@dagrejs/graphlib';
import MovieService from '../api/movie-service';

export class KevinBaconAlgorithm {
    constructor(sourceActor, targetActor) {
        this.source_actor = sourceActor
        this.target_actor = targetActor
    }

    async run() {
        const connectionPath = await this.isConnectedToActor(this.source_actor, this.target_actor,)
        const formattedConnectionPath = await this.formatConnectionPath(connectionPath)
        return formattedConnectionPath
    }

    async isConnectedToActor(source_actor, target_actor, maxDegree = 2) {
        const tree = new Graph({ directed: true, compound: true, multigraph: false });
        tree.setNode(source_actor)

        for (let degree = 1; degree <= maxDegree; degree++) {
            const matchFound = await this.checkLayer(tree)
            if (matchFound) {
                const path = this.getPathToRoot(tree, target_actor)
                return path
            }
        }

        return []
    }

    async checkLayer(tree) {
        for (let actorLeaf of tree.sinks()) {
            const movies = await this.getMoviesForActor(actorLeaf)
            for (let movie of movies) {
                tree.setNode(movie)
                tree.setEdge(actorLeaf, movie)
                const cast = await this.getCastForMovie(movie)
                for (let cast_member of cast) {
                    if (cast_member != this.source_actor) {
                        tree.setNode(cast_member)
                        tree.setEdge(movie, cast_member)
                    }
                    if (cast_member == this.target_actor) {
                        return true
                    }
                }
            }
        }
        return false
    }

    getPathToRoot(tree, leaf, cumPath = [leaf.toString()]) {
        const path = tree.predecessors(leaf)
        if (path.length == 0) {
            return cumPath
        } else {
            cumPath = [path[0], ...cumPath]
            return this.getPathToRoot(tree, path[0], cumPath)
        }
    }


    async getMoviesForActor(actor_id) {
        console.log(`Finding movies for actor ${actor_id}`)
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const castedMovies = await MovieService.getMoviesForActor(actor_id)
                resolve(castedMovies.map(cm => cm.id))
            }, 500)
        })
    }

    async getCastForMovie(movie_id) {
        console.log(`Finding cast for movie ${movie_id}`)
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const castMembers = await MovieService.getCastForMovie(movie_id)
                resolve(castMembers.map(cm => cm.id))
            }, 500)
        })
    }

    async formatConnectionPath(connectionPath) {
        const formatted = Promise.all(connectionPath.map(async (node, index) => {
            if (index % 2 == 0) {
                return await MovieService.getActorById(node)
            } else {
                return await MovieService.getMovieById(node)
            }
        }))
        return formatted
    }

}

