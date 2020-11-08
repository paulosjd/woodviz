import React, {useState} from "react";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getStars} from '../../utils/general'
import {BoardProblemSchema} from "../../schemas/board_problem";
import {setShowProblemDeleteConfirm} from "../../store/actions/activity";

const ProblemEdit = ({
    problem, grade, setShowProblemEdit, saveProblemHolds
}) => {

    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const isAuth = !!content.auth.user_id;
    const boardId = content.board.boardId;
    const tempXList = content.profile.tempXList;
    const tempYList = content.profile.tempYList;
    const [noSaveMsg, setNoSaveMsg] = useState(false);
    const grades = ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a'];
    const noSaveSpan = <span className='no_board_save'>Login required</span>;

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
                if (isAuth) {
                    let pData = {};
                    if (tempXList.length > 0) {
                        pData = {selectedHoldXList: tempXList, selectedHoldYList: tempYList}
                    }
                    saveProblemHolds({...val, ...pData, problemId: problem.id, boardId: boardId});
                    setShowProblemEdit(false)
                } else {
                    setNoSaveMsg(true);
                    setTimeout(() => setNoSaveMsg(false), 2500)
                }
            }}
        >
            {props => {
                const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
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
                                        value={values.rating}
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
                                className='edit-prob-btn save-confirm'
                            >
                                Save
                            </button>
                            <span
                                className='prob-edit-cancel'
                                onClick={() => dispatch(setShowProblemEdit(false))}
                            >
                                Cancel
                            </span>
                        </div>
                        {isAuth && (
                            <div className='del-prob-text'>
                            <span
                                onClick={() => dispatch(setShowProblemDeleteConfirm(true))}
                            >
                                Delete problem
                            </span>
                            </div>
                        )}
                        {noSaveMsg && noSaveSpan}
                    </form>
                );
            }}
        </Formik>
    );
};

export default ProblemEdit;
