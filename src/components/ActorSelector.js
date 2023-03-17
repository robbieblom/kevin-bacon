import { Autocomplete, Avatar, Grid, TextField, Typography } from "@mui/material";
import { debounce } from '@mui/material/utils';
import { Box } from "@mui/system";
import { useField } from 'Formik';
import React, { useEffect, useMemo, useState } from 'react';
import MovieService from '../api/movie-service';

export const ActorSelector = (props) => {
    const [field, meta, helpers] = useField(props)
    const [actorName, setActorName] = useState('');
    const [selectedActor, setSelectedActor] = useState(null)
    const [options, setOptions] = useState([]);

    const fetchActors = useMemo(
        () =>
            debounce(
                async (actor_name, callback) => {
                    MovieService.getActorByName(actor_name)
                        .then(callback)
                },
                400,
            ),
        [],
    );

    useEffect(() => {
        fetchActors(actorName, (results) => {
            setOptions([...results])
            console.log('rb', results)
        })
    }, [actorName, fetchActors]);

    const startAdornment =
        selectedActor ? (
            <Box sx={{ paddingRight: '10px' }}>
                <Avatar src={MovieService.getPosterImageURL(selectedActor.profile_path)} />
            </Box >
        ) : null

    return (
        <>
            <Autocomplete
                {...props}
                options={options}
                filterOptions={(x) => x.filter(o => o.profile_path)}
                getOptionLabel={(option) => {
                    const label = typeof option === 'string' ? option : option.name//`${option.name} (${option.id})`
                    return label
                }}
                noOptionsText="No Actors"
                value={actorName}
                onChange={(e, value) => {
                    setActorName(value ? value.name : '')
                    setSelectedActor(value)
                    helpers.setValue(value ? value.name : '')
                    props.onChange(value)
                }}
                onInputChange={(e, value) => {
                    setActorName(value)
                }}
                onBlur={field.onBlur}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label ? props.label : ''}
                        error={meta.touched && meta.error}
                        helperText={meta.touched ? meta.error : ''}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: startAdornment
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item sx={{ display: 'flex', width: 54 }}>
                                    <Avatar src={MovieService.getPosterImageURL(option.profile_path)} />
                                </Grid>
                                <Grid item sx={{ width: 'calc(100% - 54px)', wordWrap: 'break-word' }}>
                                    <Typography>
                                        {option.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </>
    )
}





