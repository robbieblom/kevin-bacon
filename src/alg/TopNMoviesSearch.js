import MovieService from "../api/movie-service";

export class TopNMoviesSearch {
  constructor(sourceActor, targetActor, movieCallback = (movie) => {}) {
    this.source_actor = sourceActor;
    this.target_actor = targetActor;
    this.n = 20;
    this.movie_callback = movieCallback;
  }

  async run() {
    const moviesWithTarget = await this.searchTopNMovies();
    return moviesWithTarget;
  }

  async searchTopNMovies() {
    const moviesWithTarget = [];

    const topNMovies = await this.getTopNMoviesForActor(this.source_actor);
    for (let movie of topNMovies) {
      this.movie_callback(movie);

      const cast = await this.getCastForMovie(movie.id);
      for (let cast_member of cast) {
        if (cast_member.id == this.target_actor) {
          moviesWithTarget.push({
            movieDetails: movie,
            targetAsCastMember: cast_member,
          });
        }
      }
    }

    return moviesWithTarget;
  }

  async getTopNMoviesForActor(actor_id) {
    console.log(`Finding movies for actor ${actor_id}`);
    const castedMovies = await MovieService.getMoviesForActor(actor_id);
    const topNMoviesByPopularity = this.getTopNByPopularity(
      castedMovies,
      this.n
    );
    return topNMoviesByPopularity;
  }

  getTopNByPopularity(castedMovies, n) {
    castedMovies.sort((a, b) => a.popularity - b.popularity);
    castedMovies.reverse();
    const deepCopiedMovies = castedMovies.map((m) => m);
    return deepCopiedMovies.slice(0, n);
  }

  async getCastForMovie(movie_id) {
    console.log(`Finding cast for movie ${movie_id}`);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const castMembers = await MovieService.getCastForMovie(movie_id);
        resolve(castMembers);
      }, 250);
    });
  }
}
