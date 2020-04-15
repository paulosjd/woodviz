import React, {Component} from 'react';
import { Navbar, UncontrolledTooltip, Alert } from 'reactstrap';
import {connect } from "react-redux";
import Login from '../auth/login'
import { } from '../store/actions/profile'
import { userLogout } from '../store/actions/auth'

class TopNav extends Component {

    render() {

        // TODO section of e.g. buttons to with users recent ticks (, problems working on list etc.
        // -- benchmarks  (record this alongside problem on rhs)

        let topRight;
        if (this.props.user_id) {
            topRight = (
                <button
                    type="button"
                    onClick={(e) => {
                        this.props.handleLogout(e);
                        this.props.userLogout()
                    }}
                >Logout</button>
            )
        } else {
            topRight = <Login/>
        }
        return (
            <Navbar>
                <span role="img" aria-label="Mushroom" className='nav-item' id="profile">&#x1F344;</span>
                <span className="mr-auto"
                >{ this.props.username }</span>
                { topRight }
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id,
        username: state.auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);