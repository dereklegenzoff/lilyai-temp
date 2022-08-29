import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, StyledEngineProvider, Box } from '@mui/material';

// Context for user authentication
import { AuthContext } from '../contexts/AuthContext';

// App shell components
import AppHeader from '../components/AppHeader/AppHeader';

// React Router page components
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Details from '../pages/Details/LilyDetails';

// Custom app styles
import './App.css';
import { SearchContext } from '../contexts/SearchContext';

export default function App() {
    // React Hook: useState with a var name, set function, & default value
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isSemantic, setIsSemantic] = useState();
    const [searchQueryLanguage, setSearchQueryLanguage] = useState();
    const [isLilyAI, setIsLilyAI] = useState();
    const searchInfoValue = { isSemantic, setIsSemantic, searchQueryLanguage, setSearchQueryLanguage, isLilyAI, setIsLilyAI };

    // Fetch authentication API & set user state
    async function fetchAuth() {
        const response = await fetch('/.auth/me');
        if (response) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                response
                    .json()
                    .then((response) => setUser(response))
                    .catch((error) => console.error('Error:', error));
            }
        }
    }

    function modalChangeHandler() {
        setShowModal(!showModal);
    }

    // React Hook: useEffect when component changes
    // Empty array ensure this only runs once on mount
    useEffect(() => {
        fetchAuth();
    }, []);

    const THEME = createTheme({
        typography: {
            fontFamily: '"Proxima Nova"',
        },
        shape: {
            borderRadius: 7,
        },
    });

    return (
        <AuthContext.Provider value={user}>
            <SearchContext.Provider value={searchInfoValue}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={THEME}>
                        <div className="container-fluid app">
                            <Router>
                                <AppHeader onSettingsClick={modalChangeHandler} />
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/search" component={Search} />
                                    <Route path="/details/:id" component={Details} />
                                </Switch>
                            </Router>
                        </div>
                    </ThemeProvider>
                </StyledEngineProvider>
            </SearchContext.Provider>
        </AuthContext.Provider>
    );
}
