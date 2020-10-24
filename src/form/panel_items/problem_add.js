import React, {Component} from 'react';
import {connect} from "react-redux";
import {Formik} from 'formik';
import {BoardProblemSchema} from '../../schemas/board_problem'
import {resetSelectedHoldList} from "../../store/actions/board";
import {saveProblemHolds} from "../../store/actions/profile";
import {getStars} from '../../utils/general'

class ProblemAdd extends Component {

    render() {
        const grades = ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a'];
        return (
            <Formik
                initialValues={{
                    name: '',
                    grade: '6a',
                    notes: '',
                    rating: '',
                    selectedHoldXList: this.props.selectedHoldXList,
                    selectedHoldYList: this.props.selectedHoldYList
                }}
                validationSchema={BoardProblemSchema}
                onSubmit={val => {
                    this.props.saveProblemHolds({...val, boardId: this.props.boardId})
                }}
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                    values.selectedHoldXList = this.props.selectedHoldXList;
                    values.selectedHoldYList = this.props.selectedHoldYList;
                    let hasValues = true;
                    Object.entries(values).forEach(([field, value]) => {
                        if (!['notes', 'rating'].includes(field) && value.length === 0) {
                            hasValues = false
                        }
                    });

                    return (
                        <form
                            onSubmit={handleSubmit}
                            className='pa-form'
                        >
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    maxLength={24}
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.name && touched.name && (
                                <div className="form-error-msg">{errors.name}</div>)}
                            <div>
                                <label htmlFor="grade">Grade</label>
                                <select
                                    id='grade'
                                    onChange={handleChange}
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
                            </div>
                            <div>
                                <label htmlFor="rating">Rating</label>
                                <select
                                    id='rating'
                                    onChange={handleChange}
                                    className='rating-select'
                                >
                                    <option value={0} label='' />
                                    <option value={1}>{getStars(1)}</option>
                                    <option value={2}>{getStars(2)}</option>
                                    <option value={3}>{getStars(3)}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="notes">Description</label>
                                <input
                                    id="notes"
                                    type="text"
                                    maxLength={35}
                                    value={values.notes}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className='fs12'
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={"form-submit top-10 bottom-14 ".concat(
                                        !hasValues ? 'greyed-btn' : '')}
                                    disabled={!hasValues}
                                >
                                    Save
                                </button>
                                {!values.selectedHoldXList.length > 0 && (
                                    <span className='sel-holds-txt'>Select holds</span>)}
                            </div>
                            {this.props.selectedHoldXList.length > 0 && (
                                <button
                                    onClick={this.props.resetSelectedHoldList}
                                    className='clear-holds-btn'
                                >
                                    Clear holds
                                </button>
                            )}
                        </form>
                    );
                }}
            </Formik>
        );
    }
}

const mapStateToProps = ({activity, auth, board, profile}) => {
    return {
        boardId: profile.boards[activity.boardListIndex].boardId,
        isAuth: !!auth.user_id,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
        hoverHoldX: board.hoverHoldX,
        hoverHoldY: board.hoverHoldY,
        selectedHoldX: board.selectedHoldX,
        selectedHoldY: board.selectedHoldY,
        selectedHoldXList: board.selectedHoldXList,
        selectedHoldYList: board.selectedHoldYList,
        holdSet: board.holdSet,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetSelectedHoldList: () => dispatch(resetSelectedHoldList()),
        saveProblemHolds: (val) => dispatch(saveProblemHolds(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemAdd);