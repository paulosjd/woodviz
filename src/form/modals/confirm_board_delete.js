import React from 'react';
import {Modal, ModalBody} from "reactstrap";

const ConfirmBoardDelete = ({
    isOpen, toggle, boardName, boardId, setShowBoardDeleteConfirm, deleteBoard
}) => {

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className="registration-modal">
            <ModalBody>
                <div>
                    <p style={{lineHeight: 0.75}}>Are you sure you want to delete</p>
                    <p>{boardName}?</p>
                </div>
                <button
                    type="button"
                    className='gen-btn del-board-btn'
                    onClick={()=> deleteBoard(boardId)}
                >OK</button>
                <button
                    type="button"
                    className='gen-btn del-board-btn'
                    onClick={()=> setShowBoardDeleteConfirm(false)}
                >Cancel</button>
            </ModalBody>
        </Modal>
    )
};

export default ConfirmBoardDelete;
