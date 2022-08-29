import { useEffect, useState } from 'react';
import { Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { startCase } from 'lodash';
import CircleIcon from '@mui/icons-material/Circle';

const LilyAttributes = ({ tags }) => {
    const [printableTags, setPrintableTags] = useState([]);

    useEffect(() => {
        const tagsArray = [];

        Object.keys(tags).forEach((key) => {
            if (Array.isArray(tags[key])) {
                tags[key].forEach((tag) => {
                    tagsArray.push(`${startCase(key.replace('_', ' '))}: ${startCase(tag)}`);
                });
            } else {
                tagsArray.push(`${startCase(key.replace('_', ' '))}: ${startCase(tags[key])}`);
            }
        });
        setPrintableTags(tagsArray);
    }, []);

    return (
        <Grid container direction="column">
            <Grid item container direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
                <Grid item>
                    <Box component="img" src={'/images/Lily_AI_logo_320px.png'} sx={{ width: 80 }}></Box>
                </Grid>
                <Grid item>
                    <Typography
                        style={{
                            fontFamily: 'Proxima Nova',
                            fontStyle: 'normal',
                            fontWeight: '800',
                            fontSize: '22px',
                            lineHeight: '27px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#717171',
                        }}
                    >
                        Product Attributes
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <List style={{ overflowY: 'auto !important' }} dense>
                    <Grid container>
                        {printableTags.map((value) => (
                            <Grid item lg={6} xs={12} key={value}>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon
                                            fontSize="small"
                                            style={{
                                                color: 'black',
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={value}></ListItemText>
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                </List>
            </Grid>
        </Grid>
    );
};
export default LilyAttributes;
