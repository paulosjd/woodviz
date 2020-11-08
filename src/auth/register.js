import React, {Component} from 'react';
import decode from 'jwt-decode';
import {connect} from "react-redux";
import {Modal, ModalHeader} from 'reactstrap';
import {Formik} from 'formik';
import {RegisterSchema} from '../schemas/auth'
import {forgottenLogin, regLoginSuccess, registrationSubmit, setShowRegForm} from "../store/actions/auth";
import AuthService from "../utils/auth_service";
import {authConstants as constants} from "../store/constants/auth";
import {fetchProfileData} from "../store/actions/profile";

class Register extends Component {

    state = {submitted: false};

    constructor(props){
        super(props);
        this.postCreateAuth = this.postCreateAuth.bind(this);
        this.Auth = new AuthService();
    }

    postCreateAuth(token){
        this.Auth.setToken(token);
        this.props.loginSuccess(decode(token));
    }

    render() {
        let submitErrorMsg;
        let emailErrorMsg;
        if (this.props.submitErrors) {
            if (this.props.submitErrors.email) {
                emailErrorMsg = <div className="auth-errors">{this.props.submitErrors.email}</div>
            } else {
                submitErrorMsg = <div className="auth-errors">{Object.values(this.props.submitErrors)[0]}</div>
            }
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="registration-modal">
                <ModalHeader>Register new beast</ModalHeader>
                <Formik
                    initialValues={{email: '', password: '', confirm_password: '', username: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        if (Object.keys(values).length > 3 && Object.keys(this.props.submitErrors).length < 1) {
                            this.setState({submitted: true});
                            this.props.registrationSubmit(values, this.postCreateAuth)
                        }
                    }}
                >
                    {props => {
                        const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                        return (
                            <div className="card">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        placeholder="Enter a username"
                                        type="text"
                                        maxLength={20}
                                        value={values.username}
                                        onChange={(val) => {
                                            this.setState({submitted: false});
                                            this.props.clearRegErrors();
                                            handleChange(val)
                                        }}
                                        onBlur={handleBlur}
                                        className={(errors.username && touched.username) ? 'text-input error'
                                            : 'form-item'}
                                    />
                                    {errors.username && touched.username && (
                                        <div className="auth-errors">{errors.username}</div>
                                    )}
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        placeholder="Enter a password"
                                        type="password"
                                        value={values.password}
                                        onChange={(val) => {
                                            this.setState({submitted: false});
                                            handleChange(val)
                                        }}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'form-item'
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="auth-errors">{errors.password}</div>
                                    )}
                                    <label htmlFor="password_confirm">Confirm password</label>
                                    <input
                                        id="password_confirm"
                                        placeholder="Re-enter password"
                                        type="password"
                                        onChange={(val) => {
                                            this.setState({submitted: false});
                                            handleChange(val)
                                        }}
                                        onBlur={handleBlur}
                                        autoComplete="off"
                                        className={errors.password_confirm && touched.password_confirm
                                            ? 'text-input error' : 'form-item'}
                                    />
                                    {errors.password_confirm && touched.password_confirm && (
                                        <div className="auth-errors">{errors.password_confirm}</div>
                                    )}
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        placeholder="Enter an email"
                                        type="text"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={(val) => {
                                            this.setState({submitted: false});
                                            this.props.clearRegErrors();
                                            handleChange(val)
                                        }}
                                        className={(emailErrorMsg || (errors.email && touched.email)) ?
                                            'text-input error' : 'form-item'}
                                    />
                                    {emailErrorMsg ? emailErrorMsg : errors.email && touched.email && (
                                        <div className="auth-errors">{errors.email}</div>
                                    )}
                                    <button
                                        type="submit"
                                        className="form-submit top-10 "
                                        disabled={this.state.submitted}
                                    >
                                        Submit
                                    </button>
                                    {submitErrorMsg}
                                </form>
                            </div>);
                    }}
                </Formik>
            </Modal>);
    }
}

const mapStateToProps = ({registration}) => {
    return {
        regData: registration.regData,
        showRegForm: registration.showRegForm,
        submitErrors: registration.registrationErrors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(regLoginSuccess(user)),
        registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
        forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
        fetchProfileData: () => dispatch(fetchProfileData()),
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        clearRegErrors: () => dispatch({ type: constants.SET_REGISTRATION_ERRORS, errors: '' }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);