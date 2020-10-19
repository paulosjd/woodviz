import React, {Component} from 'react';
import {connect} from "react-redux";
import {setSelectedPanelHold} from "../../store/actions/activity";
import {setHandHold, delHandHold} from "../../store/actions/board";
import {updateBoardPoints, saveHoldSet} from "../../store/actions/profile";
import BoardPointsForm from '../../form/panel_items/board_points'
import HoldSetupForm from '../../form/panel_items/hold_setup'

class BoardSetup extends Component {
    state = {showSaveBtn: false};

    render() {
        const [xPtNum, yPtNum] = [this.props.xCoords.length, this.props.yCoords.length];
        let selPanelHoldInd;
        if (this.props.selectedPanelHold) {
            selPanelHoldInd = this.props.selectedPanelHoldY * 14 + this.props.selectedPanelHoldX
        }

        const hsholdIsSelected  = !!this.props.holdSet[''.concat(this.props.selectedHoldX, this.props.selectedHoldY)];
        let saveBtn;
        if (this.state.showSaveBtn) {
            saveBtn = (
                <button
                    onClick={() => {
                        this.setState({ ...this.state, showSaveBtn: false });
                        this.props.saveHoldSet({
                            holdSet: this.props.holdSet,
                            boardWidth: xPtNum,
                            boardHeight: yPtNum,
                            boardName: this.props.boardName,
                            boardId: this.props.boardId,
                        });
                    }}
                    className='save-board-btn'
                >Save board
                </button>
            )
        }

        let setHoldBtn = (
            <span>Set board name to begin</span>
        );
        if (this.props.boardName) {
            setHoldBtn = (
                <button
                    onClick={() => {
                        this.props.setHandHold({svgDataInd: selPanelHoldInd});
                        if (this.props.isAuth) {
                            this.setState({ ...this.state, showSaveBtn: true })
                        }
                    }}
                    className='set-hold-btn'
                    disabled={!this.props.selectedHold || !this.props.selectedPanelHold}
                >Set hold
                </button>
            )
        }
        let rmHoldBtn;
        if (hsholdIsSelected) {
            rmHoldBtn = (
                <button
                    onClick={(val) => {
                        this.props.delHandHold(val);
                        if (this.props.isAuth) {
                            this.setState({ ...this.state, showSaveBtn: true })
                        }
                    }}
                    className='rm-hold-btn'
                >x</button>
            )
        }
        let boardDimsForm;
        if (Object.keys(this.props.holdSet).length === 0 && this.props.boardName){
            boardDimsForm = (
                <BoardPointsForm
                    xPtNum={xPtNum}
                    yPtNum={yPtNum}
                    updateBoardPoints={this.props.updateBoardPoints}
                    isAuth={this.props.isAuth}
                    boardName={this.props.boardName}
                    boardId={this.props.boardId}
                />
            )
        }

        return (
            <React.Fragment>
                { setHoldBtn }
                { this.props.showHoldsSavedNote && <span className='hold_set_saved'>Saved!</span> }
                { rmHoldBtn }
                { saveBtn }
                <HoldSetupForm
                    selectedPanelHoldX={this.props.selectedPanelHoldX}
                    selectedPanelHoldY={this.props.selectedPanelHoldY}
                    setSelectedPanelHold={this.props.setSelectedPanelHold}
                    boardHoldIsSelected={this.props.selectedHold}
                />
                { boardDimsForm }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({activity, auth, board}) => {
    return {
        isAuth: !!auth.user_id,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
        selectedHold: board.selectedHoldX !== null && board.selectedHoldY !== null,
        selectedHoldX: board.selectedHoldX,
        selectedHoldY: board.selectedHoldY,
        selectedPanelHold: activity.selectedPanelHoldX !== null && activity.selectedPanelHoldY !== null,
        selectedPanelHoldX: activity.selectedPanelHoldX,
        selectedPanelHoldY: activity.selectedPanelHoldY,
        holdSet: board.holdSet,
        boardName: board.boardName,
        boardId: board.boardId,
        showHoldsSavedNote: activity.showHoldsSavedNote
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateBoardPoints: (val, isAuth) => dispatch(updateBoardPoints(val, isAuth)),
        setSelectedPanelHold: (val) => dispatch(setSelectedPanelHold(val)),
        setHandHold: (val) => dispatch(setHandHold(val)),
        delHandHold: (val) => dispatch(delHandHold(val)),
        saveHoldSet: (val) => dispatch(saveHoldSet(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSetup);