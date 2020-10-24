import React from "react";
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {getStars} from '../../utils/general'
import {BoardProblemSchema} from "../../schemas/board_problem";

const ProblemEdit = ({
    problem, grade, setShowProblemEdit, saveProblemHolds, selectedHoldXList, selectedHoldYList
}) => {

    const content = useSelector(state => state);
    const boardId = content.board.boardId;
    const grades = ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a'];
    console.log(selectedHoldXList)
    console.log(problem)
    return (
        <Formik
            initialValues={{
                name: problem.name,
                grade: grade,
                notes: problem.notes,
                rating: problem.rating,
                selectedHoldXList: problem.x_holds,
                selectedHoldYList: problem.y_holds
            }}
            validationSchema={BoardProblemSchema}
            onSubmit={val => {
                saveProblemHolds({...val, problemId: problem.id, boardId: boardId});
                // setShowProblemEdit(false)
            }}
        >
            {props => {
                const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                console.log(errors)
                return (
                    <form
                        onSubmit={handleSubmit}
                        className='prob-edit-form'
                    >
                        <div className='top30 left125'>
                            <input
                                id="name"
                                type="text"
                                placeholder="Name"
                                maxLength={24}
                                className='prob-edit-name'
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && touched.name && (
                            <div className="prob-edit-error">{errors.name}</div>)}
                        <table className='prob-info'>
                            <tbody>
                            <tr className="">
                                <td>Grade</td>
                                <td>
                                    <select
                                        id='grade'
                                        onChange={handleChange}
                                        value={values.grade}
                                    >
                                        {grades.map((val, ind) => {
                                            return (
                                                <option
                                                    key={`grade${ind}`}
                                                    value={val}
                                                    label={val}>
                                                </option>)
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr className="">
                                <td>Rating</td>
                                <td>
                                    <select
                                        id='rating'
                                        onChange={handleChange}
                                        style={{fontSize: 10, height: 22}}
                                    >
                                        <option value={0} label='' />
                                        <option value={1}>{getStars(1)}</option>
                                        <option value={2}>{getStars(2)}</option>
                                        <option value={3}>{getStars(3)}</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='top14 left125 font-light'>
                            <input
                                id="notes"
                                type="text"
                                placeholder="Description"
                                maxLength={35}
                                className='prob-edit-notes'
                                value={values.notes}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='top14'>
                            <button
                                type='submit'
                                className='edit-prob-btn'
                                // onClick={() => setShowProblemEdit(false)}
                            >
                                <span role="img" aria-label="info" id="target-edit-icon" className='edit-prob-icon'
                                >&#x270F;</span>
                                Save
                            </button>
                            <span
                                className='prob-edit-cancel'
                            >
                                Cancel
                            </span>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default ProblemEdit;
