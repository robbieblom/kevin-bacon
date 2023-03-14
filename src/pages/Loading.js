import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const Loading = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress color='secondary' size={150} />
            </Box>
        </>
    )
}



