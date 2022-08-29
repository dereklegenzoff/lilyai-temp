// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import parse from 'html-react-parser';
import { Typography } from '@mui/material';

import './Answer.css';

export default function Answer(props) {
    const bodyStyle = {
        padding: '0.25rem',
        overflowWrap: 'normal',
    };

    return (
        <div className="card answer">
            <div className="card-body" style={bodyStyle}>
                <p>
                    {/* {props.data[0].highlights} */}
                    {parse(props.answer.highlights || '')}
                </p>
                <a href={`/details/${props.answer.key}`}>
                    <div style={bodyStyle}>
                        <Typography className="title-style" variant="h6">
                            {props.document?.productName}
                        </Typography>
                    </div>
                </a>
            </div>
        </div>
    );
}
