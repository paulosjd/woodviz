import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import {setShowBoardAdd, setShowBoardNameEdit} from "../../store/actions/activity";
import {resetHoldset} from "../../store/actions/board";
import {syncBoardWithInd} from "../../store/actions/profile";
import {EscapeKeyAction} from "../../utils/use_key_actions";
import BoardNameEdit from "../../form/panel_items/board_name_edit";

const BoardList = ({boardListIndex, setBoardListIndex, createNewBoard}) => {

    const [newNameVal, setNewNameVal] = useState('');
    const dispatch = useDispatch();

    const content = useSelector(state => state);
    const currentAction = content.activity.current;
    let showBoardAdd = content.activity.showBoardAdd;
    const showBoardNameEdit = content.activity.showBoardNameEdit;
    const isAuth = !!content.auth.user_id;
    let boardNames = content.profile.boards.map(obj => obj.boardName);

    useEffect(() => {
        setNewNameVal('')
    }, [currentAction, content.activity.boardListIndex]);

    if (isAuth && !content.profile.boardsLoaded) {
        // Temp fix non-auth default board data display while load; this.props.boards.length expected to be 1
        boardNames = ['']
    }

    if (isAuth && boardNames.length === 1 && boardNames[0] === '') {
        showBoardAdd = true
    }

    let setupAction;
    if (currentAction === 'setup') {
        if (!showBoardAdd) {
            setupAction = (
                <ListGroupItem
                    className={isAuth ? 'add_board_btn' : 'add_board_btn faded'}
                    onClick={() => {
                        if (isAuth) {
                            dispatch(resetHoldset(''));
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
                            maxLength={18}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && newNameVal) {
                                    createNewBoard(newNameVal, isAuth)
                                }
                            }}
                            onChange={(e) => setNewNameVal(e.target.value)}
                            className='add_board_input'
                        />
                        { newNameVal && (
                            <span
                                id='add_board_label' role="img" aria-label="plus" className='save_board_icon'
                                onClick={() => {
                                    createNewBoard(newNameVal, isAuth);
                                    setNewNameVal('')}
                                }
                            >&#x2714;</span> )}
                    </ListGroupItem>
                </EscapeKeyAction>
            )
        }
    }

    if (boardNames.length === 1 && boardNames[0] === '') {
        return <div className='first_board_add_btn' style={{width: 220}}>{setupAction}</div>
    }

    return (
        <ListGroup className='top30'>
            {boardNames.map((name, ind) => {
                let item;
                let editBtn;
                if (currentAction === 'setup' && !showBoardNameEdit && !showBoardAdd && boardListIndex === ind && isAuth) {
                    editBtn = (
                        <span onClick={() => dispatch(setShowBoardNameEdit(true))}
                              role="img" aria-label="info" id="target-edit-icon" className='edit-icon'
                        >&#x270F;</span>
                    )
                }
                if (boardListIndex === ind && showBoardNameEdit) {
                    item = <BoardNameEdit name={name} />
                } else {
                    item = <span style={{fontSize: '1.0rem'}}>{name}</span>
                }
                let clsName = 'board-lg-item';
                if (boardListIndex === ind && !showBoardAdd) {
                    clsName += ' active-item'
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
                        className={clsName}
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
