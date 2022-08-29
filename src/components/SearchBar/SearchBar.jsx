import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import './SearchBar.css';

export default function SearchBar(props) {
    const CssTextField = styled(TextField)(props.customStyles);
    const [q, setQ] = useState(props.q);
    const [suggestions, setSuggestions] = useState([]);

    const onSearchHandler = () => {
        props.postSearchHandler(q);
    };

    const onEnterButton = (event) => {
        if (event.keyCode === 13) {
            onSearchHandler();
        }
    };

    const onChangeHandler = (event) => {
        const searchTerm = event.target.value;
        setQ(searchTerm);

        // use this prop if you want to make the search more reactive
        if (props.searchChangeHandler) {
            props.searchChangeHandler(searchTerm);
        }
    };

    useEffect(
        (_) => {
            const timer = setTimeout(() => {
                const body = {
                    q: q,
                    top: 5,
                    suggester: 'sg',
                };

                if (q === '') {
                    setSuggestions([]);
                } else {
                    axios
                        .post('/api/suggest', body)
                        .then((response) => {
                            setSuggestions(response.data.suggestions);
                        })
                        .catch((error) => {
                            console.log(error);
                            setSuggestions([]);
                        });
                }
            }, 300);
            return () => clearTimeout(timer);
            // eslint-disable-next-line
        },
        [q]
    );

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="space-around" spacing={3}>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <Typography
                        style={
                            props.blackText
                                ? {
                                      width: '166px',
                                      height: '47px',
                                      fontFamily: 'Proxima Nova',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                      fontSize: '20px',
                                      lineHeight: '24px',

                                      textTransform: 'capitalize',
                                      color: '#303030',
                                  }
                                : {
                                      width: '166px',
                                      height: '47px',
                                      fontFamily: 'Proxima Nova',
                                      fontStyle: 'normal',
                                      fontWeight: '700',
                                      fontSize: '20px',
                                      lineHeight: '24px',

                                      textTransform: 'capitalize',
                                      color: '#FFFFFF',
                                  }
                        }
                    >
                        Find Products
                    </Typography>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                    <Autocomplete
                        freeSolo
                        options={suggestions.map((option) => option.text)}
                        defaultValue={props.q}
                        renderInput={(params) => (
                            <CssTextField
                                onKeyDown={(e) => onEnterButton(e)}
                                {...params}
                                label={
                                    <Typography style={props.blackText ? { color: '#303030' } : { color: '#FFFFFF' }}>
                                        What Are you Looking For?
                                    </Typography>
                                }
                                onChange={onChangeHandler}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <button
                        type="submit"
                        onClick={onSearchHandler}
                        style={
                            props.blackText
                                ? {
                                      width: '136px',
                                      height: '57px',
                                      background: '#333333',
                                      borderRadius: '7px',
                                      fontFamily: 'Lato',
                                      fontStyle: 'normal',
                                      fontWeight: '800',
                                      fontSize: '18px',
                                      lineHeight: '22px',
                                      letterSpacing: '0.07em',
                                      color: '#FFFFFF',
                                  }
                                : {
                                      width: '136px',
                                      height: '57px',
                                      background: '#FFFFFF',
                                      borderRadius: '7px',
                                      fontFamily: 'Lato',
                                      fontStyle: 'normal',
                                      fontWeight: '800',
                                      fontSize: '18px',
                                      lineHeight: '22px',
                                      letterSpacing: '0.07em',
                                      color: '#303030',
                                  }
                        }
                    >
                        SEARCH
                    </button>
                </Grid>
            </Grid>
        </>
    );
}
