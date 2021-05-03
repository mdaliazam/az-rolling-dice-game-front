import * as React from 'react';

import { Row, Col } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Label } from "reactstrap";
import { FormGroup } from 'reactstrap';
import { AvGroup, AvForm, AvField, AvInput } from 'availity-reactstrap-validation';

import { GamingRoom } from '../Shared/Model/GamingRoom.model';
import { Player } from '../Shared/Model/Player.model';

export interface IAddPlayerDialogProps {
  roomId: string;
  onClose: Function;
}

export interface IAddPlayerDialogState {
  showModal: boolean;
}

class AddPlayerDialog extends React.Component<IAddPlayerDialogProps, IAddPlayerDialogState> {

  private nameFieldRef: React.RefObject<AvField> = React.createRef();
  private player = {} as Player;

  constructor(props: IAddPlayerDialogProps) {
    super(props);
    this.state = {
      showModal: false,
    } as IAddPlayerDialogState;
  }

  componentDidMount = () => {
    this.nameFieldRef?.current?.focus();
  }

  public changeState = (newState: IAddPlayerDialogState) => {
    this.setState({
      showModal: newState.showModal || false
    });
  };

  public show = () => {
    this.setVisible(true);
    this.nameFieldRef?.current?.focus();
  }
  public hide = () => this.setVisible(false);

  public getName = (): GamingRoom => {
    return this.player;
  }

  toggleVisiblity = () => {
    this.setVisible(!this.state.showModal);
  };

  public setVisible = (visisbleState: IAddPlayerDialogState | boolean) => {
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

  handleFormSubmit = (event: any, values: any) => {
    this.player.nickName = values['name'];
    this.player.roomId = this.props.roomId;
    this.props.onClose(this.player);
    this.hide();
  }

  handleInvalidSubmit(event, errors, values) {
    console.log(JSON.stringify(errors));

  }

  updatName = (e) => {
    this.player.nickName = e.value;
  }

  render() {
    return (
      <div>

        <Modal isOpen={this.state?.showModal || false} toggle={this.toggleVisiblity}>
          <AvForm onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidSubmit} model={this.player}>
            <ModalHeader toggle={this.toggleVisiblity}>Create New Room</ModalHeader>
            <ModalBody>

              <FormGroup>
                <Row>
                  <Col>
                    <AvField
                      ref={this.nameFieldRef}
                      name="name"
                      label="Player Name"
                      type="text"
                      errorMessage="Please enter a valid name (2 to 10 characters long)"
                      validate={{
                        required: { value: true },
                        minLength: { value: 2 },
                        maxLength: { value: 10 },
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.hide()}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>

      </div >
    );
  }
}

export default AddPlayerDialog;
