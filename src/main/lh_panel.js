import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from "reactstrap";
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction, setBoardListIndex, setShowBoardDeleteConfirm} from "../store/actions/activity";
import {resetSelectedHoldList} from "../store/actions/board";
import {createNewBoard} from "../store/actions/profile";
import ActionItems from './panel_items/action_items'
import BoardList from './panel_items/board_list'

class LeftHandPanel extends Component {

    render() {
        let intro;
        if (!this.props.isAuth) {
            intro = (
                <React.Fragment>
                    <p style={{fontSize: 'small'}}>
                        <span className='link-text' onClick={() => this.props.setShowReg(true)}>Register</span> {'or '}
                        <span className='link-text' onClick={this.props.usernameFocus}> login</span>
                    </p>
                    <div className='bottom20'>
                    <span className='link-text' data-field='username' onClick={this.props.helpClick}>
                        Username reminder</span>{'. '}
                        <span className='link-text' data-field='password' onClick={this.props.helpClick}>
                        Password reset</span>.
                    </div>
                </React.Fragment>
            )
        }

        let delBoardText;
        if (this.props.boards.length > 1 && this.props.showBoardNameEdit) {
            delBoardText = (
                <div className='del-board-text'>
                    <span data-field='password' onClick={this.props.showDeleteBoard}>Delete board</span>
                </div>
            )
        }

        return (
            <Col xs={this.props.xs}>
                { intro }
                <ActionItems
                    currentAction={this.props.currentAction}
                    setAction={this.props.setAction}
                />
                <BoardList
                    boardListIndex={this.props.boardListIndex}
                    setBoardListIndex={this.props.setBoardListIndex}
                    createNewBoard={this.props.createNewBoard}
                />
                {delBoardText}
            </Col>
        );
    }
}

const mapStateToProps = ({auth, activity, profile}) => {
    return {
        currentAction: activity.current,
        boardListIndex: activity.boardListIndex,
        boards: profile.boards,
        isAuth: !!auth.user_id,
        boardsLoaded: profile.boardsLoaded,
        showBoardNameEdit: activity.showBoardNameEdit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usernameFocus: () => dispatch(focusUsernameInput(true)),
        setShowReg: val => dispatch(setShowRegForm(val)),
        setAction: val => {
            dispatch(setAction(val));
            dispatch(resetSelectedHoldList())
        },
        setBoardListIndex: val => {
            dispatch(setBoardListIndex(val));
            dispatch(resetSelectedHoldList())
        },
        showDeleteBoard: () =>  dispatch(setShowBoardDeleteConfirm(true)),
        createNewBoard: (val, isAuth) => {
            if (isAuth) {
                dispatch(createNewBoard(val))
            }
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftHandPanel);