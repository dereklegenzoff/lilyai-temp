import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import Suggestions from './Suggestions/Suggestions';
import './SearchBar.css';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#303030',
    },
    '& .MuiFilledInput-root': {
        color: '#303030',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#626262',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#626262',
        },
        '&:hover fieldset': {
            borderColor: '#626262',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#626262',
        },
    },
    '& .MuiInputBase-input': {
        color: '#303030',
    },
});

export default function SearchBar(props) {
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
        },
        [q]
    );

    return (
        <>
            <Grid container className="input-group" onKeyDown={(e) => onEnterButton(e)} spacing={3}>
                <Grid item lg={8} md={12} xs={12}>
                    <Autocomplete
                        freeSolo
                        options={suggestions.map((option) => option.text)}
                        defaultValue={props.q}
                        renderInput={(params) => (
                            <CssTextField
                                {...params}
                                label={<Typography style={{ color: '#303030' }}>What Are you Looking For?</Typography>}
                                onChange={onChangeHandler}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                    <Button className="terra-button" type="submit" onClick={onSearchHandler}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
