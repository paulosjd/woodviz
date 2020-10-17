import React from "react";
import "./styles/multi_select.css"

const MultiSelect = ({
    optionsList, selectedOptStyles, handleOptionClick, dropDownClicked, setDropDownClicked, optionsHeight,
    optListStyles, selectedOptions
}) => {
    let selectedList = (
        <label className="selected-options-badges-list"
            onClick={(e) => {
                if (e.target.className === 'selected-badge-cross') {
                    // Remove item from selected when cross is clicked
                    handleOptionClick(e.target.parentElement.dataset.id)
                }
        }}>
            {selectedOptions.map((obj) => {
                return (
                    <span style={selectedOptionsStyles || selectedOptionsStyles}
                          key={obj} data-id={obj}
                          className="selected-options-badges" >{obj}
                          <span className='selected-badge-cross'>×</span>
                    </span>
                );
            })}
        </label>);

    const options = optionsList.map(el => {
        return (
            <li key={el.id} value={el.value} className="multi-select-item">
                <div className="option-list"
                     style={selectedOptions.includes(el.label) ? (optListStyles || optionsListStyles) : {}}
                     onClick={() => handleOptionClick(el.label)}>{el.label}
                </div>
            </li>
        );
    });

    return (
        <div className="multi-select" tabIndex="0"
             onBlur={() => setDropDownClicked(false)}>
            <div className="selected-options"
                 onClick={(e) => {
                     if ('selected-options-badges-list' !== e.target.className || !dropDownClicked) {
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
                {dropDownClicked ? options : null}
            </ul>
        </div>
    )
};

export default MultiSelect;

const selectedOptionsStyles = {color: "#000", backgroundColor: "#fff"};
const optionsListStyles = {backgroundColor: "cornflowerblue", color: "#fff"};