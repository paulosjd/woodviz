import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateBoardPoints} from "../../store/actions/profile";
import BoardPointsForm from '../../form/board_points_form'

class BoardSetup extends Component {

    render() {
        console.log(this.props.xCoords)
        const [xPtNum, yPtNum] = [this.props.xCoords.length, this.props.yCoords.length];

        return (
            <React.Fragment>
            <button>Clear holds</button>
                {/*  on confirm - this is map of holdgrid num to custom/individual look holds  - guest has deefault when clear go to dots*/}
            <BoardPointsForm
                xPtNum={xPtNum}
                yPtNum={yPtNum}
                updateBoardPoints={val => this.props.updateBoardPoints(val, this.props.isAuth)}
            />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({auth, board}) => {
    return {
        isAuth: !!auth.user_id,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateBoardPoints: (val, isAuth) => dispatch(updateBoardPoints(val, isAuth))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSetup);