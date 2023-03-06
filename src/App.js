import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import { formatConnectionPath, isConnectedToActor } from "./utils/utils.js"

export const App = () => {

    const main = async () => {

        const KEVIN_BACON_IMDB_ID = 4724
        const source_actor_name = "Tom Hanks"

        const [connected, [connectionPath]] = await isConnectedToActor(287, 4724, 1)
        console.log('connectionPath-unformatted', connectionPath)
        console.log(await formatConnectionPath(connectionPath))

    }


    return (
        <>
            <Typography>
                Enter an Actor Name:
            </Typography>
            <TextField
                label="Actor Name"
                sx={{ 'mb': '20px' }}
            />

            <Typography>
                Select an Actor:
            </Typography>
            <div style={{ "height": '50px', }} />

            <FormControl>
                <FormLabel>How many degrees from Kevin Bacon?</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                </RadioGroup>
            </FormControl>
        </>
    )
    // const source_actor_id = getActorId(source_actor_name)

    // const [connected, connectionPath] = await isConnectedToActor(source_actor_id, KEVIN_BACON_IMDB_ID, degree=1)

    // if (connected) {
    //     console.log("This person worked with Kevin Bacon!")
    //     console.log(formatConnectionPath(connectionPath))
    // } else {
    //     console.log("This person didn't work with Kevin Bacon")
    // }

}
