import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import LilyToggleLabel from './LilyToggleLabel';
import './LilyAIToggle.css';

const LilyStyleSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#FFC7D3',
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: '#FFC7D3',
            },
        },
    },
}));

export default function LilyAIToggle(props) {
    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={<LilyStyleSwitch checked={props.checked ?? false} onChange={props.onChange} size="small" />}
                    label={<LilyToggleLabel blackText={props.blackText} />}
                    labelPlacement="end"
                />
            </FormGroup>
        </>
    );
}
