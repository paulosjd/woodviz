import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction, setBoardListIndex} from "../store/actions/activity";
import ActionItems from './panel_items/action_items'
import BoardList from './panel_items/board_list'

class LeftHandPanel extends Component {

    render() {
        console.log(this.props.boards)
        const intro = (
            <React.Fragment>
                <p style={{fontSize: 'small'}}>
                    <span className='link-text' onClick={() => this.props.setShowReg(true)}>Register</span> {'or '}
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
            <Col xs={this.props.xs}>
                { intro }
                <ActionItems
                    currentAction={this.props.currentAction}
                    setAction={this.props.setAction}
                />
                <BoardList
                    boardNames={this.props.boards.map(obj => obj.boardName)}
                    boardListIndex={this.props.boardListIndex}
                    setBoardListIndex={this.props.setBoardListIndex}
                />
            </Col>
        );
    }
}

const mapStateToProps = ({activity, profile}) => {
    return {
        currentAction: activity.current,
        boardListIndex: activity.boardListIndex,
        boards: profile.boards,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usernameFocus: () => dispatch(focusUsernameInput(true)),
        setShowReg: val => dispatch(setShowRegForm(val)),
        setAction: val => dispatch(setAction(val)),
        setBoardListIndex: val => dispatch(setBoardListIndex(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftHandPanel);