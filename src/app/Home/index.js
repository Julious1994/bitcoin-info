import React, { Component, PropTypes } from 'react';

export default class Home extends Component {
  render() {

    return (
      <div>
        <section className="hero-area">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="video-player">
                        <img className="img-fluid rounded" src="assets/images/slider/slider-bg-2.jpg" alt="" />
                        <a className="play-icon" href="javascript:void(0)">
                            <i className="tf-ion-ios-play"  data-video="https://www.youtube.com/embed/g3-VxLQO7do?autoplay=1"></i>
                        </a>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="block">
                        <h2>Bitcoin is a remarkable cryptographic achievement</h2>
                        <p>The ability to create something which is not duplicable in the digital world has enormous value…Lot’s of people will build businesses on top of that.</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a data-scroll href="#services" className="btn btn-main">Explore Us</a>		
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>	
    
    <section className="counter section-sm">
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-3">
                    <div className="counters-item">
                        <span>$50B+</span>
                        <p>Bitcoin Served</p>
                    </div>
                </div>
                <div className="col-md-3 col-3">
                    <div className="counters-item">
                        <span>10M+</span>
                        <p>Server Build</p>
                    </div>
                </div>
                <div className="col-md-3 col-3">
                    <div className="counters-item">
                        <span>68</span>
                        <p>Countries Supported</p>
                    </div>
                </div>
                <div className="col-md-3 col-3">
                    <div className="counters-item kill-border">
                        <span>10B</span>
                        <p>Active Treades</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="about-2 section bg-gray" id="about">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 align-self-center">
                    <div className="align-self-center">
                        <h2>A New Kind of Digital Currency to change the world what we think</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae deleniti ipsa labore necessitatibus culpa veritatis quo accusantium, neque enim ea ad eaque iure, quas tempore velit, quibusdam dolor illo! Explicabo.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quisquam maiores iste soluta, nihil dolorem?</p>
                        <a href="#" className="btn btn-main">Learn More</a>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div id="myDiv" style={{width:'100%',height:400}}>
                        <p>Bitcoin graphs</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="services section-xs"  id="services">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12" >
                    <div className="service-block color-bg text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-safety-shield.png" alt="" />
                        </div>
                        <h3>Easy & Secure</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12" >
                    <div className="service-block text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-exchange.png" alt="" />
                        </div>
                        <h3>Instant Exchange</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12 mx-auto"  >
                    <div className="service-block color-bg text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-network.png" alt="" />
                        </div>
                        <h3>Strong Network</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12" >
                    <div className="service-block color-bg text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-safety-shield.png" alt="" />
                        </div>
                        <h3>Easy & Secure</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12" >
                    <div className="service-block color-bg text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-safety-shield.png" alt="" />
                        </div>
                        <h3>Easy & Secure</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12" >
                    <div className="service-block color-bg text-center">
                        <div className="service-icon text-center">
                            <img src="assets/images/icons/bitcoin-safety-shield.png" alt="" />
                        </div>
                        <h3>Easy & Secure</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci dictum facilisis vel id tellus. Nullam iaculis arcu at mauris dapibus consectetur.</p>
                    </div>
                </div>
            </div> 		
        </div>   	
    </section>       
      </div>
    );
  }
}
