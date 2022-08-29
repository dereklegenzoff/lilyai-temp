import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import './LanguageToggle.css';

export default function LanguageToggle(props) {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={props.checked ?? false} onChange={props.onChange} color="primary" />}
                label="Switch to en-GB"
                labelPlacement="start"
            />
        </FormGroup>
    );
}
