import React from 'react';

import NavBar from '../components/NavBar';
import NewsCard from '../components/NewsCard';
import NewsBar from '../components/NewsBar';

import getTopHeadlines from '../utils/newsapi-utils';

/* Material UI component(s) */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    document.title = 'UNews | Home';
    getTopHeadlines(null, 'us')
      .then((data) => {
        this.setState({ articles: data.articles });
      });
  }

  handleSearchRequest(value) {
    getTopHeadlines(value)
      .then((data) => {
        this.setState({ articles: data.articles });
      });
  }

  render() {
    const newsCards = [];
    for (const i in this.state.articles) {
      const news = this.state.articles[i];
      newsCards.push(<NewsCard source={news.source.name.split('.')[0]}
                               title={news.title}
                               description={news.description}
                               imageUrl={news.urlToImage}
                               date={news.publishedAt}
                               url={news.url}
                               key={i.toString()}/>);
    }

    return (
      <MuiThemeProvider>
        <div>
          <NavBar handleRequest={value => this.handleSearchRequest(value)} />
          <NewsBar newsCards={newsCards} />
        </div>
      </MuiThemeProvider>);
  }
}
