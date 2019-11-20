import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser} from '../../../actions/authAction';
import classnames from 'classnames';
// import { tsImportEqualsDeclaration } from '@babel/types';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        //isAuntheticated dari state reducer
        if (nextProps.auth.isAuthenticated) {
            //direct user to dashboard after logged in
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            // this.setState({
            //     errors: nextProps.errors
            // })
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value} )
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData)
        // console.log(userData);
    }

    componentDidMount() {
        //if logged in and user navigates to Login page, should redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        } 
    }


    render() {

        const { errors } = this.state

        return (
            <div className="container">
                <div className="row" style={{ marginTop: "4rem" }}>
                    <div className="col s8 offset-s2">
                        <Link
                            to='/'
                            className='btn-flat waves-effect'
                        >
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to Home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.25px" }}>
                            <h4>
                                <b>Login </b> below
                            </h4>
                            <p className="grey-text text-darken-2">Don't have an account?          
                                <Link
                                    to='/register'
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                            <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id= "email"
                            type= "email"
                            className= {classnames('', { invalid: errors.email})}
                        >
                        </input>
                        <label htmlFor="email">Email</label>
                        <span className="red-text">{errors.email}</span>
                        </div>
                            
                        <div className="input-field col s12">
                            <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id= "password"
                            type= "password"
                            className={classnames ('', { invalid: errors.password })}
                        >
                        </input>
                        <label htmlFor="password">Password</label>
                        <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.25px"}}>
                            <button className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                style={{
                                    width: '150px',
                                    borderRadius: '3px',
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                        </form>

                    </div>


                </div>
            
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth, //Receive state from authReducer
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);

//{loginUser} it's an action