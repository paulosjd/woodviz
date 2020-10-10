import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {editBoardName} from "../../store/actions/profile";

const BoardNameEdit = ({name}) => {

    const [newNameVal, setNewNameVal] = useState(name);
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const isAuth = !!content.auth.user_id;
    const boardInd = content.activity.boardListIndex;
    const boardId = content.profile.boards[boardInd].boardId;

    return (
        <React.Fragment>
            <input
                type="text"
                value={newNameVal}
                placeholder=''
                maxLength={18}
                onKeyDown={e => {if (e.key === 'Enter' && newNameVal) {
                    if (isAuth) {
                        dispatch(editBoardName(newNameVal, boardId))
                    }
                }}}
                onChange={(e) => setNewNameVal(e.target.value)}
                className='add_board_input'
            />
            { newNameVal && (
                <span id='edit_board_label' role="img" aria-label="plus" className='save_board_icon'
                      onClick={() => {
                          if (isAuth) {
                              dispatch(editBoardName(newNameVal, boardId))
                          }
                      }}
                >&#x2714;</span>
            )}
        </React.Fragment>
    )
};

export default BoardNameEdit