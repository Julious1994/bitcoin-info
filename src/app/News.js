import React, { Component, PropTypes } from 'react';
import NewsList from './NewsList';
import Artical from './Artical';


export default class News extends Component {
  render() {
    const { params,baseUrl, data } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="content-part">
          {
              params.artical ?
              <Artical artical_url={params.artical} {...this.props}/>
              :
              <NewsList {...this.props}/>
          }
        </div>
        <div className="sidebar">
        
        </div>
      </div>
    );
  }
}
