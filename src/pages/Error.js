import { Alert } from "@mui/material"
import { Stack } from "@mui/system"
import React from 'react'

export const Error = () => {

    return (
        <>
            <Stack direction='column' spacing={4} sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Alert severity="error"> There was an error.  Please try again later.</Alert>
            </Stack>
        </>
    )
}




