import React, {Component} from 'react';
import {Navbar} from 'reactstrap';
import {connect} from "react-redux";
import Login from '../auth/login'
import {userLogout} from '../store/actions/auth'
import ConfirmBoardDelete from '../form/modals/confirm_board_delete'
import ConfirmProblemDelete from '../form/modals/confirm_problem_delete'
import {setShowBoardDeleteConfirm, setShowProblemDeleteConfirm} from "../store/actions/activity";
import {deleteBoard, deleteProblem} from "../store/actions/profile";

class TopNav extends Component {

    render() {

        // TODO section of e.g. buttons to with users recent ticks (, problems working on list etc.
        // -- benchmarks  (record this alongside problem on rhs)

        let topRight;
        if (this.props.user_id) {
            topRight = (
                <button
                    type='button'
                    className='gen-btn nav-btn'
                    onClick={(e) => {
                        this.props.handleLogout(e);
                        this.props.userLogout()
                    }}
                >Logout</button>
            )
        } else {
            topRight = <Login/>
        }

        const navbar = (
            <Navbar>
                <span role="img" aria-label="Mushroom" className='nav-item' id="profile">&#x1F344;</span>
                <span className="mr-auto"
                >{ this.props.username }</span>
                { topRight }
            </Navbar>
        );

        if (this.props.showBoardDeleteConfirm) {
            return (
                <React.Fragment>
                    {navbar}
                    <ConfirmBoardDelete
                        toggle={() => this.props.setShowBoardDeleteConfirm(!this.props.showBoardDeleteConfirm)}
                        isOpen={this.props.showBoardDeleteConfirm}
                        boardName={this.props.boardName}
                        boardId={this.props.boardId}
                        setShowBoardDeleteConfirm={this.props.setShowBoardDeleteConfirm}
                        deleteBoard={this.props.deleteBoard}
                    />
                </React.Fragment>
            )
        }

        if (this.props.showProblemDeleteConfirm) {
            return (
                <React.Fragment>
                    {navbar}
                    <ConfirmProblemDelete
                        toggle={() => this.props.setShowProblemDeleteConfirm(!this.props.showProblemDeleteConfirm)}
                        isOpen={this.props.showProblemDeleteConfirm}
                        problemName={this.props.problemName}
                        problemId={this.props.selectedProblemId}
                        setShowProblemDeleteConfirm={this.props.setShowProblemDeleteConfirm}
                        deleteProblem={this.props.deleteProblem}
                    />
                </React.Fragment>
            )
        }

        return navbar
    }
}

const mapStateToProps = ({auth, activity, board, profile}) => {
    const boardInd = activity.boardListIndex;
    let problemName;
    if (activity.selectedProblemId) {
        const flatProblems = Object.values(board.problems).flat();
        const ind = flatProblems.findIndex(obj => obj.id === activity.selectedProblemId);
        problemName = flatProblems[ind] ? flatProblems[ind].name : '';
    }
    return {
        user_id: auth.user_id,
        username: auth.username,
        showBoardDeleteConfirm: activity.showBoardDeleteConfirm,
        showProblemDeleteConfirm: activity.showProblemDeleteConfirm,
        boardName: profile.boards[boardInd].boardName,
        boardId: profile.boards[boardInd].boardId,
        selectedProblemId: activity.selectedProblemId,
        problemName: problemName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout()),
        setShowBoardDeleteConfirm: val =>  dispatch(setShowBoardDeleteConfirm(val)),
        setShowProblemDeleteConfirm: val =>  dispatch(setShowProblemDeleteConfirm(val)),
        deleteBoard: val => dispatch(deleteBoard(val)),
        deleteProblem: val => dispatch(deleteProblem(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);