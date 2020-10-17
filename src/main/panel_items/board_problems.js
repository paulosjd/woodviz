import React, {Component} from 'react';
import {connect, useSelector} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setProblemListIndex} from "../../store/actions/activity";
import {syncBoardWithInd} from "../../store/actions/profile";
import {setSelectedHoldList} from "../../store/actions/board";
import ProblemsForm from "../../form/panel_items/problems"

const BoardProblems = (props) => {

    // TODO grades list order-by according to that hardcoded order,
    // or google func sort by first 3 chars - might work
    const content = useSelector(state => state);
    const problemListIndex = content.activity.problemListIndex;
    const problems = content.board.problems;
    const grades = content.board.grades;
    const selectedGrades = content.activity.selectedGrades;

        console.log(selectedGrades)
        console.log(grades)
        let listGroups = [];
        const gradeList = selectedGrades.length > 0 ? selectedGrades : grades;

        gradeList.forEach((grade, ind) => {
            let lgItems = [];
            console.log(grade)
            problems[grade].forEach((problem, ind) => {
                console.log(problem)
                lgItems.push((
                    <ListGroupItem
                        key={`lgi_${grade}_${ind}`}
                        className='problem-item'
                        onClick={() => {}}
                    >
                        <span className='prob-name-label'>{problem.name}</span>
                        <span id='add_board_label' role="img" aria-label="plus" className='problem_rate_icon'>
                            &#x2795;
                        </span>
                    </ListGroupItem>
                ));
            });
            let lGroup = (
                <div key={`${grade}_${ind}`} className='top8'>
                    <span className='grade-label'>{grade}</span>
                    <ListGroup key={ind} className=''>
                        {lgItems}
                    </ListGroup>
                </div>
            );
            listGroups.push(lGroup)
        });
        return (
            <React.Fragment>
                <div>
                    <ProblemsForm
                        gradeOptions={grades.map(val => {return {label: val, id: val}})}
                    />
                </div>
                {listGroups}
            </React.Fragment>
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
};
export default BoardProblems;