import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Grid, Typography } from '@mui/material';
import ProductImage from '../../components/Details/ProductImage';
import LilyAttributes from '../../components/Details/LilyAttributes';
import OrderInfo from '../../components/Details/OrderInfo';
import { cloneDeep, omit } from 'lodash';
import axios from 'axios';

export default function Details() {
    const { id } = useParams();
    const [document, setDocument] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState();

    useEffect(() => {
        setIsLoading(true);
        const body = {
            id: id,
        };
        axios
            .post('/api/lookup', body)
            .then((response) => {
                const doc = response.data.document;
                setDocument(doc);

                // create new object with only tags
                const clone = cloneDeep(doc);
                const tagsOnly = omit(clone, ['title', 'image_urls', 'bullet_text', 'sku_id', 'parent_id', 'description']);
                setTags(tagsOnly);

                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <>
            {isLoading ? (
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <CircularProgress sx={{ color: '#333333' }} />
                </Box>
            ) : (
                <>
                    <Grid container direction="row" justifyContent="center" alignItems="center" pt={3}>
                        <Grid item lg={4} xs={12} pl={30}>
                            <ProductImage url={document.image_urls[0]} alt="product" />
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            xs={12}
                            lg={8}
                            pl={20}
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    style={{
                                        fontFamily: 'Proxima Nova',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        fontSize: '30px',
                                        lineHeight: '118.8%',
                                        color: '#303030',
                                    }}
                                >
                                    {document.title}
                                </Typography>
                            </Grid>
                            <Grid item style={{ maxWidth: '40vw' }} xs={12}>
                                <Typography
                                    style={{
                                        fontFamily: 'Proxima Nova',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        lineHeight: '27px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        letterSpacing: '0.02em',
                                        color: '#717171',
                                    }}
                                >
                                    {`${document.description}. ${document.bullet_text.join(', ')}.`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {tags && <LilyAttributes tags={tags} />}
                            </Grid>
                            <Grid item xs={12}>
                                <OrderInfo />
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
