import { Alert, Button } from "@mui/material"
import { Stack } from "@mui/system"
import React from 'react'
import { useAppStore } from "../stores/AppStore"

export const Error = () => {
    const setSearched = useAppStore((state) => state.setSearched)

    const handleNewSearch = () => {
        setSearched(false)
    }

    return (
        <>
            <Stack direction='column' spacing={4} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Alert severity="error"> There was an error with the search.  Please try again later.</Alert>
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
}




