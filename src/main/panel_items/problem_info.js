import React from "react";
import {getStars} from '../../utils/general'
import {setShowBoardNameEdit} from "../../store/actions/activity";
const ProblemInfo = ({problem, grade}) => {

    return (
        <React.Fragment>
            <div className='top30 left125'>
                <span>{problem.name}</span>
            </div>
            <table className='prob-info'>
                <tbody>
                <tr className="">
                    <td>Grade</td>
                    <td className='align-right fs-med'>{grade}</td>
                </tr>
                <tr className="">
                    <td>Rating</td>
                    <td className='align-right'>
                        <span id='rating_icon' role="img" aria-label="stars" className='rating_icon'>
                            {getStars(problem.rating)}
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='top8 left125 fs14 font-light'>
                <span>{problem.notes}</span>
            </div>
            <div className='top14'>
                <button className='edit-prob-btn'>
                    <span onClick={() => {}}
                          role="img" aria-label="info" id="target-edit-icon" className='edit-prob-icon'
                    >&#x270F;</span>
                    Edit</button>
            </div>
        </React.Fragment>
    )
};

export default ProblemInfo;
