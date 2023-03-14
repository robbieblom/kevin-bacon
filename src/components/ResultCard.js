import { Avatar, Badge, Card, CardContent, Typography } from '@mui/material';
import { Box, Container, Stack, styled } from '@mui/system';
import React from 'react';

export const ResultCard = ({ actor, movie, collaborator }) => {
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 50,
        height: 50,
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    return (
        <>
            <Box >

                <Card sx={{ maxWidth: 220, }}>
                    <CardContent
                        style={{ padding: '10px' }}
                    >
                        <Stack direction='column' spacing={.5} justifyContent='center' alignItems='center'>
                            <Badge
                                overlap='rectangular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                badgeContent={
                                    <SmallAvatar src='./pitt-image.jpg' />
                                }
                            >
                                <Badge
                                    overlap='rectangular'
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <SmallAvatar src='./hill-image.jpg' />
                                    }
                                >
                                    <Avatar src='./moneyball-image.jpg' variant='rounded' sx={{ height: 150, width: 150 }} />
                                </Badge>
                            </Badge>
                        </Stack>

                        <Container style={{ padding: '30px 0px 0px 0px' }}>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>{actor.name}</span> collaborated with
                                <span style={{ fontWeight: 'bold' }}> {collaborator.name}</span> in the movie
                                <span style={{ fontWeight: 'bold' }}> {movie.original_title}</span>
                            </Typography>
                        </Container>
                    </CardContent>

                </Card>

            </Box>
        </>
    )
}



