import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    changeFieldValue(field, value) {
        const { artical } = this.state;
        artical[field] = value;
        this.setState({ artical });
    }

    // doLogin() {
    //     const { username, password } = this.state;
        
    // }

    render() {
        return(
            <div className="bg-dark login-container">
                <div className="container">
                    <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form action={`/admin/login`} method="POST">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    name="userName"
                                    type="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Username" 
                                    onChange={(e) => this.changeFieldValue('username', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    name="password"
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={(e) => this.changeFieldValue('password', e.target.value)}
                                />
                            </div>
                            {/* <div className="form-group">
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" /> Remember Password
                                </label>
                                </div>
                            </div> */}
                            <button className="btn btn-primary btn-block" onClick={() => this.doLogin()}>Login</button>
                        </form>
                        <div className="text-center">
                            {/* <a className="d-block small" href="forgot-password.html">Forgot Password?</a> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
