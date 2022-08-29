import React, { useState } from 'react';
import { Collapse, Checkbox, List, ListItem, ListItemText, Divider, FormControlLabel, FormGroup, ListItemIcon } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import './CheckboxFacet.css';

export default function CheckboxFacet(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const threshold = 0.1;

    if (props.values.length === 0) {
        return null;
    }

    // console.log(props.values);
    let totalFacetCount = 0;
    let i = 0;
    while (i < props.values.length) {
        totalFacetCount += props.values[i].count;
        i++;
    }

    if (totalFacetCount / props.resultCount < threshold) {
        return null;
    }

    const checkboxes = props.values.map((facetValue) => {
        const isSelected = props.selectedFacets.some((facet) => facet.value === facetValue.value);

        return (
            <FacetValueListItem
                dense
                disableGutters
                id={facetValue.value}
                key={facetValue.value}
                onClick={
                    isSelected
                        ? () => props.removeFilter({ field: props.name, value: facetValue.value })
                        : () => props.addFilter(props.name, facetValue.value)
                }
                style={{ cursor: 'pointer' }}
            >
                <ListItemText
                    primary={facetValue.value + ' (' + facetValue.count + ')'}
                    style={
                        isSelected
                            ? {
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: '800',
                                  fontSize: '20px',
                                  lineHeight: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: 'black',
                              }
                            : {
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: '400',
                                  fontSize: '20px',
                                  lineHeight: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#717171',
                              }
                    }
                />
                {isSelected && (
                    <ListItemIcon>
                        <Checkbox
                            edge="end"
                            disableRipple
                            checked={isSelected}
                            checkedIcon={<CloseIcon fontSize="small" style={{ color: '#333333' }} />}
                        />
                    </ListItemIcon>
                )}
            </FacetValueListItem>
        );
    });

    return (
        <div>
            <FacetListItem disableRipple={true} button onClick={() => setIsExpanded(!isExpanded)}>
                <ListItemText primary={props.mapFacetName(props.name)} />
                {isExpanded ? <ExpandMore /> : <KeyboardArrowRightIcon />}
            </FacetListItem>
            <Collapse in={isExpanded} component="div">
                <FacetValuesList>{checkboxes}</FacetValuesList>
            </Collapse>
            <Divider />
        </div>
    );
}

const FacetListItem = styled(ListItem)({
    paddingLeft: '36px !important',
});

const FacetValueListItem = styled(ListItem)({
    paddingLeft: '46px !important',
});

const FacetValuesList = styled(List)({
    maxHeight: 340,
    overflowY: 'auto !important',
    marginRight: '18px !important',
});
