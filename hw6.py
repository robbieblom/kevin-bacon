#Robert Blom
#903261321

import requests
from bs4 import BeautifulSoup
import re
import json
import time
import csv

API_KEY = None

def scrape_all_movies(url):
    """Uses the requests and beautifulsoup modules to extract the movie names and urls from
    an actor's IMDb webpage. Returns a dictionary of all of the
    extracted movies. The keys are the movie titles, and the values
    are the corresponding urls (in string form) to that movie. The dictionary
    includes all types of filmography the given actor acted in. This can include
    TV shows, shorts, TV movies, and documentaries. It does not return filmography
    in which the person is credited only with a role other than actor (director, writer, etc).

    Parameters:
    url: str -- the url for the imdb page of your chosen actor

    Return:
    all_movies: dict --
         where all_movies = {
                movie_name1: movie_url1,
                movie_name2: movie_url2,
                ...
                }
             and movie_name: str -- the name of a Kevin Bacon movie
             and movie_url: str -- the url address for that movie's page

    Usage Examples (note: not a complete test of all dictionary contents):
    >>> imdb_movies = scrape_all_movies('http://www.imdb.com/name/nm0000102/')
    >>> 'Apollo 13' in imdb_movies
    True
    >>> 'http://www.imdb.com/title/tt0327056' in [url[:35] for url in imdb_movies.values()]
    True
    >>> 'Captain America' in imdb_movies
    False
    """
    domMatch = re.search(r"http:\/\/www\..+\.com", url)
    domain = domMatch.group()
    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")
    finalDict = {}
    for i, each in enumerate(doc.find_all("b")):
        if i == 0:
            continue
        m = re.search(r"\/title\/tt[0-9]{7}\/\?ref_=nm_flmg_act_[0-9]+", each.a["href"])
        if m:
            finalDict.update({each.a.string: domain + each.a["href"]})
    return finalDict

def lookup_actor_name_by_id(actor_id):
    """Returns an actor's name by taking in the actor's actor_id using the
    themoviedb.org's API and the requests module and the json module.

    Parameters:
    actor_id: int -- the themoviedb.org ID number of an actor

    Return:
    actor_name: str -- the name of the actor associated with the ID

    Usage Examples:
    >>> lookup_actor_name_by_id(4724)
    'Kevin Bacon'
    >>> lookup_actor_name_by_id(2963)
    'Nicolas Cage'
    """

    url = "https://api.themoviedb.org/3/person/{}?api_key={}&language=en-US".format(actor_id, API_KEY)
    response = requests.get(url)
    infoDict = json.loads(response.text)
    name = infoDict["name"]
    return name

def req_movies_for_actor(actor_id):
   """Looks up all the movies in which an actor with actor_id has been casted.
    Returns the movies as a nested dictionary with the movie_id as the key, and
    the name of the movie and the actor's ID as values in the nested dictionary.

    Parameters:
    actor_id: int -- the themoviedb.org ID number of an actor

    Return:
    movie_dict: dict --
        where movie_dict ={
            movie_id1: {
              "name": movie_name1,
              "parent": actor_id1
            },
            movie_id2: {...},
            ...
            }
        and movie_id: int -- the themoviedb.org ID number of the movie
        and movie_name: str -- the name of the movie for the given ID

    Usage Examples:
    >>> movies = req_movies_for_actor(4724)
    >>> "Tremors" in [movie["name"] for movie in movies.values()]
    True
    >>> "Titanic" in [movie["name"] for movie in movies.values()]
    False
    >>> 4724 in [movie["parent"] for movie in movies.values()]
    True
    >>> 2963 in [movie["parent"] for movie in movies.values()]
    False
    """
   url = "https://api.themoviedb.org/3/person/{}/movie_credits?api_key={}&language=en-US".format(actor_id, API_KEY)
   response = requests.get(url)
   movieDict = json.loads(response.text)
   del movieDict["crew"]
   movie_dict = {}
   for mydict in movieDict["cast"]:
        movie_dict.update({int(mydict["id"]):{"name": mydict["title"], "parent": int(actor_id)}})
   return movie_dict

def req_actors_for_movie(movie_id):
    """Looks up all the cast members in the movie with movie_id. Returns the
    cast as a nested dictionary with the cacst_id as the key, and the name of
    the cast member and the movie's ID as values in the nested dictionary.

    Parameters:
    movie_id: int -- the themoviedb.org ID number of a movie

    Return:
    cast_dict = dict --
        where cast_dict = {
            cast_id1: {
                "name": cast_name1,
                "parent": movie_id1
            },
            cast_id2: {...},
            ...
            }
        and cast_id: int -- the themoviedb.org ID number of an actor
        and cast_name: str -- the name of the cast member for the given ID

    Usage Examples:
    >>> cast_members = req_actors_for_movie(9362)
    >>> 'Kevin Bacon' in [cast["name"] for cast in cast_members.values()]
    True
    >>> 'Nicolas Cage' in [cast["name"] for cast in cast_members.values()]
    False
    >>> 9362 in [cast["parent"] for cast in cast_members.values()]
    True
    >>> 597 in [cast["parent"] for cast in cast_members.values()]
    False
    """
    url = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}".format(movie_id, API_KEY)
    response = requests.get(url)
    castDict = json.loads(response.text)
    cast_dict = {}
    for myDict in castDict["cast"]:
        cast_dict.update({int(myDict["id"]):{"name":myDict["name"], "parent": int(movie_id)}})
    return cast_dict

