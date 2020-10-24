import React, {useEffect} from "react";

const useEscapeKeyAction = (actions, key) => {

    const handleKeyPress = (event) => {
        if (event.key === key){
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

export function EscapeKeyAction(props) {
    /** Component that runs the action prop (a callback function) if you click outside of it (and its children) */
    useEscapeKeyAction(props.actions, 'Escape');
    return <div>{props.children}</div>;
}
