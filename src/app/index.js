import React, { Component, PropTypes } from 'react';
import News from './News';
import About from './About';
import Header from './Header';
import Market from './Market';

export default class App extends Component {
  render() {
    const { isMobile, params, baseUrl } = this.props;
    console.log(baseUrl);
    return (
      <div className="market-down">
        <Header baseUrl={baseUrl} />
        {
          params.module === 'news' &&
          <News news_url={params.news_url} baseUrl={baseUrl} />
        }
        {
          params.module === 'market' &&
          <Market />
        }
        {
          params.module === 'about' &&
          <About />
        }
      </div>
    );
  }
}
