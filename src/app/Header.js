import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    const { artical_url, baseUrl } = this.props;

    return (
      <div>
        <span><a href={`http://${baseUrl}/news`}>News</a></span>
        <span><a href={`http://${baseUrl}/market`}>Market</a></span>
        <span><a href={`http://${baseUrl}/about`}>About</a></span>
      </div>
    );
  }
}
