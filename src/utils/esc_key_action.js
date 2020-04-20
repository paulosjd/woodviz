import React, {useEffect} from "react";
import PropTypes from "prop-types";

const useEscapeKeyAction = (actions) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Escape'){
            for (let action of actions) {
                action()
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    })
};

function EscapeKeyAction(props) {
    /** Component that runs the action prop (a callback function) if you click outside of it (and its children) */
    useEscapeKeyAction(props.actions);
    return <div>{props.children}</div>;
}

EscapeKeyAction.propTypes = {
    children: PropTypes.element.isRequired
};

export default EscapeKeyAction