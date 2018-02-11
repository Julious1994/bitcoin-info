import React, { Component, PropTypes } from 'react';
import NewsList from './NewsList';
import Artical from './Artical';


export default class News extends Component {
  render() {
    const { news_url,baseUrl } = this.props;

    return (
      <div>
        {
            news_url ?
            <Artical artical_url={news_url} />
            :
            <NewsList baseUrl={baseUrl} />
        }
      </div>
    );
  }
}
