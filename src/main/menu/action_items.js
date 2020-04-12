import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

const ActionItems = ({currentAction, setAction}) => {

    return (
        <ListGroup className='menu-items-list'>
            {/*  DRY  map arrays of state key and h4 label */}
            <ListGroupItem onClick={() => setAction('problems')}
                           className={currentAction === 'problems' ? 'board-item active-item' : 'board-item'} >
                <h4>Board problems</h4>
            </ListGroupItem>
            <ListGroupItem onClick={() => setAction('add')}
                           className={currentAction === 'add' ? 'board-item active-item' : 'board-item'} >
                <h4>Add new problem</h4>
            </ListGroupItem>
        </ListGroup>
    )
};

export default ActionItems;
