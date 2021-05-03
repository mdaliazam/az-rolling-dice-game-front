import * as React from 'react';

import { Row, Col } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Label } from "reactstrap";
import { FormGroup } from 'reactstrap';
import { AvGroup, AvForm, AvField, AvInput } from 'availity-reactstrap-validation';

import { GamingRoom } from '../Shared/Model/GamingRoom.model'
import { Player } from 'app/Shared/Model/Player.model';

export interface ICreateRoomDialogProps {
  onClose: Function
}

export interface ICreateRoomDialogState {
  showModal: boolean;
}

class CreateRoomDialog extends React.Component<ICreateRoomDialogProps, ICreateRoomDialogState> {

  private nameFieldRef: React.RefObject<AvField> = React.createRef();
  private room = {} as GamingRoom;

  constructor(props: ICreateRoomDialogProps) {
    super(props);
    this.state = {
      showModal: false,
    } as ICreateRoomDialogState;
  }

  componentDidMount = () => {
    this.nameFieldRef?.current?.focus();
  }

  public changeState = (newState: ICreateRoomDialogState) => {
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
    return this.room;
  }

  toggleVisiblity = () => {
    this.setVisible(!this.state.showModal);
  };

  public setVisible = (visisbleState: ICreateRoomDialogState | boolean) => {
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
    this.room.name = values['name'];
    if (!this.room.allPlayers) {
      this.room.allPlayers = [];
    }
    this.room.allPlayers?.push({ nickName: values['player'] } as Player);
    this.props.onClose(this.room);
    this.hide();
  }

  handleInvalidSubmit(event, errors, values) {
    console.log(JSON.stringify(errors));

  }

  updatName = (e) => {
    this.room.name = e.value;
  }

  render() {
    return (
      <div>

        <Modal isOpen={this.state?.showModal || false} toggle={this.toggleVisiblity}>
          <AvForm onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidSubmit} model={this.room}>
            <ModalHeader toggle={this.toggleVisiblity}>Create New Room</ModalHeader>
            <ModalBody>

              <FormGroup>
                <Row>
                  <Col>
                    <AvField
                      ref={this.nameFieldRef}
                      name="name"
                      label="Room Name"
                      type="text"
                      errorMessage="Please enter a valid room name (2 to 10 characters long)"
                      validate={{
                        required: { value: true },
                        minLength: { value: 2 },
                        maxLength: { value: 10 },
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AvField
                      name="player"
                      label="Your Name"
                      type="text"
                      errorMessage="Please enter your name (2 to 10 characters long)"
                      validate={{
                        required: { value: true },
                        minLength: { value: 2 },
                        maxLength: { value: 10 },
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AvGroup check>
                      <Label>
                        <AvInput type="checkbox" name="soloMode" value={true} checked={this.room.soloMode = true} disabled />{' '}
                        Solo Mode?
                      </Label>
                    </AvGroup>
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

export default CreateRoomDialog;
