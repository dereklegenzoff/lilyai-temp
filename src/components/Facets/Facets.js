import React from 'react';
import { List, Chip, Divider } from '@mui/material';
import CheckboxFacet from './CheckboxFacet/CheckboxFacet';
import styled from 'styled-components';
import './Facets.css';

export default function Facets(props) {
    function mapFacetName(facetName) {
        const capitalizeFirstLetter = (string) => (string[0] ? `${string[0].toUpperCase()}${string.substring(1)}` : '');
        facetName = facetName.trim();
        facetName = capitalizeFirstLetter(facetName);

        facetName = facetName.replace('_', ' ');
        return facetName;
    }

    function addFilter(name, value) {
        const newFilters = props.filters.concat({ field: name, value: value });
        props.setFilters(newFilters);
    }

    function removeFilter(filter) {
        const newFilters = props.filters.filter((item) => item.value !== filter.value);
        props.setFilters(newFilters);
    }

    let facets;
    try {
        facets = Object.keys(props.facets)
            .sort()
            .map((key) => (
                <CheckboxFacet
                    key={key}
                    name={key}
                    values={props.facets[key]}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    mapFacetName={mapFacetName}
                    selectedFacets={props.filters.filter((f) => f.field === key)}
                    resultCount={props.resultCount}
                />
            ));
    } catch (error) {
        console.log(error);
    }

    const filters = props.filters.map((filter, index) => (
        <li key={index}>
            <Chip label={`${mapFacetName(filter.field)}: ${filter.value}`} onDelete={() => removeFilter(filter)} className="chip" />
        </li>
    ));

    return (
        <div id="facetPanel" className="box">
            <div id="clearFilters">
                <ul className="filterlist">{filters}</ul>
            </div>
            <FacetList component="nav" className="listitem">
                <Divider></Divider>
                {facets}
            </FacetList>
        </div>
    );
}

const FacetList = styled(List)({
    marginTop: '32px !important',
});
