import React, { Component, PropTypes } from 'react';
import Service from './../service';
import { setInterval } from 'timers';

const coins = ['BTC','BCH','ETH','LTC','XRP','NEO','DASH'];

export default class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            coinList: [
                { id: 'BTC', coinTitle: 'BTC/USD' },
                { id: 'BCH', coinTitle: 'BCH/USD' },
                { id: 'ETH', coinTitle: 'ETH/USD' },
                { id: 'LTC', coinTitle: 'LTC/USD' },
                { id: 'XRP', coinTitle: 'XRP/USD' },
                { id: 'NEO', coinTitle: 'NEO/USD' },
                { id: 'DASH', coinTitle: 'DASH/USD' },
            ]
        }
    }
    
    componentDidMount() {
        this.setCoinPrice();
        setInterval(() => {
            this.setCoinPrice();
        }, 30000)
    }
        
    setCoinPrice() {
        let URL = '/page/';
        const service = new Service();
        coins.forEach(coin => service.get(`${URL}${coin}`).then(res => 
            res.json().then(result => {
                const { coinList } = this.state;
                const t = coinList.findIndex(c => c.id === result.id);
                coinList[t] = Object.assign({}, result, {
                    coinTitle: coinList[t].coinTitle,
                    id: coinList[t].id,
                });
                this.setState({ coinList });
            })
        ));
    }

    render() {
        const { artical_url, baseUrl } = this.props;
        const { coinList } = this.state;
        return (
        <div>
            <section className="top-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="currency-status">
                                {
                                    coinList.map(coin => (
                                        <li>
                                            <a href="#">
                                                {/* <i className="tf-ion-arrow-down-b down-status"></i> */}
                                                <span style={{ marginLeft: 3}}>{coin.coinTitle}</span>
                                                <span style={{ marginLeft: 5}}>{coin.price_usd && coin.price_usd.toFixed(2)}</span>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="header  navigation">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-md">
                                <a className="navbar-brand" href="index-2.html">
                                    <img src="/assets/images/logo.png" alt="" width="150px" />
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="tf-ion-android-menu"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className={`nav-item ${this.props.module === 'news' ? 'active' : ''}`}>
                                            <a className="nav-link" href={`${baseUrl}/news`}>
                                                News 
                                            {
                                                this.props.module === 'news' &&
                                                <span className="sr-only">(current)</span>
                                            }
                                            </a>
                                        </li>
                                        <li className={`nav-item ${this.props.module === 'market' ? 'active' : ''}`}>
                                            <a className="nav-link" href={`${baseUrl}/market`}>
                                                Market
                                            {
                                                this.props.module === 'market' &&
                                                <span className="sr-only">(current)</span>
                                            }
                                            </a>
                                        </li>
                                        <li className={`nav-item ${this.props.module === 'calculator' ? 'active' : ''}`}>
                                            <a className="nav-link" href={`${baseUrl}/calculator`}>
                                                Calculator
                                            {
                                                this.props.module === 'calculator' &&
                                                <span className="sr-only">(current)</span>
                                            }
                                            </a>
                                        </li>
                                        <li className={`nav-item ${this.props.module === 'upcoming_ico' ? 'active' : ''}`}>
                                            <a className="nav-link" href={`${baseUrl}/upcoming-icos`}>Upcoming ICO</a>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a className="nav-link" href="login.html">Sign In</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="signup.html">Sign Up</a>
                                        </li> */}

                                        {/* <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Pages
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="team.html">Team Page</a>
                                                <a className="dropdown-item" href="404.html">404 Page</a>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </nav>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
        );
    }
}

{/* <span><a href={`http://${baseUrl}/news`}>News</a></span>
<span><a href={`http://${baseUrl}/market`}>Market</a></span>
<span><a href={`http://${baseUrl}/about`}>About</a></span> */}