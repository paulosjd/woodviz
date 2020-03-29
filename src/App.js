import React, {Component} from 'react';
import {connect} from "react-redux";
import AuthService from './utils/auth_service';
import TopNav from './home/top_nav';
import HomeMain from './home/main';
import Register from './auth/register';
import {forgottenLogin, loginSuccess, refreshRegistration, registrationSubmit, regSubmitBegin, setShowRegForm
} from "./store/actions/user";
import './auth/login.css';

// import MainBody from './containers/main_body';

const Auth = new AuthService();

class App extends Component {

    // componentWillMount() {
    //     if (!Auth.loggedIn()) {
    //         this.props.history.replace('/login')
    //     } else {
    //         try {
    //             const profile = Auth.getProfile();
    //             this.props.loginSuccess(profile);
    //         } catch(err){
    //             Auth.logout();
    //         }
    //     }
    // }
    // handleLogout(action, actionCreator){
    //     Auth.logout();
    //     if (action === 'register') actionCreator();
    // }

    render() {
        if (this.props.showRegForm) {
            return (
                <Register
                    toggle={() => this.props.setShowReg(!this.props.showRegForm)}
                    isOpen={this.props.showRegForm}
                    isSubmitting={this.props.isSubmitting}
                    regSubmit={this.props.registrationSubmit}
                    regSubmitBegin={this.props.regSubmitBegin}
                    submitErrors={this.props.submitErrors}
                    onRegister={() => console.log(3)}
                    clearErr={() => console.log(3)}
                />)
        }
        return (
          <div className="App">
              <TopNav
                  handleLogout={() => Auth.logout()}
              />
              <HomeMain />
          </div>
        );
    }
}

const mapStateToProps = ({registration}) => {
    return {
        showRegForm: registration.showRegForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        refreshRegistration: () => dispatch(refreshRegistration()),
        regSubmitBegin: () => dispatch(regSubmitBegin()),
        registrationSubmit: (val, loginOnReg) => dispatch(registrationSubmit(val, loginOnReg)),
        forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
        setShowReg: (val) => dispatch(setShowRegForm(val)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);