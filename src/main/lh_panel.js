import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction, setBoardListIndex} from "../store/actions/activity";
import {createNewBoard, editBoardName} from "../store/actions/profile";
import ActionItems from './panel_items/action_items'
import BoardList from './panel_items/board_list'

class LeftHandPanel extends Component {

    render() {
        console.log(this.props.boards)
        let intro;
        if (!this.props.isAuth) {
            intro = (
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
            )
        }

        // TODO - make visible upon click edit name button
        let delBoardBtn;
        if (this.props.currentAction === 'setup' && this.props.boards.length > 1) {

        }

        let boardNames = this.props.boards.map(obj => obj.boardName);
        if (this.props.isAuth && !this.props.boardsLoaded) {
            // Avoid non-auth default board data display while load; this.props.boards.length expected to be 1
            boardNames = ['']
        }

        return (
            <Col xs={this.props.xs}>
                { intro }
                <ActionItems
                    currentAction={this.props.currentAction}
                    setAction={this.props.setAction}
                />
                <BoardList
                    boardNames={boardNames}
                    boardListIndex={this.props.boardListIndex}
                    setBoardListIndex={this.props.setBoardListIndex}
                    createNewBoard={this.props.createNewBoard}
                />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usernameFocus: () => dispatch(focusUsernameInput(true)),
        setShowReg: val => dispatch(setShowRegForm(val)),
        setAction: val => dispatch(setAction(val)),
        setBoardListIndex: val => dispatch(setBoardListIndex(val)),
        createNewBoard: (val, isAuth) => {
            if (isAuth) {
                dispatch(createNewBoard(val))
            }
        },
        // editBoardName: (val, isAuth) => {
        //     if (isAuth) {
        //         dispatch(setEditBoardName(val))
        //     }
        // },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftHandPanel);