import React, {Component} from 'react';
import {connect} from "react-redux";
import {setSelectedPanelHold} from "../../store/actions/activity";
import {setHandHold} from "../../store/actions/board";
import {updateBoardPoints} from "../../store/actions/profile";
import BoardPointsForm from '../../form/panel_items/board_points'
import HoldSetupForm from '../../form/panel_items/hold_setup'

class BoardSetup extends Component {

    render() {
        const [xPtNum, yPtNum] = [this.props.xCoords.length, this.props.yCoords.length];
        let selPanelHoldInd;
        if (this.props.selectedPanelHold) {
            selPanelHoldInd = this.props.selectedPanelHoldY * 14 + this.props.selectedPanelHoldX
        }
        return (
            <React.Fragment>
                {/*<button>Clear holds</button>*/}
                    {/*  on confirm - this is map of holdgrid num to custom/individual look holds  - guest has deefault when clear go to dots*/}
                <BoardPointsForm
                    xPtNum={xPtNum}
                    yPtNum={yPtNum}
                    updateBoardPoints={val => this.props.updateBoardPoints(val, this.props.isAuth)}
                />
                <button
                    onClick={() => this.props.setHandHold({svgDataInd: selPanelHoldInd})}
                    className='set-hold-btn'
                    disabled={!this.props.selectedHold || !this.props.selectedPanelHold}
                >Set hold
                </button>
                { this.props.isAuth && (
                    <button
                        onClick={() => console.log('dispatch action sends board.setHolds object to server')}
                        className='save-board-btn'
                        disabled={!this.props.selectedHold || !this.props.selectedPanelHold || 3 == 3}
                    >Save board
                    </button>
                )}
                <HoldSetupForm
                    selectedPanelHoldX={this.props.selectedPanelHoldX}
                    selectedPanelHoldY={this.props.selectedPanelHoldY}
                    setSelectedPanelHold={this.props.setSelectedPanelHold}
                    boardHoldIsSelected={this.props.selectedHold}
                />
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
        selectedPanelHold: activity.selectedPanelHoldX !== null && activity.selectedPanelHoldY !== null,
        selectedPanelHoldX: activity.selectedPanelHoldX,
        selectedPanelHoldY: activity.selectedPanelHoldY,
        holdSet: board.holdSet,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateBoardPoints: (val, isAuth) => dispatch(updateBoardPoints(val, isAuth)),
        setSelectedPanelHold: (val) => dispatch(setSelectedPanelHold(val)),
        setHandHold: (val) => dispatch(setHandHold(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSetup);