import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { shallow } from "zustand/shallow"
import { ResultCard } from '../components/ResultCard'
import { useAppStore } from "../stores/AppStore"

export const Results = () => {
    const [sourceActor, targetActor] = useAppStore((state) => [state.sourceActor, state.targetActor], shallow)
    const results = useAppStore(state => state.results)
    const setSearched = useAppStore((state) => state.setSearched)

    const handleNewSearch = () => {
        setSearched(false)
    }

    const hasResultsView = (
        <>
            <Stack direction='column' spacing={0} sx={{ boxSizing: 'border-box', padding: '55px 50px', height: '100%', justifyContent: 'space-between' }}>
                <Stack className='summary' direction='row'>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'white' }}>
                        {sourceActor.name} and {targetActor.name} are connected!
                    </Typography>
                </Stack>

                <Stack
                    direction='row'
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                    spacing={8}
                >
                    {usedResults.map(connection => (
                        <ResultCard
                            key={`${connection[0].id}${connection[1].id}${connection[2].id}`}
                            actor={connection[0]}
                            movie={connection[1]}
                            collaborator={connection[2]} />
                    ))}
                </Stack>

                <Stack direction='row' sx={{ justifyContent: 'right' }}>
                    <Button
                        variant="contained"
                        sx={{ width: '175px' }}
                        onClick={handleNewSearch}
                    >
                        Back to Search
                    </Button>
                </Stack>

            </Stack>

        </>
    )

    const noResultsView = (
        <>
            <Stack direction='column' spacing={4} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'white' }}>
                    {sourceActor.name} and {targetActor.name} are not connected.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ width: '175px' }}
                    onClick={handleNewSearch}
                >
                    Back to Search
                </Button>
            </Stack>
        </>
    )

    if (results.length > 0) {
        return hasResultsView
    } else {
        return noResultsView
    }

}


