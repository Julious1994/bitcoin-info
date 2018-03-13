import React, { Component, PropTypes } from 'react';

export default class Artical extends Component {
  render() {
    const { artical_url, data = {}} = this.props;
    const { artical = [] } = data;
    const record = artical[0] || {};
    return (
      <div>
        <div className="post-container">
          <div className="post-content">
            <h1>{record.title}</h1>
            <div className="post-description">
              <div dangerouslySetInnerHTML={{__html: record.content}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
