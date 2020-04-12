import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/user";
import {setAction} from "../store/actions/activity";
import DemoBoard from '../board/board';
import ActionItems from './menu/action_items'

class GuestHome extends Component {

    render() {
        const intro = (
            <React.Fragment>
                <h3>Welcome to the Den</h3>
                <p><span className='link-text' onClick={() => this.props.setShowReg(true)}>Register</span> {'or '}
                    <span className='link-text' onClick={this.props.usernameFocus}> login</span>
                </p>
                <div className='bottom20'>
                    <span className='link-text small-font' data-field='username' onClick={this.props.helpClickHandler}>
                        Username reminder
                    </span>{'. '}
                    <span className='link-text small-font' data-field='password' onClick={this.props.helpClickHandler}>
                        Password reset
                    </span>.
                </div>
            </React.Fragment>
        );

        return (
            <Container className='main-home'>
                <Row>
                <Col xs="3">
                    { intro }
                    {/*{ this.state.selectedItem && (*/}
                        {/*<button className='lg-back-btn' onClick={() => this.setSelectedItem('')} >Back</button>) }*/}
                    <ActionItems
                        currentAction={this.props.currentAction}
                        setAction={this.props.setAction}
                    />
                </Col>
                <Col xs="5">
                    {/*<img height={450} src='images/demo_board.svg' />*/}
                    <DemoBoard

                    />
                    {/*<svg>*/}
                        {/*<circle cx="40" cy="40" r="24" fill='#00cc00' stroke=":#006600" onClick={()=>console.log('clicd')} onMouseOver={()=>console.log('mouseover ev')}/>*/}
                    {/*</svg>*/}
                </Col>
                <Col xs="4">
                    <h2>Foo</h2>
                </Col>
            </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({activity}) => {
        console.log(activity)
    return {
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
)(GuestHome);

// (
//     <svg height="20" width="20">
//         <circle cx="5" cy="5" r="4" stroke="black" fill="red" />
//     </svg>
// )