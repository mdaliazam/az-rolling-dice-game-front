import { GamingRoom } from 'app/Shared/Model/GamingRoom.model';
import * as React from 'react';
import { connect } from 'react-redux';

import { IRootState } from '../Shared/Reducers';
import { getRoomById, createRoom } from '../Shared/Reducers/Entities/GamingRoom.reducer';

import { Button } from "reactstrap";

import CreateRoomDialog from './CreateRoomDialog';
import GameBoard from './GameBoard'

import Cookies from 'universal-cookie';
import $ from 'jquery';

export interface GameBodyProps extends StateProps, DispatchProps { }

export interface GameBodyState {
    room?: GamingRoom;
}

class GameBody extends React.Component<GameBodyProps, GameBodyState> {

    private addRoomDialogRef: React.RefObject<CreateRoomDialog> = React.createRef();

    componentDidUpdate = (prevProps: GameBodyProps, prevState: GameBodyState) => {



        // is the result contains a room ??
        const result = this.props.result;
        if (result && result.success === true) {
            const room = result.entity as GamingRoom;
            if (this.isRoom(room) && prevState?.room?.id !== room.id) {
                this.saveRoomInCookie(room);
                this.setState({
                    ...this.state,
                    room
                });
            }
        }

        // else ??


    }

    isRoom = (val: any): boolean => {
        return val?.createdAt !== undefined;
    }

    instanceOfRoom = (object: any): any => {
        return
    }

    saveRoomInCookie = (room: GamingRoom): void => {
        const cookies = new Cookies();
        cookies.set('room-id', room.id, { path: '/' });
    }

    showCreateRoomDialog = () => {
        console.log('showing dialog...');

        this.addRoomDialogRef.current?.show();
    }

    onCreateRoomDialogClose = (room: GamingRoom): void => {
        this.props.createRoom(room);
    }

    handleGameQuit = () => {
        console.log('quiting game..');

        this.setState({
            ...this.state,
            room: null
        });
    }

    render() {
        if (this.state?.room) {
            $('#notice').html(`Game ${this.state?.room.name} is on the way`);
        }
        return (
            <main role="main" className="container">
                <h6 id='notice' style={{ paddingTop: '10px' }} className="mt-5">Create a room and play</h6>
                <p id='message'>Waiting somthing to happen</p>
                {
                    (!this.state?.room) ? (
                        <><Button color="primary" className="long-button" onClick={this.showCreateRoomDialog}>
                            Create Room
                        </Button>
                            <CreateRoomDialog ref={this.addRoomDialogRef} onClose={this.onCreateRoomDialogClose} /></>
                    ) : (
                            <GameBoard room={this.state?.room} playerId={this.state?.room?.allPlayers[0].id} onQuit={() => this.handleGameQuit()} />
                        )
                }
            </main>
        );
    }
}


const mapStateToProps = ({ player, gamingRoom }: IRootState) => ({
    result: gamingRoom.result,
    players: player.result.entities,
    loading: player.loading || gamingRoom.loading
});

const mapDispatchToProps = {
    createRoom,
    getRoomById,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);