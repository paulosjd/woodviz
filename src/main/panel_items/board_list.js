import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setShowBoardAdd} from "../../store/actions/activity";
import {syncBoardWithInd} from "../../store/actions/profile";
import {EscapeKeyAction} from "../../utils/use_key_actions";

const BoardList = ({boardNames, boardListIndex, setBoardListIndex, createNewBoard}) => {

    const [newNameVal, setNewNameVal] = useState('');
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const currentAction = content.activity.current;
    const showBoardAdd = content.activity.showBoardAdd;
    const isAuth = !!content.auth.user_id;
    // console.log(showBoardAdd)

    let setupAction;
    if (currentAction === 'setup') {
        if (!showBoardAdd) {
            setupAction = (
                <ListGroupItem
                    className='add_board_btn'
                    onClick={() => dispatch(setShowBoardAdd(true))}
                >
                <span id='add_board_label' role="img" aria-label="plus" className='add_board_icon'>
                    &#x2795;
                </span>
                    <span>Add new board</span>
                </ListGroupItem>
            )
        } else {
            setupAction = (
                <EscapeKeyAction actions={[() => dispatch(setShowBoardAdd(false))]}>
                    <ListGroupItem
                        className='add_board_form'
                    >
                        <input
                            type="text"
                            value={newNameVal}
                            placeholder='Name'
                            maxLength={10}
                            onKeyDown={e => {if (e.key === 'Enter' && newNameVal) {
                                createNewBoard(newNameVal, isAuth)
                            }}}
                            onChange={(e) => setNewNameVal(e.target.value)}
                            className='add_board_input'
                        />
                        { newNameVal && (
                            <span id='add_board_label' role="img" aria-label="plus" className='save_board_icon'
                                  onClick={() => createNewBoard(newNameVal, isAuth)}
                            >&#x2714;</span> )}
                    </ListGroupItem>
                </EscapeKeyAction>
            )
        }

    }

    return (
        <ListGroup className='top30'>
            {boardNames.map((name, ind) => {
                return (
                    <ListGroupItem
                        key={ind}
                        onClick={() => {setBoardListIndex(ind); dispatch(syncBoardWithInd())}}
                        className={boardListIndex === ind ? 'board-lg-item active-item' : 'board-lg-item'}
                    >
                        <span style={{fontSize: '1.0rem'}}>{name}</span>
                        {currentAction === 'setup' && boardListIndex === ind && (
                            <span onClick={() => console.log(true)} role="img" aria-label="info"
                                  id="target-edit-icon" className='edit-icon'>
                            &#x270F;
                        </span>
                        )}
                    </ListGroupItem>
                )})}
            { boardNames.length < 5 && setupAction }
        </ListGroup>
    )
};

export default BoardList;
