import React, {Component} from 'react';
import {connect} from "react-redux";
import AuthService from './utils/auth_service';
import TopNav from './main/top_nav';
import MainContainer from './main/main';
import Forgotten from './auth/forgotten';
import Register from './auth/register';
import {loginSuccess, setShowRegForm} from "./store/actions/auth";
import {fetchProfileData} from "./store/actions/profile";
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
                console.log('Fetching profile summary from App component');
                this.props.fetchProfileData()
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

        return (
          <div className="App">
              <TopNav
                  handleLogout={() => Auth.logout()}
              />
              <MainContainer helpClickHandler={this.toggleHelp.bind(this)}/>
          </div>
        );
    }
}

const mapStateToProps = ({auth, registration}) => {
    return {
        showRegForm: registration.showRegForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        fetchProfileData: () => dispatch(fetchProfileData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);