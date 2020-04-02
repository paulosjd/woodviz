import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
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
                    <ListGroup className='menu-items-list'>
                        <ListGroupItem className='hover-background'>
                    <svg height="100" width="100">
                        <circle className='mkrpl'  onClick={()=>console.log('sdfsdf')} cx="50" cy="50" r="40" stroke="black" fill="red" />
                    </svg>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col xs="8">
                    <img height={450} src='images/board.png' />
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