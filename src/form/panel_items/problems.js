import React, {useState, useEffect} from "react";
import {Formik} from "formik";
import MultiSelect from "../multi_select"

const ProblemsForm = ({gradeOptions, setParamChoiceError}) => {

    console.log(gradeOptions)
    const [dropDownClicked, setDropDownClicked] = useState(false);
    const [multiSelect, setMultiSelect] = useState(gradeOptions);  // contains the selected objects
    // const selectedParams = multiSelect.filter(obj => obj.value).map(obj => obj.name);
    console.log(multiSelect)
    useEffect(() => {
        setMultiSelect(gradeOptions)
    }, [gradeOptions])

    return (
        <React.Fragment>
            <div className='inline'>
                <label style={{marginTop: 12, fontSize: 'small'}}>Grades</label>
                <MultiSelect
                    dropDownClicked={dropDownClicked}
                    setDropDownClicked={setDropDownClicked}
                    gradeOptions={multiSelect}
                    optionClicked={setMultiSelect}
                    selectedBadgeClicked={(val) => {setMultiSelect(val); setParamChoiceError(false)} }
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