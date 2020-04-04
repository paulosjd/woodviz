import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/user";

class GuestHome extends Component {
    state = {
        selectedItem: ''
    };

    setSelectedItem(name) {
        this.setState({selectedItem: name})
    }

    render() {
        const intro = (
            <React.Fragment>
                <h4>Welcome to the Den</h4>
                <p><span className='link-text' onClick={() => this.props.setShowReg(true)}>Register</span> {'or '}
                    <span className='link-text' onClick={this.props.usernameFocus}> login</span>
                </p>
                <div className='bottom20'>
                    <span className='link-text small-font' data-field='username' onClick={this.props.helpClickHandler}>
                        Username reminder
                    </span>{'. '}
                    <span className='link-text small-font' data-field='password' onClick={this.props.helpClickHandler}>
                        Password reset
                    </span>.
                </div>
            </React.Fragment>
        );
        let listGroup;
        if (!this.state.selectedItem) {
            listGroup = (
                <ListGroup className='menu-items-list'>
                    <ListGroupItem>
                        <h4 style={{textAlign: 'center'}}>Boards</h4>
                    </ListGroupItem>
                    <ListGroupItem onClick={() => this.setSelectedItem('sfo')} className='board-item' >
                        <h4>Demo board</h4>
                    </ListGroupItem>
                </ListGroup>
            )
        }
        console.log(this.state.selectedItem)
        return (
            <Container className='main-home'>
                <Row>
                <Col xs="4">
                    { !this.state.selectedItem && intro }
                    { this.state.selectedItem && (
                        <button className='lg-back-btn' onClick={() => this.setSelectedItem('')} >Back</button>) }
                    { listGroup }
                </Col>
                <Col xs="8">
                    <img height={450} src='images/demo_board.svg' />
                </Col>
            </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({registration}) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowReg: (val) => dispatch(setShowRegForm(val)),
        usernameFocus: () => dispatch(focusUsernameInput(true)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuestHome);

// (
//     <svg height="20" width="20">
//         <circle cx="5" cy="5" r="4" stroke="black" fill="red" />
//     </svg>
// )