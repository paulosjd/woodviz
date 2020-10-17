import React, {Component} from 'react';
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setProblemListIndex, setProblemListGrade} from "../../store/actions/activity";
import BoardNameEdit from "./board_list";
import {syncBoardWithInd} from "../../store/actions/profile";
import {setSelectedHoldList} from "../../store/actions/board";
import ProblemsForm from "../../form/panel_items/problems"

class BoardProblems extends Component {

    // Show board holds num e.g. 8 X 10   select (with number of problems for each) ?? so if change grid know where have gone

    render() {
        console.log(this.props.problems)
        console.log(this.props.grades)
        console.log(this.props.problemListGrade)
        let problems = [];

        return (
            <div>
                <ProblemsForm
                    // handleCsvDownloadSubmit={getCsvDownload}
                    // setParamChoiceError={setParamChoiceError}
                    setParamChoiceError={() => {}}
                    gradeOptions={this.props.grades.map(val => {return {label: val, id: val}})}
                />
            </div>
        )
        // const setupAction = (
        //     <ListGroupItem
        //         className={isAuth ? 'add_board_btn' : 'add_board_btn faded'}
        //         onClick={() => {
        //             if (isAuth) {
        //                 dispatch(setShowBoardAdd(true))
        //             }
        //         }}
        //     >
        //         <span id='add_board_label' role="img" aria-label="plus" className='add_board_icon'>
        //             &#x2795;
        //         </span>
        //         <span>Add new board</span>
        //     </ListGroupItem>
        // )
        // return (
        //     <ListGroup className='top30'>
        //         {boardNames.map((name, ind) => {
        //             let item;
        //             let editBtn;
        //             if (currentAction === 'setup' && !showBoardNameEdit && boardListIndex === ind) {
        //                 editBtn = (
        //                     <span onClick={() => dispatch(setShowBoardNameEdit(true))}
        //                           role="img" aria-label="info" id="target-edit-icon" className='edit-icon'
        //                     >&#x270F;</span>
        //                 )
        //             }
        //             if (boardListIndex === ind && showBoardNameEdit) {
        //                 item = <BoardNameEdit name={name} />
        //             } else {
        //                 item = <span style={{fontSize: '1.0rem'}}>{name}</span>
        //             }
        //             return (
        //                 <ListGroupItem
        //                     key={ind}
        //                     onClick={() => {
        //                         if (boardNames.length > 1) {
        //                             setBoardListIndex(ind);
        //                             dispatch(syncBoardWithInd())
        //                         }
        //                     }}
        //                     className={boardListIndex === ind ? 'board-lg-item active-item' : 'board-lg-item'}
        //                 >
        //                     {item}
        //                     {editBtn}
        //                 </ListGroupItem>
        //             )}
        //         )}
        //         { boardNames.length < 5 && setupAction }
        //     </ListGroup>
        // )
    }
}

const mapStateToProps = ({activity, auth, board}) => {
    return {
        problemListIndex: activity.problemListIndex,
        problemListGrade: activity.problemListGrade,
        problems: board.problems,
        grades: board.grades,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProblemListIndex: (val) => dispatch(setProblemListIndex(val)),
        setProblemListGrade: (val) => dispatch(setProblemListGrade(val)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardProblems);