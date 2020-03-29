import React, {Component} from 'react';
import {connect} from "react-redux";
import {Spinner} from 'reactstrap';
import {
    setShowRegForm, loginSuccess, focusUsernameInput
} from "../store/actions/user";

class HomeMain extends Component {

    render() {

        return (
            <div className='main-home'>
                <p>fo</p>
                <p>
                    <span className='link-text' onClick={() => this.props.setShowReg(true)}>
                        Register
                    </span> {'or '}
                    <span className='link-text' onClick={this.props.usernameFocus}>
                        login
                    </span></p>
            </div>
        );
    }

}

const mapStateToProps = ({registration}) => {
    return {
        registrationData: registration.regData,
        isSubmitting: registration.isSubmitting,
        submitErrors: registration.errors,
        passwordReset: registration.passwordReset,
        passwordResetSent: registration.passwordResetSent,
        usernameReminderSent: registration.usernameReminderSent,
        showRegForm: registration.showRegForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        // forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        usernameFocus: () => dispatch(focusUsernameInput(true)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeMain);