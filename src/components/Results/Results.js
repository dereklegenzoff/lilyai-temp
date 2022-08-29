import React from 'react';
import { Grid } from '@mui/material';
import Result from './Result/Result';
import Answer from './Answer/Answer';

import './Results.css';

export default function Results(props) {
    const beginDocNumber = Math.min(props.skip + 1, props.count);
    const endDocNumber = Math.min(props.skip + props.top, props.count);

    let answer;
    if (props.answers && props.answers.length > 0 && beginDocNumber === 1) {
        // console.log('answer found');
        // console.log(props.answers);
        const answerDocument = props.documents.find((document) => document.document.productID === props.answers[0].key);
        answer = <Answer answer={props.answers[0]} document={answerDocument?.document}></Answer>;
    } else {
        answer = null;
    }

    return (
        <Grid container direction="row">
            <Grid className="results-info" item>
                Showing {beginDocNumber}-{endDocNumber} of {props.count.toLocaleString()} results
            </Grid>
            <Grid className="answers" item>
                {answer}
            </Grid>
            <Grid container item direction="row" justifyContents="center" alignItems="center" p={2}>
                {props.documents.map((result, index) => (
                    <Grid item key={index} xs>
                        <Result document={result.document} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
