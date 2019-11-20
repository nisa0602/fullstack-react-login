import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../actions/authAction';
// import { userInfo } from 'os';

class Dashboard extends Component {
    onLogOutClick = e => {
        e.prevenDefault();
        this.props.logoutUser();
    }

    render () {
        const {user} = this.props.auth
        return (
            <div style={{height: '72vh'}} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>You are logged in!</b>
                            <strong>{user ? ` ${user.username}` : ''}</strong>
                             {/*user.username.split('')*/}
                        </h4>
                        <button  className="btn btn-large waves-effect waves-light hoverable blue accent-3" 
                            style={{
                                width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"

                            }}
                            onClick={this.onLogOutClick}
                            type="submit"
                            >
                                Log Out!
                        </button>
                    
                    </div>
                
                </div>
            
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
//props auth dari state reducer

export default connect(mapStateToProps, { logoutUser }) (Dashboard);