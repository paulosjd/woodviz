import React, {Component} from 'react';
import decode from 'jwt-decode';
import {connect} from "react-redux";
import {Modal, ModalHeader} from 'reactstrap';
import {Formik} from 'formik';
import {RegisterSchema} from '../schemas/auth'
import {forgottenLogin, loginSuccess, registrationSubmit, setShowRegForm} from "../store/actions/user";
import AuthService from "../utils/auth_service";

class Register extends Component {
    constructor(props){
        super(props);
        this.postCreateAuth = this.postCreateAuth.bind(this);
        this.Auth = new AuthService();
    }

    postCreateAuth(token){
        this.Auth.setToken(token);
        this.props.loginSuccess(decode(token))
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="registration-modal">
                <ModalHeader>Register new beast</ModalHeader>
                <Formik
                    initialValues={{email: '', password: '', confirm_password: '', username: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        this.props.registrationSubmit(values, this.postCreateAuth)
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(errors.username && touched.username) ? 'text-input error'
                                            : 'form-item'}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        placeholder="Enter a password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        className={(errors.email && touched.email) ? 'text-input error' : 'form-item'}
                                    />
                                    <button type="submit" className="form-submit top-10">
                                        Submit
                                    </button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
        forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
        setShowReg: (val) => dispatch(setShowRegForm(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);