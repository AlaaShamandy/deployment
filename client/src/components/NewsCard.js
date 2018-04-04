import React from 'react';

/* Include the stylesheet */
import style from './stylesheets/NewsCard';

/* Material UI components */
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';


export default class NewsCard extends React.Component {
  render() {
    const {
      sourceName, title, description, imageUrl, url, date,
    } = {
      sourceName: this.props.source.toUpperCase(),
      title: this.props.title,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      url: this.props.url,
      date: this.props.date.substring(0, 10).replace(/-/g, '/'),
    };

    return (
      <Card style={style.card}>
        <CardHeader
          subtitle={date}
          title={<a
            style={style.link}
            href={url}
            target="_blank"
          >
            {sourceName}
                 </a>}
        />
        <CardMedia>
          <img src={imageUrl} style={style.image} />
        </CardMedia>
        <CardTitle
          style={style.cardTitle}
          title={title}
        />
        <CardText style={style.cardText}>
          {description}
        </CardText>
      </Card>
    );
  }
}
