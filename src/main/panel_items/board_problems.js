import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setSelectedProblemId} from "../../store/actions/activity";
import {setProblemTicked} from "../../store/actions/profile";
import ProblemsForm from "../../form/panel_items/problems"
import {orderGrades, compareNames} from "../../utils/general"

const BoardProblems = (props) => {

    const content = useSelector(state => state);
    const problems = content.board.problems || [];
    let grades = content.board.grades || [];
    grades = grades.sort(orderGrades);
    const selectedGrades = content.activity.selectedGrades;
    const selectedProblemId = content.activity.selectedProblemId;

    const dispatch = useDispatch();
    const setProblemId = val => dispatch(setSelectedProblemId(val));

    let listGroups = [];
    const gradeList = selectedGrades.length > 0 ? selectedGrades : grades;

    gradeList.forEach((grade, ind) => {
        let lgItems = [];
        problems[grade].sort(compareNames).forEach((problem, ind) => {
            const tick = (
                <span
                    id='add_board_label' role="img" aria-label="plus" className='problem_tick_icon'
                    onClick={() => {
                        if (props.isAuth) {
                            dispatch(setProblemTicked({problemId: problem.id, ticked: !problem.ticked}))
                        }
                    }}
                >
                    {problem.ticked ? '\u2714' : '\u25FB'}
                </span>
            );
            lgItems.push((
                <ListGroupItem
                    key={`lgi_${grade}_${ind}`}
                    className={problem.id === selectedProblemId ? 'problem-item active-prob' : 'problem-item'}
                    onClick={(e) => {
                        if (e.target.className !== 'problem_tick_icon') {
                            setProblemId(problem.id)
                        }
                    }}
                >
                    <span className='prob-name-label'>{problem.name}</span>
                    {tick}
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
};

export default BoardProblems;