def one_deg_from_actor(from_actor_id):
    """Looks up all the co-stars for an actor with from_actor_id. Returns a
    tuple with a nested dictionary of all the movies by id with their names and
    parent actor (as in req_movies_for_actor) and a nested dictionary of all the
    costars by id with their names and parent movie (as in
    req_actors_for_movie), excluding the from_actor_id themselves.
    Also, puts a delay before each request so that the script doesn't get an
    undesirable response from the API.

    Parameters:
    movie_id: int -- the themoviedb.org ID number of a movie

    Return:
    (movies, costars): tuple --
        where movies = {
            movie_id1:{
                "name": movie_name1,
                "parent": from_actor_id},
            movie_id2: {...},
            ...
            }
        and costars = {
            costar_id1:{
                "name": costar_name1,
                "parent": movie_id1},
            costar_id2: {...},
            ...
            }

    Usage Examples:
    >>> start_time = time.time()
    >>> bacon_movies, bacon_costars = one_deg_from_actor(4724) # this should take less than 60 secs
    >>> end_time = time.time() - start_time
    >>> end_time < 60
    True
    >>> len(bacon_movies)
    72
    >>> len(bacon_costars)
    1031
    >>> bacon_costars.get(4724, None) == None
    True
    """
    movies = req_movies_for_actor(from_actor_id)

    costars = {}
    for movieID in movies:
        actorsInMovie = req_actors_for_movie(movieID)
        time.sleep(.15)
        del actorsInMovie[from_actor_id]
        costars.update(actorsInMovie)
    return (movies, costars)


def main(args):
    """Plays One Degree from Kevin Bacon or One Degree from a given actor if
    arguments are supplied.

    Parameters:
    1st argument supplied (optional): actor id from themoviedb.org
    2nd argument supplied (optional): file name where actor name, movie, and costar is documented

    Output:
    -Returns None
    -If no arguments are supplied then the game defaults to One Degree from Kevin Bacon
      and results are printed to the console
    -If one argument is supplied then we play One Degree from the given actor and
      results are printed to the console
    -If two arguments are supplied then we play One Degree from the given actor and
      results are written the the file in the second argument
    -Results are always of form: actor name, movie, and costar.  ">" is used as
      the delimiter when printed to the console and "," is used as the delimiter
      when written to a file
    """

    if len(args) == 1:
        ans = input("No actor chosen. Do you want to play One Degree from Kevin Bacon? ")
        if ans.lower() == "no":
            print("Ok then.  See you later.")
            return
        elif ans.lower() == "yes":
            #run the program using Kevin Bacon’s ID and print the output to console
            print("If testing for Kevin Bacon, this should take less than 60 seconds")
            actorName = lookup_actor_name_by_id(4724) #This is Kevin Bacon
            movies, costars = one_deg_from_actor(4724)
            for movieID in movies:
                movieName = movies[movieID]["name"]
                for costar in costars:
                    if costars[costar]["parent"] == movieID:
                        print(actorName, ">", movieName, ">", costars[costar]["name"])
        else:
            print("Not a valid answer")

    else:
        if len(args) == 2:
            try:
                lookup_actor_name_by_id(int(args[1]))
            except:
                if re.match(r"[0-9]+", args[1]):
                    print("That actor does not exist")
                else:
                    print("Invalid actor ID")
                return

            print("If testing for Kevin Bacon, this should take less than 60 seconds")
            actorName = lookup_actor_name_by_id(int(args[1]))
            movies, costars = one_deg_from_actor(int(args[1]))
            for movieID in movies:
                movieName = movies[movieID]["name"]
                for costar in costars:
                    if costars[costar]["parent"] == movieID:
                        print(actorName, ">", movieName, ">", costars[costar]["name"])
        else:
            if re.match(r"[0-9, A-z]+\.csv", args[2]):
                try:
                    lookup_actor_name_by_id(int(args[1]))
                except:
                    if re.match(r"[0-9]+", args[1]):
                        print("That actor does not exist")
                    else:
                        print("Invalid actor ID")
                    return

                print("If testing for Kevin Bacon, this should take less than 60 seconds")
                fout = open(args[2], "w")
                csvout = csv.writer(fout)

                actorName = lookup_actor_name_by_id(int(args[1]))
                movies, costars = one_deg_from_actor(int(args[1]))
                print("Writing data to {}... ".format(args[2]), end = "")
                for movieID in movies:
                    movieName = movies[movieID]["name"]
                    for costar in costars:
                        if costars[costar]["parent"] == movieID:
                            csvout.writerow([actorName, movieName, costars[costar]["name"]])
                print("done")
                fout.close()

            else:
                if re.match(r"[0-9, A-z]+", args[2]):
                    print("File name must have a '.csv' extension")
                else:
                    print("File name must be composed of numbers and letters")


start_time = time.time()
if __name__ == "__main__":
    import sys
    main(sys.argv)
    end_time = time.time() - start_time
    print("Took {:.1f} seconds".format(end_time))

