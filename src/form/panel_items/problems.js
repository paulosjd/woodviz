import React, {useState, useEffect} from "react";
import MultiSelect from "../multi_select"
import {useDispatch, useSelector} from "react-redux";
import {addSelectedGrade, removeSelectedGrade} from "../../store/actions/activity";

const ProblemsForm = ({gradeOptions}) => {

    const [dropDownClicked, setDropDownClicked] = useState(false);
    const [multiSelect, setMultiSelect] = useState(gradeOptions);  // contains the selected objects

    const content = useSelector(state => state);
    const selectedGrades = content.activity.selectedGrades;

    const dispatch = useDispatch();
    const addGrade = val => dispatch(addSelectedGrade(val));
    const removeGrade = val => dispatch(removeSelectedGrade(val));

    useEffect(() => {
        setMultiSelect(gradeOptions)
    }, [gradeOptions]);

    const handleOptionClick = val => {
        if (!selectedGrades.includes(val)) {
            addGrade(val)
        } else {
            removeGrade(val)
        }
    };

    return (
        <React.Fragment>
            <div className='inline problems-form'>
                <label className='grade-sel-lab'>Grades</label>
                <MultiSelect
                    dropDownClicked={dropDownClicked}
                    setDropDownClicked={setDropDownClicked}
                    optionsList={multiSelect}
                    selectedOptions={selectedGrades}
                    optionClicked={setMultiSelect}
                    handleOptionClick={handleOptionClick}
                    selectedOptStyles={selectedOptionsStyles}
                    optListStyles={optionsListStyles}
                    optionsHeight={32 * gradeOptions.length}
                />
            </div>
        </React.Fragment>
    )
};

export default ProblemsForm

const selectedOptionsStyles = {
    color: "#3c763d",
    backgroundColor: "#dff0d8"
};
const optionsListStyles = {
    backgroundColor: "#fcf8e3",
    color: "#8a6d3b"
};