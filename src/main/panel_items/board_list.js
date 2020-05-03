import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

const BoardList = ({boardNameList, currentAction, boardListIndex, setBoardListIndex}) => {

    const testBoards = [
        {holdSet: {}, xCoords: [], yCoords: [], boardName: 'Set A'},
    ];
    console.log(boardListIndex)
    return (
        <ListGroup className='top30'>
            {testBoards.map((item, ind) => {
                // let editIcon;
                // if (currentAction === 'setup') {
                //     editIcon = (
                //         <span onClick={() => console.log(true)} role="img" aria-label="info" id="target-edit-icon">
                //             &#x270F;
                //         </span>
                //     )
                // }
                return (
                    <ListGroupItem
                        key={ind}
                        onClick={() => setBoardListIndex(ind)}
                        className={boardListIndex === ind ? 'board-lg-item active-item' : 'board-lg-item'}
                    >
                        <span>{item.boardName}</span>
                        {currentAction === 'setup' && (
                            <span onClick={() => console.log(true)} role="img" aria-label="info" id="target-edit-icon" className='edit-icon'>
                            &#x270F;
                        </span>
                        )}
                    </ListGroupItem>
                )})
            }
            {currentAction === 'setup' && (
                <ListGroupItem
                    className='add_board_btn'
                    onClick={() => console.log(3)}
                >
                    <span id='add_board_label' role="img" aria-label="plus" className='add_board_icon'>
                        &#x2795;
                    </span>
                    <span>Add new board</span>
                </ListGroupItem>
            )}
        </ListGroup>
    )
};

export default BoardList;
