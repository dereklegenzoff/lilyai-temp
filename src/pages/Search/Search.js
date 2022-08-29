import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Grid, Typography, Divider } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';

import Results from '../../components/Results/Results';
import Pager from '../../components/Pager/Pager';
import Facets from '../../components/Facets/Facets';
import SearchBar from '../../components/SearchBar/SearchBar';

import { useSearch } from '../../contexts/SearchContext';

import './Search.css';
import SearchToggle from '../../components/SearchToggle/SearchToggle';
import LilyAIToggle from '../../components/LilyAIToggle/LilyAIToggle';

export default function Search() {
    // eslint-disable-next-line
    const { isSemantic, setIsSemantic, searchQueryLanguage, setSearchQueryLanguage, isLilyAI, setIsLilyAI } = useSearch();

    const location = useLocation();
    const history = useHistory();

    const [results, setResults] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [q, setQ] = useState(new URLSearchParams(location.search).get('q') ?? '*');
    const [top] = useState(new URLSearchParams(location.search).get('top') ?? 16);
    const [skip, setSkip] = useState(new URLSearchParams(location.search).get('skip') ?? 0);
    const [filters, setFilters] = useState([]);
    const [facets, setFacets] = useState({});
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [backgroundStyle, setBackgroundStyle] = useState({ background: '#333333', color: '#FFFFFF' });
    const [customStyles, setCustomStyles] = useState({ background: '#333333', color: '#FFFFFF' });

    const [blackText, setBlackText] = useState(false);

    const isFirstRender = useRef(true);
    const oldQ = useRef('');
    const oldLilySetting = useRef('');
    //let oldQ = "";

    useEffect(() => {
        const executeSearch = () => {
            setIsLoading(true);
            const body = {
                q: q,
                top: top,
                skip: skip,
                filters: filters,
                isSemantic: isSemantic,
                isLilyAI: isLilyAI,
                //searchQueryLanguage : searchQueryLanguage ? "en-GB" : "en-US"
                searchQueryLanguage: 'en-US',
            };

            // alert(body.searchQueryLanguage)

            axios
                .post('/api/search', body)
                .then((response) => {
                    setResults(response.data.results);
                    setAnswers(response.data.answers);
                    setFacets(response.data.facets);
                    setResultCount(response.data.count);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        };

        if (!isFirstRender.current && oldQ.current === q && oldLilySetting === isLilyAI) {
            setIsLoading(true);
            const body = {
                q: q,
                top: top,
                skip: skip,
                filters: filters,
                isSemantic: isSemantic,
                isLilyAI: isLilyAI,
                // searchQueryLanguage : searchQueryLanguage ? "en-GB" : "en-US"
                searchQueryLanguage: 'en-US',
            };

            axios
                .post('/api/search', body)
                .then((response) => {
                    setResults(response.data.results);
                    //setFacets(response.data.facets); //commented out to allow for multi-select facets
                    setResultCount(response.data.count);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        } else {
            executeSearch();
            oldQ.current = q;
            oldLilySetting.current = isLilyAI;
            isFirstRender.current = false;
        }
    }, [q, top, currentPage, filters, isLilyAI, isSemantic, skip, searchQueryLanguage]);

    const postSearchHandler = (searchTerm) => {
        // pushing the new search term to history when q is updated
        // allows the back button to work as expected when coming back from the details page
        history.push('/search?q=' + searchTerm);
        oldQ.current = q;
        setQ(searchTerm);
        setCurrentPage(1);
        setSkip(0);
        setFilters([]);
    };

    const searchToggleHandler = () => {
        setIsSemantic(!isSemantic);
    };

    const lilyToggleHandler = () => {
        setIsLilyAI(!isLilyAI);
    };

    // let languageToggleHandler = () => {
    //   setSearchQueryLanguage(!searchQueryLanguage);
    // }

    const updatePagination = (newPageNumber) => {
        setSkip((newPageNumber - 1) * top);
        setCurrentPage(newPageNumber);
    };

    useEffect(() => {
        switch (true) {
            case isLilyAI && isSemantic:
                setBlackText(true);
                setBackgroundStyle({ background: '#FFF5F8', color: '#FFFFFF' });
                setCustomStyles({
                    '& label.Mui-focused': {
                        color: '#333333',
                    },
                    '& .MuiFilledInput-root': {
                        color: '#333333',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#FFC7D3',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFC7D3',
                        },
                        '&:hover fieldset': {
                            borderColor: '#FFC7D3',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FFC7D3',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#333333',
                    },
                });
                break;
            case isLilyAI && !isSemantic:
                setBlackText(true);
                setBackgroundStyle({ background: '#FFF5F8', color: '#FFFFFF' });
                setCustomStyles({
                    '& label.Mui-focused': {
                        color: '#333333',
                    },
                    '& .MuiFilledInput-root': {
                        color: '#333333',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#FFC7D3',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFC7D3',
                        },
                        '&:hover fieldset': {
                            borderColor: '#FFC7D3',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FFC7D3',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#333333',
                    },
                });
                break;
            case !isLilyAI && isSemantic:
                setBlackText(true);
                setBackgroundStyle({ background: '#E3F6FF', color: '#FFFFFF' });
                setCustomStyles({
                    '& label.Mui-focused': {
                        color: '#333333',
                    },
                    '& .MuiFilledInput-root': {
                        color: '#333333',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#B5E3F8',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#B5E3F8',
                        },
                        '&:hover fieldset': {
                            borderColor: '#B5E3F8',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#B5E3F8',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#333333',
                    },
                });
                break;
            case !isLilyAI && !isSemantic:
                setBlackText(false);
                setBackgroundStyle({ background: '#333333', color: '#FFFFFF' });
                setCustomStyles({
                    '& label.Mui-focused': {
                        color: '#FFFFFF',
                    },
                    '& .MuiFilledInput-root': {
                        color: '#FFFFFF',
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
                        color: '#FFFFFF',
                    },
                });
                break;
        }
    }, [isLilyAI, isSemantic]);

    return (
        <>
            <Grid container direction="row">
                <Grid item container direction="row" justifyContent="center" alignItems="center" style={backgroundStyle} xs={12} py={2} spacing={2}>
                    <Grid item lg={8} md={12} xs={12}>
                        <SearchBar postSearchHandler={postSearchHandler} q={q} blackText={blackText} customStyles={customStyles} />
                    </Grid>
                    <Grid item container direction="column" justifyContent="center" alignItems="center" lg={3} md={12}>
                        <Grid item px={10}>
                            <SearchToggle checked={isSemantic} onChange={searchToggleHandler} blackText={blackText} />
                        </Grid>
                        <Grid item px={10}>
                            <LilyAIToggle checked={isLilyAI} onChange={lilyToggleHandler} blackText={blackText} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item direction="row" justifyContent="space-between" xs={12}>
                    <Grid container item direction="column" justifyContent="flex-start" lg={2} sm={12}>
                        <Grid pt={3} pl={8} item>
                            <Typography className="filterLabel">FILTERS</Typography>
                        </Grid>
                        <Grid item>
                            <Facets facets={facets} filters={filters} setFilters={setFilters} resultCount={resultCount}></Facets>
                        </Grid>
                    </Grid>
                    <Grid item lg={10} sm={12}>
                        {isLoading ? (
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                                <CircularProgress sx={{ color: '#333333' }} />
                            </Box>
                        ) : (
                            <Grid container direction="row" spacing={3}>
                                <Grid item xs={12}>
                                    <Results documents={results} top={top} skip={skip} count={resultCount} answers={answers} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Pager
                                        currentPage={currentPage}
                                        resultCount={resultCount}
                                        resultsPerPage={top}
                                        setCurrentPage={updatePagination}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
