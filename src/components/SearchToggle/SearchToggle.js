import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchToggleLabel from './SearchToggleLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import './SearchToggle.css';

const StyleSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#01A6F0',
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: '#01A6F0',
            },
        },
    },
}));

export default function SearchToggle(props) {
    return (
        <FormGroup>
            <FormControlLabel
                control={<StyleSwitch checked={props.checked ?? false} onChange={props.onChange} size="small" />}
                label={<SearchToggleLabel blackText={props.blackText} />}
                labelPlacement="end"
            />
        </FormGroup>
    );
}
