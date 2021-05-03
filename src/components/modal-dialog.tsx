import * as React from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface IModalDialogProps {
    title: string;
    message: string;
    buttons: ReadonlyArray<JSX.Element>;
}

export interface IModalDialogState {
    showModal: boolean;
    title: string;
    message: string;
    buttons: ReadonlyArray<JSX.Element>;
}

class ModalDialog extends React.Component<IModalDialogProps, IModalDialogState> {
    constructor(props: IModalDialogProps) {
        super(props);
        this.state = {
            showModal: false,
            title: this.props.title,
            message: this.props.message,
            buttons: this.props.buttons,
        } as IModalDialogState;
    }

    public changeState = (newState: IModalDialogState) => {
        this.setState({
            showModal: newState.showModal || false,
            title: newState.title,
            message: newState.message,
            buttons: newState.buttons,
        });
    };

    public show = () => this.setVisible(true);
    public hide = () => this.setVisible(false);

    toggleVisiblity = () => {
        this.setVisible(!this.state.showModal);
    };

    public setVisible = (visisbleState: IModalDialogState | boolean) => {
        console.log(`setting visibility ${visisbleState}`);
        if (typeof visisbleState === 'boolean') {
            this.setState({
                showModal: visisbleState,
            });
        } else {
            this.setState({
                ...this.state,
                ...visisbleState,
            });
        }
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.state?.showModal || false} toggle={this.toggleVisiblity}>
                    <ModalHeader toggle={this.toggleVisiblity}>{this.state.title}</ModalHeader>
                    <ModalBody>{this.state.message}</ModalBody>
                    <ModalFooter>{this.state.buttons}</ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalDialog;
