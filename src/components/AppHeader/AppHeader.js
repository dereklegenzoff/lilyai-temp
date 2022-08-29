import React from 'react';
import { AppBar, Grid, Typography, Toolbar, Box, IconButton, Button } from '@mui/material';
import AppHeaderStyles from './AppHeaderClass';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

export const AppHeader = (props) => {
    const classes = AppHeaderStyles();
    const location = useLocation();
    const { pathname } = location;
    return (
        <Box width="100vw">
            <AppBar position="sticky" className={pathname === '/' ? classes.appbar : classes.appbarWhite}>
                <Toolbar>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1.5} my={1} ml={1}>
                        <Grid item sx={{ display: { md: 'none', sm: 'flex' } }} sm={1} xs={1}>
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item lg={2} md={4} sm={5} xs={11}>
                            <Link to="/">
                                <Box component="img" src="/images/terra.svg" alt="Terra" />
                            </Link>
                        </Grid>

                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            lg={8}
                            md={4}
                            sx={{ display: { sm: 'none', xs: 'none', md: 'flex' } }}
                            spacing={5}
                        >
                            <Grid item lg={2} md={4}>
                                <Link to="/">
                                    <Typography className={classes.links}>About</Typography>
                                </Link>
                            </Grid>
                            <Grid item lg={2} md={4}>
                                <Link to="/">
                                    <Typography className={classes.links}>Clothing</Typography>
                                </Link>
                            </Grid>
                            <Grid item lg={2} md={4}>
                                <a href="https://azure.microsoft.com/services/search/">
                                    <Typography className={classes.links}>Learn More</Typography>
                                </a>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            lg={2}
                            md={4}
                            sm={6}
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <Grid item>
                                <IconButton aria-label="Log in" className={pathname === '/' ? classes.whitebutton : classes.button}>
                                    <AccountCircleOutlinedIcon fontSize="large" />
                                </IconButton>
                            </Grid>

                            <Grid item>
                                <Link to="/Search">
                                    <Button
                                        variant="outlined"
                                        startIcon={<SearchOutlinedIcon />}
                                        size="large"
                                        className={pathname === '/' ? classes.whitebutton : classes.button}
                                    >
                                        Search
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppHeader;
