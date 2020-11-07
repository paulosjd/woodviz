import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction} from "../store/actions/activity";
import Board from '../board/board';
import RightHandPanel from './rh_panel';
import LeftHandPanel from './lh_panel';

class MainContainer extends Component {

    render() {
        return (
            <Container className='main-home'>
                <Row>
                    <LeftHandPanel xs='3'/>
                    <Col xs='5'>
                        <Board />
                    </Col>
                    <RightHandPanel
                        xs='4'
                        isAuth={this.props.isAuth}
                    />
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({auth, activity}) => {
    return {
        isAuth: !!auth.user_id,
        currentAction: activity.current,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        usernameFocus: () => dispatch(focusUsernameInput(true)),
        setAction: (val) => dispatch(setAction(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);

// (
//     <svg height="20" width="20">
//         <circle cx="5" cy="5" r="4" stroke="black" fill="red" />
//     </svg>
// )