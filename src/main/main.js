import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction} from "../store/actions/activity";
import DemoBoard from '../board/board';
import RightHandPanel from './rh_panel';
import LeftHandPanel from './lh_panel';

class MainContainer extends Component {

    render() {
        let board;
        if (this.props.isAuth) {
            board = <DemoBoard />
        } else {
            board = <DemoBoard />
        }
        return (
            <Container className='main-home'>
                <Row>
                <LeftHandPanel xs='3'/>
                <Col xs='5'>
                    {/*<img height={450} src='images/demo_board.svg' />*/}
                    { board }

                    {/*<svg>*/}
                        {/*<circle cx="40" cy="40" r="24" fill='#00cc00' stroke=":#006600" onClick={()=>console.log('clicd')} onMouseOver={()=>console.log('mouseover ev')}/>*/}
                    {/*</svg>*/}
                </Col>
                <RightHandPanel xs='4'/>
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