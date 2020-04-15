import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from 'reactstrap';
import BoardSetup from './panel_items/board_setup'

class RightHandPanel extends Component {

    render() {

        let colBody;
        switch (this.props.currentAction) {
            case 'setup':
                colBody = (
                    <BoardSetup />
                )
        }

        return (
            <Col xs={this.props.xs}>
                {colBody}
            </Col>
        );
    }
}

const mapStateToProps = ({activity}) => {
    return {
        currentAction: activity.current,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightHandPanel);