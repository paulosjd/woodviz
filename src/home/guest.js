import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import {connect} from "react-redux";
import {setShowRegForm, focusUsernameInput} from "../store/actions/user";

class GuestHome extends Component {

    render() {
        return (
            <Container className='main-home'>
                <Row>
                <Col xs="4">
                    <h4>Welcome to DenBeast App</h4>
                    <p>
                        <span className='link-text' onClick={() => this.props.setShowReg(true)}>
                            Register
                        </span> {'or '}
                        <span className='link-text' onClick={this.props.usernameFocus}>
                            login
                        </span> {' and get stuck into some training'}
                    </p>
                    <div>
                        <span className='link-text small-font' data-field='username'
                              onClick={this.props.helpClickHandler}>
                            Username reminder
                        </span>{'. '}
                        <span className='link-text small-font' data-field='password'
                              onClick={this.props.helpClickHandler}>
                            Password reset
                        </span>.
                    </div>
                </Col>
                <Col xs="8">
                    <img height={300} src='images/board.png' />
                </Col>
            </Row>
            </Container>
        );
    }

}

const mapStateToProps = ({registration}) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        usernameFocus: () => dispatch(focusUsernameInput(true)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuestHome);