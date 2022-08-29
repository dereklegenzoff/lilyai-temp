import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './Details.css';

export default function Details() {
    // eslint-disable-next-line

    const { id } = useParams();
    const [document, setDocument] = useState({});
    const [selectedTab, setTab] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const body = {
            id: id,
        };
        axios
            .post('/api/lookup', body)
            .then((response) => {
                const doc = response.data.document;
                setDocument(doc);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        // eslint-disable-next-line
    }, [id]);

    // View default is loading with no active tab
    let detailsBody = <CircularProgress />;
    let resultStyle = 'nav-link';
    let rawStyle = 'nav-link';

    let bullets;
    try {
        bullets = document.bullet_text.map((text, index) => <li>{text}</li>);
    } catch (error) {
        bullets = null;
    }

    if (!isLoading && document) {
        // View result
        if (selectedTab === 0) {
            resultStyle += ' active';
            detailsBody = (
                <div className="card-body">
                    <h5 className="card-title">{document.title}</h5>
                    <a href={document.productURL}>
                        <img className="image" src={document.image_urls[0]} alt="product"></img>
                    </a>
                    <h6>Description</h6>
                    <p className="card-text">{document.description}</p>
                    {bullets}
                </div>
            );
        } else {
            // View raw data
            rawStyle += ' active';
            detailsBody = (
                <div className="card-body text-left">
                    <pre>
                        <code>{JSON.stringify(document, null, 2)}</code>
                    </pre>
                </div>
            );
        }
    }

    return (
        <main className="main main--details container fluid">
            <div className="card text-center result-container">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className={resultStyle} onClick={() => setTab(0)}>
                                Result
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={rawStyle} onClick={() => setTab(1)}>
                                Raw Data
                            </button>
                        </li>
                    </ul>
                </div>
                {detailsBody}
            </div>
        </main>
    );
}
