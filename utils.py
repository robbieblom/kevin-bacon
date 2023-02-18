import requests
import json
import time
import os
import urllib.parse
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')


def isConnectedToActor(source_actor, target_actor, degree=1, connectionPath=[]):
    source_movies = getMovies(source_actor) # [movie_id, movie_id, ...]
    if(degree == 1):
        for movie in source_movies:
            cast = getCast(movie) # [actor_id, actor_id, ...] 
            for cast_member in cast:
                if(cast_member == target_actor): 
                    connectionPath.append((movie, cast_member))
                    return [True, connectionPath]
        return [False, []]
        
    else:
        for movie in source_movies:
            cast = getCast(movie) # [actor_id, actor_id, ...]
            for cast_member in cast:
                connectionPath.append((movie, cast_member))
                return isConnectedToActor(cast_member, target_actor, degree=degree-1, connectionPath=connectionPath)



def getMovies(actor_id):
    print('Finding movies for actor ', actor_id)
    time.sleep(.05)
    url = "https://api.themoviedb.org/3/person/{}/movie_credits?api_key={}&language=en-US".format(actor_id, API_KEY)
    response = requests.get(url)
    movies = [ castedMovie['id'] for castedMovie in json.loads(response.text)['cast'] ]
    return movies


def getCast(movie_id):
    print('Finding cast for movie ', movie_id)
    time.sleep(.05)
    url = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}".format(movie_id, API_KEY)
    response = requests.get(url)
    cast = [ castMember['id'] for castMember in json.loads(response.text)['cast'] ]
    return cast


def getActor(actor_id):
    print('Finding actor for actor id ', actor_id)
    url = "https://api.themoviedb.org/3/person/{}?api_key={}&language=en-US".format(actor_id, API_KEY)
    response = requests.get(url)
    return json.loads(response.text)


def getMovie(movie_id):
    print('Finding movie for movie id ', movie_id)
    url = "https://api.themoviedb.org/3/movie/{}/api_key={}&language=en-US".format(movie_id, API_KEY)
    response = requests.get(url)
    return json.loads(response.text)


def getActorId(actor_name):
    print('Finding actor id for actor named', actor_name)
    url = "http://api.tmdb.org/3/search/person?api_key={}&query={}".format(urllib.parse.quote(actor_name), API_KEY)
    response = requests.get(url)
    actors = list(filter(json.loads(response.text)['results']), lambda x: x['known_for_department']=='Acting')
    mostPopularActorWithName = max(actors, key=lambda x: x["popularity"])
    return mostPopularActorWithName['id']


def formatConnectionPath(connectionPath):
    formattedConnectionPath = []
    for connection in connectionPath:
        movie_id, actor_id = connection
        movie = getMovie(movie_id)
        actor = getActor(actor_id)
        formattedConnectionPath.append(movie["title"], actor["name"])

