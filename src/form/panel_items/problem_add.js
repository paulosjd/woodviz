import React, {Component} from 'react';
import {connect} from "react-redux";
import {Formik} from 'formik';
import {BoardProblemSchema} from '../../schemas/board_problem'

class ProblemAdd extends Component {

    render() {
        // onSubmit={val => forgottenLogin(forgotField, val)}
        const grades = ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a'];

        return (
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    grade: '6a',
                    selectedHoldXList: [this.props.selectedHoldX],
                    selectedHoldYList: [this.props.selectedHoldY]
                }}
                validationSchema={BoardProblemSchema}
                onSubmit={val => {
                    console.log(val)
                }}
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue} = props;
                    console.log(errors)
                    console.log(typeof this.props.selectedHoldY)
                    console.log(values)

                    // TODO will need something like the onchcange setFieldValue for setting multiple/array selected

                    // <input
                    // className='email-input'
                    // type='text' name='target_value'
                    // value={values.email}
                    // maxLength="50"
                    // onBlur={handleBlur}
                    // onChange={ e => { setFieldValue('email', e.target.value) }}
                    // />
                    setFieldValue
                    return (
                        <form onSubmit={handleSubmit} className='pa-form'>
                            <div className='pa-form-name'>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
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
                                                label={val}
                                                style={{}}>
                                            </option>)
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="form-submit top-10 bottom-14">
                                Save
                            </button>
                        </form>
                    );
                }}
            </Formik>
        );
    }
}

const mapStateToProps = ({auth, board}) => {
    return {
        isAuth: !!auth.user_id,
        username: auth.username,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
        hoverHoldX: board.hoverHoldX,
        hoverHoldY: board.hoverHoldY,
        selectedHoldX: board.selectedHoldX,
        selectedHoldY: board.selectedHoldY,
        holdSet: board.holdSet,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // forgottenLogin: (fType, val) => dispatch(forgottenLogin(fType, val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemAdd);