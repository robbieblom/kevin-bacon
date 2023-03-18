import { useState } from 'react';
import { KevinBaconAlgorithm } from '../alg/KevinBaconAlgorithm';

export const useKevinBaconAlgorithm = (source_actor, target_actor) => {
    const [connectionDepth, setConnectionDepth] = useState(0)
    const [movieCount, setMovieCount] = useState(0)
    const algorithm = new KevinBaconAlgorithm(source_actor, target_actor)


}