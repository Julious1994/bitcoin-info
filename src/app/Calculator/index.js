import React, { Component, PropTypes } from 'react';
// import io from 'socket.io-client';
import Service from './../service';
import CalculatorList from './CalculatorList';
import CalculatorForm from './CalculatorForm';

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { params, baseUrl } = this.props;
        
        return (
            <div>
                {
                    params.coin ?
                    <CalculatorForm {...this.props}/>
                    :
                    <CalculatorList {...this.props}/>
                }
            </div>
        );
    }
}
