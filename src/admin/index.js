import React, { Component, PropTypes } from 'react';
// import Home from './Home';
import Header from './Header';
// import Footer from './Footer';
import Post from './Post';
import Login from './Login';

export default class AdminApp extends Component {
  render() {
    const { params, baseUrl } = this.props;
    console.log(baseUrl, 'sss');
    return (
      <div>
        {
          params.module === 'login' ?
            <Login {...this.props} />  
          :
          <div>
            <Header baseUrl={baseUrl} />
            <div style={{ marginTop: 60}}>
              {
                params.module === 'post' &&
                <Post news_url={params.news_url} baseUrl={baseUrl} {...this.props}/>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

/* <Home /> */
/* <Footer /> */