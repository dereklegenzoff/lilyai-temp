import React from 'react';
import { Typography, Box, Avatar, Grid } from '@mui/material';

const LilyToggleLabel = ({ blackText }) => (
    <Grid container direction="row" spacing={1}>
        <Grid item>
            <Box component={Avatar} src={'/images/Lily_AI_logo_320px.png'} variant="square" style={{ width: '2.5rem', height: '1.5rem' }}></Box>
        </Grid>
        <Grid item>
            <Typography style={blackText ? { fontSize: '14px', color: '#303030' } : { fontSize: '14px' }}>Enable Lily AI Search</Typography>
        </Grid>
    </Grid>
);

export default LilyToggleLabel;
