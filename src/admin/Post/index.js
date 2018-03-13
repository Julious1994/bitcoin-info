import React, { Component, PropTypes } from 'react';
import PostList from './PostList';
import PostEditor from './PostEditor';


export default class Post extends Component {
  render() {
    const { params,baseUrl, data } = this.props;
    console.log(this.props)
    return (
      <div>
        {
            params.artical ?
            <PostEditor artical_url={params.artical} {...this.props}/>
            :
            <PostList {...this.props}/>
        }
      </div>
    );
  }
}
