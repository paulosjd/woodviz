import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

const ActionItems = ({currentAction, setAction}) => {

    const items = [
        {key: 'problems', label: 'Board problems'},
        {key: 'add', label: 'Add new problem'},
        {key: 'setup', label: 'Board setup'},
    ];

    return (
        <ListGroup className='menu-items-list'>
            {items.map(item => {
                return (
                    <ListGroupItem
                        key={item.key}
                        onClick={() => setAction(item.key)}
                        className={currentAction === item.key ? 'board-item active-item' : 'board-item'}
                    >
                        <h4>{item.label}</h4>
                    </ListGroupItem>
                )})
            }
        </ListGroup>
    )
};

export default ActionItems;
