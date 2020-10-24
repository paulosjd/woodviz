import React from 'react';
import {Modal, ModalBody} from "reactstrap";

const ConfirmProblemDelete = ({
    isOpen, toggle, problemName, problemId, setShowProblemDeleteConfirm, deleteProblem
}) => {

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className="registration-modal">
            <ModalBody style={{padding: '1.5rem'}}>
                <div>
                    <p style={{lineHeight: 0.75}}>Are you sure you want to delete</p>
                    <p>{problemName}?</p>
                </div>
                <button
                    type="button"
                    className='gen-btn del-board-btn'
                    onClick={()=> deleteProblem(problemId)}
                >OK</button>
                <button
                    type="button"
                    className='gen-btn del-board-btn'
                    onClick={()=> setShowProblemDeleteConfirm(false)}
                >Cancel</button>
            </ModalBody>
        </Modal>
    )
};

export default ConfirmProblemDelete;
