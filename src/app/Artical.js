import React, { Component, PropTypes } from 'react';

export default class Artical extends Component {
  render() {
    const { artical_url } = this.props;

    return (
      <div>
        <h1>{artical_url}</h1>
        <div>
            <h3>{artical_url}</h3>
            <p>
                Ipsum ante nec quam gravida montes. 
                Nunc aenean egestas lobortis blandit molestiae. 
                Justo etiam mi. Viverra justo lectus et mattis 
                con sem pulvinar imperdiet. Est elementum 
                vestibulum lacus dolor tempus. Risus ipsum blandit. 
            </p>
        </div>
      </div>
    );
  }
}
