import React, {Component} from 'react';
import {connect} from "react-redux";
import {Formik} from 'formik';
import AuthService from '../utils/auth_service';
import {setShowRegForm, loginSuccess, focusUsernameInput, setAwaitingAuth} from "../store/actions/auth";
import {LoginSchema} from '../schemas/auth'
import './login.css';
import {fetchProfileData} from "../store/actions/profile";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginFail: false,
        };
        this.usernameInput = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleFormSubmit(values){
        this.props.setAwaitingAuth(true);
        this.Auth.login(values.username, values.password)
            .then(profile => this.props.loginSuccess(profile))
            .then(() => this.props.fetchProfileData())
            .catch((e) => {console.log('auth reject'); console.log(e)  ;
                this.setState({loginFail: true});
                this.props.setAwaitingAuth(false)
            });
    }

    render() {
        if (this.props.focusUsernameInput) {
            this.usernameInput.current.focus()
        }
        const loginExtras = !this.state.loginFail ? (
            <label className='reg-label' onClick={() => this.props.setShowReg(true)}>Register</label>
        ) : (<label className='login-error'>Invalid credentials</label>);

        return (
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={this.handleFormSubmit}
            >
                {props => {
                    const {values, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <div className='login-form' style={{display: 'inline'}}>
                        <form onSubmit={handleSubmit}>
                            { loginExtras }
                            <input
                                type='text'
                                name='username'
                                placeholder='Username'
                                ref={this.usernameInput}
                                value={values.username}
                                disabled={this.props.awaitingAuth}
                                onBlur={val => {handleBlur(val); this.props.removeUsernameFocus()}}
                                onChange={val => {handleChange(val);this.setState({loginFail: false});}}
                                className=''
                            />
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={values.password}
                                onBlur={handleBlur}
                                disabled={this.props.awaitingAuth}
                                onChange={val => {handleChange(val); this.setState({loginFail: false})}}
                                className=''
                            />
                            <button
                                type='submit'
                                className={this.props.awaitingAuth ? 'disabled-btn' : ''}
                                disabled={this.props.awaitingAuth}
                            >Login
                            </button>
                        </form>
                        </div>
                    )
                }}
            </Formik>
        );
    }
}

const mapStateToProps = ({registration, auth}) => {
    return {
        registrationData: registration.regData,
        isSubmitting: registration.isSubmitting,
        submitErrors: registration.errors,
        passwordReset: registration.passwordReset,
        passwordResetSent: registration.passwordResetSent,
        usernameReminderSent: registration.usernameReminderSent,
        showRegForm: registration.showRegForm,
        focusUsernameInput: registration.focusUsernameInput,
        awaitingAuth: auth.awaitingAuth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        // regSubmitBegin: () => dispatch(regSubmitBegin()),
        // registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
        // demoAccessSubmit: (loginOnReg) => dispatch(demoRegistrationSubmit(loginOnReg)),
        setAwaitingAuth: val => dispatch(setAwaitingAuth(val)),
        setShowReg: val => dispatch(setShowRegForm(val)),
        removeUsernameFocus: () => dispatch(focusUsernameInput(false)),
        fetchProfileData: () => dispatch(fetchProfileData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);