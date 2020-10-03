import React, {useState} from 'react';
import {ListGroupItem} from "reactstrap";

const BoardNameEdit = ({name}) => {

    const [newNameVal, setNewNameVal] = useState(name);

    // const [yNum, setYNum] = useState(yPtNum);

    // span onclicm     onClick={() => dispatch(setEditBoardName(ind))}

    // needs OutsideAction wrapping !!


    return (
        <React.Fragment>
            <input
                type="text"
                value={newNameVal}
                placeholder=''
                maxLength={10}
                onKeyDown={e => {if (e.key === 'Enter' && newNameVal) {
                    // createNewBoard(newNameVal, isAuth)
                }}}
                onChange={(e) => setNewNameVal(e.target.value)}
                className='add_board_input'
            />
            { newNameVal && (
                <span id='edit_board_label' role="img" aria-label="plus" className='save_board_icon'
                      onClick={() => {}}
                >&#x2714;</span> )}
        </React.Fragment>
    )
};

export default BoardNameEdit

// onClick={() => createNewBoard(newNameVal, isAuth)}

// <Col xs={4} className='pad-left-0'>
//     { (yNum !== yPtNum || xNum !== xPtNum) && (
//         <button
//             onClick={() => updateBoardPoints({xNum, yNum, boardName, boardId}, isAuth)}
//             className='board-setup-btn'
//         >Save
//         </button>
//     )}
// </Col>