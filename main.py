import time
from utils import *

KEVIN_BACON_IMDB_ID = 4724

def main(args):
    source_actor_name = input("Give me an actor name ")
    source_actor_id = getActorId(source_actor_name)

    connected, connectionPath = isConnectedToActor(source_actor_id, KEVIN_BACON_IMDB_ID, degree=1)

    if (connected):
        print("This person worked with Kevin Bacon!")
        print(formatConnectionPath(connectionPath))
    else:
        print("This person didn't work with Kevin Bacon")



start_time = time.time()
if __name__ == "__main__":
    import sys
    main(sys.argv)
    end_time = time.time() - start_time
    print("Took {:.1f} seconds".format(end_time))
