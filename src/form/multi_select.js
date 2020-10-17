import React from "react";
import "./styles/multi_select.css"
import {useSelector} from "react-redux";

const MultiSelect = ({
    gradeOptions, selectedOptStyles, selectedBadgeClicked, dropDownClicked, setDropDownClicked, optionsHeight,
    optListStyles
}) => {

    const content = useSelector(state => state);
    const selectedGrades = content.activity.boardListIndex;
    let selected = [];
    gradeOptions.forEach(obj => {
        if (obj.value) {
            selected.push({ label: obj.label, id: obj.id });
        }
    });

    let selectedList = (
        <label className="selected-options-badges-list"
               onClick={(e) => {
                   if (e.target.className === 'selected-badge-cross') {
                       // Remove item from selected when cross is clicked
                       optionsOnchange(e.target.parentElement.dataset.id, false)
                   }
        }}>
            {selected.map((obj) => {
                return (
                    <span style={selectedOptionsStyles || selectedOptionsStyles}
                          key={obj.id} data-id={obj.id}
                          className="selected-options-badges" >{obj.label}
                          <span className='selected-badge-cross'>×</span>
                    </span>
                );
            })}
        </label>);

    const optionsOnchange = (index, value) => {
        /** Call the parents useState setter function with the updated selected options array.
         * This causes the component the be re-rendered with this updated array, whose objects are included
         * in the selected options array if they have a 'value' key which is truthy */
        let dd = gradeOptions.slice();
        dd[index].value = value;
        selectedBadgeClicked(dd);
    };

    const options = gradeOptions.map((el, i) => {
        return (
            <li key={el.id} value={el.value} className="multi-select-item">
                <div className="option-list"
                     style={el.value ? (optListStyles || optionsListStyles) : {}}
                     onClick={() => optionsOnchange(i, !el.value)}>{el.label}
                </div>
            </li>
        );
    });

    return (
        <div className="multi-select" tabIndex="0"
             onBlur={ () => setDropDownClicked(false) }>
            <div className="selected-options"
                 onClick={(e) => {
                     if ('selected-options-badges-list' !== e.target.className || !dropDownClicked){
                         setDropDownClicked(true)
                     } else setDropDownClicked(false)
                 }}
            >
                {selectedList}
                <div className="arrow"
                     onClick={ () => setDropDownClicked(!dropDownClicked) }
                >&#9660;</div>
            </div>
            <ul style={dropDownClicked ? {height: optionsHeight} : {}}
                className={"options " + (dropDownClicked ? "show" : "")}
            >
                { dropDownClicked ? options : null }
            </ul>
        </div>
    )
};

export default MultiSelect;

const selectedOptionsStyles = {color: "#000", backgroundColor: "#fff"};
const optionsListStyles = {backgroundColor: "cornflowerblue", color: "#fff"};