import React, {Component} from 'react';
import {connect} from "react-redux";
import {} from "../store/actions/user";

class UserHome extends Component {

    render() {
        return (
            <div className='main-home'>
            </div>
        );
    }

}

const mapStateToProps = ({auth, registration}) => {
    return {
        username: auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHome);