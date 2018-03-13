import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './../service';


export default class ICO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coinUpdates: null,
            coinList: [],
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { coinUpdates } = this.state;
        
        return (
            <div style={{ margin: 25}}>
                <h1 className="market-header" >Upcoming ICOs</h1>
                <div>
                    <h2>Coming soon!!!</h2>
                </div>
            </div>
        );
    }
}
