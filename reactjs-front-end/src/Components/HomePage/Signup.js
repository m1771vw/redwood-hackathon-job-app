import React, { Component } from 'react';


class Signup extends Component {
    render() {
        return (
            <div class="signup-container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="panel panel-login">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <a href="#" id="login-form-link">Login</a>
                                    </div>
                                    <div class="col-xs-6">
                                        <a href="#" class="active" id="register-form-link" onClick={this.registerClicked}>Register</a>
                                    </div>
                                </div>
                                <hr/>
					        </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                    
                                        <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form" style={{display: "block"}}>
                                            <div class="form-group">
                                                <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="" />
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="" />
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" />
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" />
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;