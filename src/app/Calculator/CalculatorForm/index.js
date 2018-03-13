import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './../../service';

const coinList = [
    { id: 1, code: 'BTC', coinName: 'Bitcoin', icon: 'btc.png' },
    { id: 2, code: 'ETH', coinName: 'Bitcoin', icon: 'btc.png' },
    { id: 3, code: 'XRP', coinName: 'Bitcoin', icon: 'btc.png' },
    { id: 4, code: 'BCH', coinName: 'Bitcoin', icon: 'btc.png' },
]

export default class CalculatorForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calc: {
                hashRate: 9460,
                hashType: 3,
                difficulty: 3290605988755.00000000,
                poolFee: 0,
                power: 2600.00,
                powerCost: 0.10,
                coinPrice: 9502.20000000,
                blockReward: 12.5,
            },
            statistics: [],
        };
    }

    componentDidMount() {
        const { params } = this.props;
    }

    changeField(field, value) {
        const { calc } = this.state;
        calc[field] = value;
        this.setState({ calc });
    }

    getHashRateInHs(hashType) {
        return Math.pow(1000, hashType);
    } 

    calculateMining() {
        const { calc } = this.state;
        const netHashRate = this.getHashRateInHs(calc.hashType) * calc.hashRate;
        const divider = calc.difficulty * Math.pow(2, 32);
        const secondsPerDay = 60 * 60 * 24;
        const Dividend = calc.blockReward * netHashRate * secondsPerDay;
        const perDayEarnedCoin = Dividend / divider;
        
        const perDayEarning = perDayEarnedCoin * calc.coinPrice;

        const powerExpensePerHour = (calc.power / 1000) * calc.powerCost;
        const poolExpensePerDay = (perDayEarning * (calc.poolFee / 100));
        // const expense = (perDayCost * (calc.poolFee / 100)) + powerExpense;
        
        const statistics = [];
        // console.log(parseFloat((perDayEarnedCoin / 24) * calc.coinPrice));
        const hour = {
            powerCost: powerExpensePerHour,
            poolCost: 0,
            generatedCoin: perDayEarnedCoin / 24,
            earnedUsd: ((perDayEarnedCoin / 24) * calc.coinPrice).toPrecision(),
            profit: ((perDayEarnedCoin / 24) * calc.coinPrice) - (powerExpensePerHour + 0),
            title: 'Hourly',
        };
        const daily = {
            powerCost: powerExpensePerHour * 24,
            poolCost: poolExpensePerDay,
            generatedCoin: perDayEarnedCoin,
            earnedUsd: (perDayEarnedCoin) * calc.coinPrice,
            profit: (perDayEarnedCoin * calc.coinPrice) - ((powerExpensePerHour * 24) + poolExpensePerDay),
            title: 'Daily',
        };
        const weekly = {
            powerCost: daily.powerCost * 7,
            poolCost: poolExpensePerDay * 7,
            generatedCoin: daily.generatedCoin * 7,
            earnedUsd: daily.earnedUsd * 7,
            profit: daily.profit * 7,
            title: 'Weekly',
        };
        const monthly = {
            powerCost: weekly.powerCost * 7,
            poolCost: weekly.poolCost * 7,
            generatedCoin: weekly.generatedCoin * 7,
            earnedUsd: weekly.earnedUsd * 7,
            profit: weekly.profit * 7,
            title: 'Monthly',
        };
        const yearly = {
            powerCost: monthly.powerCost * 7,
            poolCost: monthly.poolCost * 7,
            generatedCoin: monthly.generatedCoin * 7,
            earnedUsd: monthly.earnedUsd * 7,
            profit: monthly.profit * 7,
            title: 'Yearly',
        };
        statistics.push(hour);
        statistics.push(daily);
        statistics.push(weekly);
        statistics.push(monthly);
        statistics.push(yearly);
        this.setState({ statistics });
    }

    render() {
        const { params, baseUrl } = this.props;
        const { calc, statistics } = this.state;
        console.log(statistics);
        return (
            <div>
            
                <div className="row">
                    <div className="col-md-9 col-sm-12 col-xs-12">
                    
                        <div style={{ padding: 25, backgroundColor: '#F6F6F9' }}>
                            <div className="row">
                                <h2>Bitcoin Mining Calculator & Profitability Calculator</h2>
                            </div>
                            <div className="row">
                                <div className="mining-calc col-md-9 col-xs-12 col-sm-12">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Hash Rate</label>
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hashRate"
                                                        value={calc.hashRate}
                                                        onChange={(e) => this.changeField('hashRate', e.target.value)}
                                                    />
                                                    <select
                                                        className="form-control"
                                                        style={{ marginLeft: 5, width: 75 }}
                                                        value={calc.hashType}
                                                        onChange={(e) => this.changeField('hashType', e.target.value)}
                                                    >
                                                        <option value="0">H/s</option>
                                                        <option value="1">kH/s</option>
                                                        <option value="2">MH/s</option>
                                                        <option value="3">GH/s</option>
                                                        <option value="4">TH/s</option>
                                                        <option value="5">PH/s</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Power(Watts)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="power"
                                                    value={calc.power}
                                                    onChange={(e) => this.changeField('power', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Power Cost($/kWh)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="powerCost"
                                                    value={calc.powerCost}
                                                    onChange={(e) => this.changeField('powerCost', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Pool Fees(%)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="poolFee"
                                                    value={calc.poolFee}
                                                    onChange={(e) => this.changeField('poolFee', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Difficulty</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="difficulty"
                                                    value={calc.difficulty}
                                                    onChange={(e) => this.changeField('difficulty', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>Block Reward</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="blockReward"
                                                    value={calc.blockReward}
                                                    onChange={(e) => this.changeField('blockReward', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <div className="form-group">
                                                <label>bitcoin to Dollar(USD)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="btcToUsd"
                                                    value={calc.coinPrice}
                                                    onChange={(e) => this.changeField('coinPrice', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="calc-button-container col-md-4">
                                            <button 
                                                style={{ width: '100%' }} 
                                                className="btn btn-primary"
                                                onClick={() => this.calculateMining()}
                                            >
                                                Calculate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mining-result">
                                    {
                                        statistics.map((item, index) => (
                                            <div className="mining-result-card" key={index}>
                                                <div className="result-card-header">
                                                    <span className="result-title">{item.title}</span>
                                                    <div className="result-profit">
                                                        <span>Profit:</span>
                                                        <span style={{ marginLeft: 3}}>${item.profit && item.profit.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <div className="result-card-content">
                                                    <div className="result-content-row">
                                                        <span className="result-content-title">Power Cost</span>
                                                        <span className="result-content-text">$0.26</span>
                                                    </div>
                                                    <div className="result-content-row">
                                                        <span className="result-content-title">Pool Fee</span>
                                                        <span className="result-content-text">$0.10</span>
                                                    </div>
                                                    <div className="result-content-row">
                                                        <span className="result-content-title">Generated</span>
                                                        <span className="result-content-text">0.003012</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 sidebar hidden-sm hidden-xs">
                        <div className="latest-news">
                            <div className="latest-news-header">
                                <span className="news-header-title">Feature News</span>
                            </div>
                            <div className="latest-news-content">
                                    <a href="#">
                                <div className="news-item">
                                        <div className="news-pic">
                                            <img src="/uploads/download.jpeg" width="100" height="100" />
                                        </div>
                                        <div className="news-title">
                                            <span>But the marketplace is sorely lacking the necessary foundation</span>
                                        </div>
                                </div>
                                    </a>
                                    <a href="#">
                                <div className="news-item">
                                        <div className="news-pic">
                                            <img src="/uploads/download.jpeg" width="100" height="100" />
                                        </div>
                                        <div className="news-title">
                                            <span>But the marketplace is sorely lacking the necessary foundation</span>
                                        </div>
                                </div>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
