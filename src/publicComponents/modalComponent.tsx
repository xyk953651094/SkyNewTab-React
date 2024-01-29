import React from "react";
import {Modal} from "antd";

type propType = {
    displayModal: boolean,
    modalTitle: any,
    modalContent: any,
    modalOnOk: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    modalOnCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

type stateType = {}

interface ModalComponent {
    state: stateType,
    props: propType
}

class ModalComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal title={this.props.modalTitle}
                   closeIcon={false} centered destroyOnClose={true}
                   open={this.props.displayModal} onOk={this.props.modalOnOk} onCancel={this.props.modalOnCancel}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                {this.props.modalContent}
            </Modal>
        );
    }
}

export default ModalComponent;