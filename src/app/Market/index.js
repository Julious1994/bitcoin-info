import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './../service';


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
                console.log(tradeMsg.msg, coinList[target]);
                const oldRecord = coinList[target];
                coinList[target] = tradeMsg.msg;
                if (tradeMsg.msg.price < oldRecord.price) {
                    coinList[target].status = 'red';    
                } else {
                    coinList[target].status = 'green';    
                }
                this.setState({ coinList });
            }
            // document.getElementById('trade').innerHTML = JSON.stringify(tradeMsg)
        }.bind(this));
        setInterval(function() {
                var elems = document.getElementsByTagName("tr");
                console.log(elems)
                for(let i = 0; i < elems.length; i++) {
                    var element = elems[i];
                    console.log('ele', element)
                    element.className = element.className.replace(/\bcoin-highlight-green\b/g, "");
                    element.className = element.className.replace(/\bcoin-highlight-red\b/g, "");
                    element.className = element.className.replace(/\bcoin-highlight-green\b/g, "");
                }
        }, 1000);
    }

    render() {
        const { coinUpdates } = this.state;
        return (
            <div style={{ margin: 25}}>
                <h1 className="market-header" >Cryptocurrency Market Capitalizations</h1>
                <div>
                    <table className="table table-hover">
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
                                        className={`${item.status ? 'coin-highlight-' + item.status : ''} coin-row`}
                                    >
                                        <td>{item.long}</td>
                                        <td 
                                            style={{ color: `${item.status || 'initial'}`}}
                                        >
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td>${item.mktcap.toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                        {this.state.coinUpdates && this.state.coinUpdates.name}                        
                </div>
            </div>
        );
    }
}
