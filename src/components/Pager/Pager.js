import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './Pager.css';

export default function Pager(props) {
    const [selectedPage, setSelectedPage] = useState(parseInt(props.currentPage));
    const totalPages = Math.ceil(props.resultCount / props.resultsPerPage);

    const handleChange = (event, value) => {
        setSelectedPage(value);
    };

    useEffect(
        (_) => {
            props.setCurrentPage(selectedPage);
        },
        [selectedPage, props]
    );

    return (
        <Pagination
            className="pager"
            count={totalPages}
            page={selectedPage}
            onChange={handleChange}
            siblingCount={1}
            boundaryCount={0}
            renderItem={(item) => <PaginationItem variant="text" components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
        />
    );
}
