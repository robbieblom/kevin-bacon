import { isConnectedToActor, getMovies, getCast, getActor, getMovie, getActorId, formatConnectionPath } from "./utils.js"

const KEVIN_BACON_IMDB_ID = 4724
const source_actor_name = "Tom Hanks"

const [connected, [connectionPath]] = await isConnectedToActor(287, 4724, 1)
console.log('connectionPath-unformatted', connectionPath)
console.log(await formatConnectionPath(connectionPath))

// const source_actor_id = getActorId(source_actor_name)

// const [connected, connectionPath] = await isConnectedToActor(source_actor_id, KEVIN_BACON_IMDB_ID, degree=1)

// if (connected) {
//     console.log("This person worked with Kevin Bacon!")
//     console.log(formatConnectionPath(connectionPath))
// } else {
//     console.log("This person didn't work with Kevin Bacon")
// }


