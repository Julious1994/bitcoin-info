import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './service';


export default class Market extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coinUpdates: null,
            coinList: [],
        };
    }

    componentDidMount() {
        const service = new Service();
        const socket = window.io.connect('https://coincap.io');
        service.get('/front').then(res => {
            res.json().then(result => {
                const coinList = result.splice(10, result.length);
                
                this.setState({ coinList: result});
            });
        });
        socket.on('trades', function(tradeMsg) {
            console.log(tradeMsg);
            const { coinList } = this.state;
            const target = coinList.findIndex(c => c.short === tradeMsg.msg.short);
            if (target !== -1) {
                coinList[target] = tradeMsg.msg;
                this.setState({ coinList });
            }
            // document.getElementById('trade').innerHTML = JSON.stringify(tradeMsg)
        }.bind(this));
    }

    render() {
        const { coinUpdates } = this.state;
        
        return (
            <div>
            <h1>Coin Market</h1>
            <div>
                <h3>Live Market</h3>
                <div>
                    <table>
                        <thead>

                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Market Cap</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.coinList.map(item => (
                                    <tr 
                                        key={item.short} 
                                        style={{ 
                                            backgroundColor: item.perc <= 0 ? 'rgba(27,27,27,0.4)' : 'rgba(54,54,54,0.4)',
                                            transition: 'background-color 1s',
                                        }} 
                                        className={`${item.perc && (item.perc <= 0 ? 'coin-down' : 'coin-up')}`}>
                                        <td>{item.long}</td>
                                        <td>${item.price}</td>
                                        <td>${item.mktcap}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                        {this.state.coinUpdates && this.state.coinUpdates.name}                        
                </div>
            </div>
            </div>
        );
    }
}
