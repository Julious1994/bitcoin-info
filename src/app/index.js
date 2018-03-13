import React, { Component, PropTypes } from 'react';
import News from './News';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Market from './Market';
import Calculator from './Calculator';
import ICO from './ICO';
import AdminApp from './../admin/index';

export default class App extends Component {
  render() {
    const { params, baseUrl, siteType } = this.props;
    console.log('App', this.props);
    return (
      siteType === 'admin' ? 
        <div className="admin-container">
          <AdminApp {...this.props}/>
        </div>
      : 
      <div className="market-down">
        <Header baseUrl={baseUrl} module={params.module} />
        {
          params.module === 'news' &&
          <News news_url={params.news_url} baseUrl={baseUrl} {...this.props} />
        }
        {
          params.module === 'market' &&
          <Market />
        }
        {
          params.module === 'calculator' &&
          <Calculator {...this.props}/>
        }
        {
          params.module === 'upcoming-icos' &&
          <ICO />
        }
        {/* <Home /> */}  
        <Footer />
      </div>
    );
  }
}
