import React from 'react';
import { Player } from 'video-react';

import {
    Card,
    CardMedia,
    CardText
} from 'material-ui/Card';

var style = {
    card: {
        width: '70%',
        marginBottom: 40,
        backgroundColor: '#fafafa',
        borderRadius: '0px',
        boxShadow: '0px 0px',
        border: '#e0e0e0 solid 1px'
    },

    postMessage: {
        textAlign: 'left',
        fontSize: 15,
        padding: 10,
        paddingBottom: 0,
        color: 'black',
    },

}

export default function PostCard(props) {
    return (
        <center>
            <Card style={style.card}>
                <CardMedia>
                    <Player playsInline src={props.postVideoUrl}/>
                </CardMedia>
                <CardText style={style.postMessage}>
                    {props.postMessage}
                </CardText>
            </Card>
        </center>
    );
}
