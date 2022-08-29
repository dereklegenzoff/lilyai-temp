import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, CardContent, CardMedia, Grid } from '@mui/material';

import './Result.css';

export default function Result(props) {
    let image_url = '';
    // console.log(props.document.image_urls);
    if (props.document.image_urls === null) {
        image_url = '/images/product-image-placeholder.jpg';
    } else {
        image_url = props.document.image_urls[0];
        // console.log(image_url);
    }
    return (
        <Card className="custom-result">
            <Link to={`/details/${props.document.sku_id}`}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
                    <Grid item>
                        <CardMedia component="img" className="card-img-top" src={image_url} alt={props.document.title}></CardMedia>
                    </Grid>

                    <Grid item>
                        <CardContent>
                            <Typography
                                style={{
                                    fontFamily: 'Proxima Nova',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    lineHeight: '19px',
                                    color: '#333333',
                                }}
                            >
                                {props.document.title}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Link>
        </Card>
    );
}
