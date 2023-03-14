import { Autocomplete, Button, Paper, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import React from 'react'
import { shallow } from 'zustand/shallow'
import { useAppStore } from "../stores/AppStore"

export const HomePage = () => {
    const [setLoading, setSearched] = useAppStore((state) => [state.setLoading, state.setSearched], shallow)

    const handleSubmit = () => {
        setLoading(true)
        // do logic
        setTimeout(() => {
            setLoading(false)
            setSearched(true)
        }, 3000)
    }

    const getActorOptions = () => {
        return [
            { label: "Brad Pit" },
            { label: "Julia Roberts" },
            { label: "Tom Hanks" }
        ]
    }

    const getCollaboratorOptions = () => {
        return [
            { label: "Brad Pit" },
            { label: "Julia Roberts" },
            { label: "Tom Hanks" }
        ]
    }

    return (
        <Box sx={{ padding: '25px 50px' }}>
            <Box className='title'>
                <Typography variant='h1' sx={{ fontWeight: "bold", color: "white" }}>
                    Actor Connections
                </Typography>
                <Typography sx={{ lineHeight: 2.3, fontWeight: "bold", color: "white", mt: "10px" }}>
                    Enter two actors to see if they're connected through the movies they've made.
                    <br />
                    We'll check up to two degrees of separation based on who they've worked with.
                </Typography>
            </Box>

            <Paper variant="outlined" sx={{ width: '430px', mt: '50px', backgroundColor: 'rgba(255,255,255,.6)' }}>
                <Stack className='form' spacing={2} sx={{ padding: '40px' }}>
                    <Autocomplete
                        sx={{ width: '350px', color: 'white' }}
                        options={getActorOptions()}
                        renderInput={(params) => (
                            <TextField
                                label="Actor Name"
                                {...params}

                            />
                        )}
                    />

                    <Autocomplete
                        options={getCollaboratorOptions()}
                        sx={{ width: '350px' }}
                        renderInput={(params) => (
                            <TextField
                                label="Collaborator Name"
                                {...params}

                            />
                        )}
                    />

                    <Button
                        sx={{ width: '175px' }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </Stack>
            </Paper>

        </Box>
    )
}

