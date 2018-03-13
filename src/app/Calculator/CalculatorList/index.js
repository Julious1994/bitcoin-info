import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './../../service';

const coinList = [
    {id: 1, code: 'BTC', coinName: 'Bitcoin', icon: 'btc.png'},
    {id: 2, code: 'ETH', coinName: 'Ethereum', icon: 'eth.png'},
    {id: 3, code: 'ZEC', coinName: 'ZCash', icon: 'zec.png'},
    {id: 4, code: 'LTC', coinName: 'Litecoin', icon: 'litecoin.png'},
]

export default class CalculatorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coinUpdates: null,
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { params, baseUrl, coinUpdates } = this.state;
        
        return (
            <div style={{ padding: 25, backgroundColor: '#F6F6F9'}}>
                <h1>Cryptocurrency Mining Calculation & Profitability Calculators</h1>
                <div className="calc-item-list">
                    {
                        coinList.map(coin => (
                            <a href={`/calculator/${coin.code}`}>
                                <div className="calc-item-container">
                                    <div className="calc-item-picture">
                                        <img width="75" src={`/assets/images/${coin.icon}`} />
                                    </div>
                                    <div className="calc-item-info">
                                        <span>{coin.code}</span>
                                        <span>{coin.coinName} Mining Calculator</span>
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        );
    }
}
