import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setShowBoardAdd, setShowBoardNameEdit} from "../../store/actions/activity";
import {syncBoardWithInd} from "../../store/actions/profile";
import {EscapeKeyAction} from "../../utils/use_key_actions";
import BoardNameEdit from "../../form/panel_items/board_name_edit";

const BoardList = ({boardNames, boardListIndex, setBoardListIndex, createNewBoard}) => {

    const [newNameVal, setNewNameVal] = useState('');
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const currentAction = content.activity.current;
    const showBoardAdd = content.activity.showBoardAdd;
    const showBoardNameEdit = content.activity.showBoardNameEdit;
    const isAuth = !!content.auth.user_id;

    let setupAction;
    if (currentAction === 'setup') {
        if (!showBoardAdd) {
            setupAction = (
                <ListGroupItem
                    className={isAuth ? 'add_board_btn' : 'add_board_btn faded'}
                    onClick={() => {
                        if (isAuth) {
                            dispatch(setShowBoardAdd(true))
                        }
                    }}
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
                let item;
                let editBtn;
                if (currentAction === 'setup' && !showBoardNameEdit && boardListIndex === ind) {
                    editBtn = (
                        <span onClick={() => dispatch(setShowBoardNameEdit(true))}
                              role="img" aria-label="info" id="target-edit-icon" className='edit-icon'
                        >&#x270F;</span>
                    )
                }
                if (boardListIndex === ind && showBoardNameEdit) {
                    item = (
                        <BoardNameEdit
                            name={name}

                        />
                    )
                } else {
                    item = (
                        <span style={{fontSize: '1.0rem'}}>{name}</span>
                    )
                }
                return (
                    <ListGroupItem
                        key={ind}
                        onClick={() => {
                            if (boardNames.length > 1) {
                                setBoardListIndex(ind);
                                dispatch(syncBoardWithInd())
                            }
                        }}
                        className={boardListIndex === ind ? 'board-lg-item active-item' : 'board-lg-item'}
                    >
                        {item}
                        {editBtn}
                    </ListGroupItem>
                )}
            )}
            { boardNames.length < 5 && setupAction }
        </ListGroup>
    )
};

export default BoardList;
