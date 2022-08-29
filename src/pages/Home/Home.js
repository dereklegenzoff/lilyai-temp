import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBarHome';
import './Home.css';
import '../../pages/Search/Search.css';

export default function Home() {
    const history = useHistory();

    const navigateToSearchPage = (q) => {
        if (!q || q === '') {
            q = '*';
        }
        history.push('/search?q=' + q);
    };

    return (
        <>
            <Grid container style={{ display: 'flex', alignItems: 'center', height: '100%' }} pl={'10vw'} pt={'20vh'}>
                <Grid item lg={12} xs={0}>
                    <Box style={{ position: 'absolute' }} sx={{ right: 0, top: 0, width: '30vw', height: '100%', background: '#303030' }} />
                </Grid>
                <Grid item>
                    <Box
                        component={Avatar}
                        src="/images/shutterstock_1929512210.png"
                        style={{ position: 'absolute' }}
                        sx={{ right: '13vw', bottom: '15vh', width: '33vw', height: '66vh' }}
                    />
                </Grid>
                <Grid container item lg={5} md={5} sm={5} xs={4} direction="column" spacing={2}>
                    <Grid item>
                        <Typography
                            align="left"
                            variant="h1"
                            style={{
                                fontSize: '48px',
                                fontWeight: '800',
                                lineHeight: '52px',
                                letterSpacing: '-0.03em',
                                textAlign: 'start',
                            }}
                        >
                            Stock up on the top styles this summer.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            align="left"
                            variant="subtitle1"
                            style={{
                                fontSize: '20px',
                                fontWeight: '400',
                                lineHeight: '24.36px',
                                letterSpacing: '2%',
                                textAlign: 'left',
                            }}
                        >
                            From the perfect plus-one dress, to casual tops, to other summer staples and more, finding exactly what you're looking for
                            is a breeze.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SearchBar postSearchHandler={navigateToSearchPage}></SearchBar>
                    </Grid>
                    <Grid container item direction="row" alignItems="center" spacing={2}>
                        <Grid item>
                            <Box component={Avatar} src={'/images/Lily_AI_logo_320px.png'} variant="square" sx={{ width: 55, height: 31 }}></Box>
                        </Grid>
                        <Grid item>
                            <Box component={Avatar} src={'/images/microsoft-small.svg'} variant="square" sx={{ width: 31, height: 31 }}></Box>
                        </Grid>
                        <Grid item>
                            <Typography
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                }}
                            >
                                Powered by Azure Cognitive Search
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
