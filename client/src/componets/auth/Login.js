import React, {Component} from 'react';
import axios from "axios";
import classnames from "classnames";


class Login extends Component {

    //함수
    //상태값
    //라이프사이클
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (e) {
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit (e) {
        e.preventDefault();

        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };

        // console.log(loginUser);
        axios
            .post("/users/login", loginUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors : err.response.data}));
    }
    render() {

        const {email, password, errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Login</h1>
                            <p className="lead text-center">Sign in your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid" : errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;