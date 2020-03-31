import React, {Component} from 'react';
import {connect} from "react-redux";
import AuthService from './utils/auth_service';
import TopNav from './home/top_nav';
import GuestHome from './home/guest';
import UserHome from './home/user';
import Forgotten from './auth/forgotten';
import Register from './auth/register';
import {loginSuccess, setShowRegForm} from "./store/actions/user";
import './auth/login.css';

const Auth = new AuthService();

class App extends Component {

    state = {
        showHelp: false,
        helpTopic: ''
    };

    componentDidMount() {
        if (Auth.loggedIn()) {
            try {
                const profile = Auth.getProfile();
                this.props.loginSuccess(profile);
            } catch (err) {
                Auth.logout();
            }
        }
    }

    toggleHelp(event) {
        this.setState({
            showHelp: !this.state.showHelp,
            helpTopic: !this.state.showHelp ? event.target.getAttribute('data-field') : ''
        })
    }

    render() {
        if (this.props.showRegForm) {
            return (
                <Register
                    toggle={() => this.props.setShowReg(!this.props.showRegForm)}
                    isOpen={this.props.showRegForm}
                />)
        }
        if (this.state.showHelp) {
            return (
                <Forgotten
                    toggle={this.toggleHelp.bind(this)}
                    isOpen={this.state.showHelp}
                    forgotField={this.state.helpTopic}
                />)
        }

        let main = (<GuestHome helpClickHandler={this.toggleHelp.bind(this)}/>);
        if (this.props.isAuth) {
            main = (<UserHome />);
        }

        return (
          <div className="App">
              <TopNav
                  handleLogout={() => Auth.logout()}
              />
              { main }
          </div>
        );
    }
}

const mapStateToProps = ({auth, registration}) => {
    return {
        isAuth: !!auth.user_id,
        showRegForm: registration.showRegForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        setShowReg: (val) => dispatch(setShowRegForm(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);