import React, {Component} from 'react';
import {useSelector} from "react-redux";
import {Col} from 'reactstrap';
import BoardProblems from './panel_items/board_problems'
import BoardSetup from './panel_items/board_setup'

const RightHandPanel = (props) => {

    const content = useSelector(state => state);
    const currentAction = content.activity.current;

    let colBody;
    switch (currentAction) {
        case 'problems':
            colBody = (
                <BoardProblems />
            );
            break;
        case 'setup':
            colBody = (
                <BoardSetup />
            )
    }

    return (
        <Col xs={props.xs}>
            {colBody}
        </Col>
    );
};

export default RightHandPanel