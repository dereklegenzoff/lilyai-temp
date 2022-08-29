import React from 'react';
import { Grid, Avatar, Typography } from '@mui/material';
import { getRandomInt } from '../../utilities/RNG';

const OrderInfo = () => (
    <Grid container item direction="row" justifyContent="flex-start" alignItems="center" xs={12}>
        <Grid item xs={6}>
            <Typography
                style={{
                    fontFamily: "'Proxima Nova'",
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '24px',
                    lineHeight: '29px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#333333',
                }}
            >
                {`Price: $${getRandomInt(50, 200)}`}
            </Typography>
        </Grid>
        <Grid item container direction="row" justifyContent="center" alignItems="center" xs={6}>
            <Grid item>
                <Typography
                    style={{
                        fontFamily: "'Proxima Nova'",
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '18px',
                        lineHeight: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                        color: '#717171',
                    }}
                >
                    Size:
                </Typography>
            </Grid>
            <Grid item>
                <Avatar sx={{ bgcolor: '#FFFFFF', color: '#717171' }}>S</Avatar>
            </Grid>
            <Grid item>
                <Avatar sx={{ bgcolor: '#FFFFFF', color: '#303030', border: '1px solid #303030', width: 26, height: 26 }}>M</Avatar>
            </Grid>
            <Grid item>
                <Avatar sx={{ bgcolor: '#FFFFFF', color: '#717171' }}>L</Avatar>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <button
                style={{
                    boxSizing: 'border-box',
                    width: '189px',
                    height: '57px',
                    background: '#333333',
                    border: '4px solid #333333',
                    borderRadius: '7px',

                    fontFamily: "'Lato'",
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '22px',
                    letterSpacing: '0.07em',
                    color: '#FFFFFF',
                }}
            >
                ADD TO CART
            </button>
        </Grid>
    </Grid>
);

export default OrderInfo;
