import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from "reactstrap";
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {
    setAction, setBoardListIndex, setShowBoardDeleteConfirm, setShowProblemEdit, setShowLoginHelp, setForgottenField
} from "../store/actions/activity";
import {resetSelectedHoldList} from "../store/actions/board";
import {createNewBoard, saveProblemHolds, syncBoardWithInd} from "../store/actions/profile";
import ActionItems from './panel_items/action_items'
import BoardList from './panel_items/board_list'
import ProblemInfo from './panel_items/problem_info'
import ProblemEdit from '../form/panel_items/problem_edit'
import OutsideAction from "../utils/outside_action";

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
                        <span className='link-text' data-field='username'
                              onClick={() => {
                                  this.props.setForgottenField('username');
                                  this.props.helpClick();
                              }}>
                            Username reminder
                        </span>{'. '}
                        <span className='link-text' data-field='password'
                              onClick={() => {
                                  this.props.setForgottenField('password');
                                  this.props.helpClick();
                              }}>
                            Password reset
                        </span>.
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
        let problemInfo;
        if (this.props.selectedProblem && this.props.showProblemEdit) {
            problemInfo = (
                <OutsideAction
                    action={() => this.props.setShowProblemEdit(false)}
                    ignoreIdList={['profile_board']}
                >
                    <ProblemEdit
                        problem={this.props.selectedProblem}
                        grade={this.props.problemGrade}
                        setShowProblemEdit={this.props.setShowProblemEdit}
                        saveProblemHolds={this.props.saveProblemHolds}
                        selectedHoldXList={this.props.selectedHoldXList}
                        selectedHoldYList={this.props.selectedHoldYList}
                    />
                </OutsideAction>
            )
        } else if (this.props.selectedProblem) {
            problemInfo = (
                <ProblemInfo
                    problem={this.props.selectedProblem}
                    grade={this.props.problemGrade}
                    setShowProblemEdit={this.props.setShowProblemEdit}
                />
            )
        }
        let boardList;
        if (this.props.currentAction === 'setup') {
            boardList = (
                <BoardList
                    boardListIndex={this.props.boardListIndex}
                    setBoardListIndex={this.props.setBoardListIndex}
                    createNewBoard={this.props.createNewBoard}
                />
            )
        } else if (!this.props.selectedProblem) {
            boardList = <div className='top20 left125'><span>{this.props.boardName}</span></div>
        }

        return (
            <Col xs={this.props.xs}>
                { intro }
                <ActionItems
                    currentAction={this.props.currentAction}
                    setAction={this.props.setAction}
                    syncBoard={this.props.syncBoard}
                />
                { boardList }
                { delBoardText }
                { problemInfo }
            </Col>
        );
    }
}

const mapStateToProps = ({auth, activity, board, profile}) => {
    let selectedProblem;
    let problemGrade = null;
    if (activity.selectedProblemId) {
        const flatProblems = Object.values(board.problems).flat();
        const ind = flatProblems.findIndex(obj => obj.id === activity.selectedProblemId);
        selectedProblem = flatProblems[ind];
        Object.entries(board.problems).forEach(([grade, problems]) => {
            let probIds = problems.map(obj => obj.id);
            if (probIds.includes(activity.selectedProblemId)) {
                problemGrade = grade;
            }
        })
    }
    return {
        currentAction: activity.current,
        boardListIndex: activity.boardListIndex,
        boards: profile.boards,
        isAuth: !!auth.user_id,
        boardsLoaded: profile.boardsLoaded,
        boardName: profile.boards[activity.boardListIndex].boardName,
        showBoardNameEdit: activity.showBoardNameEdit,
        showProblemEdit: activity.showProblemEdit,
        selectedProblem: selectedProblem,
        problemGrade: problemGrade,
        selectedHoldXList: board.selectedHoldXList,
        selectedHoldYList: board.selectedHoldYList,
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
        setShowProblemEdit: val => dispatch(setShowProblemEdit(val)),
        saveProblemHolds: (val) => dispatch(saveProblemHolds(val)),
        syncBoard: () => dispatch(syncBoardWithInd()),
        createNewBoard: (val, isAuth) => {
            if (isAuth) {
                dispatch(createNewBoard(val))
            }
        },
        helpClick: () => dispatch(setShowLoginHelp(true)),
        setForgottenField: (val) => dispatch(setForgottenField(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftHandPanel);