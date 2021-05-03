import { connect } from 'react-redux';

import { IRootState } from '../Shared/Reducers';
import { joinPlayer } from '../Shared/Reducers/Entities/Player.reducer';
import { rollDice, startGame, endGame } from '../Shared/Reducers/Entities/GamingService.reducer';

import { Player } from 'app/Shared/Model/Player.model';
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from "reactstrap";

import { GamingRoom } from '../Shared/Model/GamingRoom.model';
import { GameJoinResult } from '../Shared/Model/GameJoinResult.model';
import PlayerWidget from './PlayerWidget';
import DiceRoller from './DiceRoller';
import AddPlayerDialog from './AddPlayerDialog';
import { RollingResult } from 'app/Shared/Model/RollingResult.model';
import { ToastContainer, toast } from "react-toastify";

import $ from 'jquery';

export interface GameBoardProps extends StateProps, DispatchProps {
    room: GamingRoom;
    playerId: string;
    onQuit: Function;
}

export interface GameBoardState {
    room?: GamingRoom;
    players?: Array<Player>;
    started?: boolean;
    nextTurn?: Player;
    gameOver?: boolean;
}

class GameBoard extends React.Component<GameBoardProps, GameBoardState> {

    private addPlayerDialogRef: React.RefObject<AddPlayerDialog> = React.createRef();
    private diceRollerRef: React.RefObject<DiceRoller> = React.createRef();
    private rolledOut = false;

    constructor(props: GameBoardProps) {
        super(props);

    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            room: this.props.room,
            players: this.copyPlayers(this.props.room),
            started: false,
            nextTurn: null,
            gameOver: false
        });
    }

    componentDidUpdate = (prevProps: GameBoardProps, prevState: GameBoardState) => {

        const { gameStarted, gameEnded, diceRolled } = { ...this.props };

        if (this.state?.gameOver === true) {
            console.log('Game is over, resetting...');

            this.resetPlayers();
            return;
        }

        const joinResult = this.props.result?.entity as GameJoinResult;
        if (joinResult && joinResult.joined !== undefined
            && (joinResult.players?.length !== this.state?.players?.length)) {
            if (joinResult.joined === true) {
                this.setState({
                    ...this.state,
                    players: joinResult.players,
                });
                $('#message').html(`Player ${joinResult.players[joinResult.players.length - 1].nickName} just added`);
            } else {
                // toastify
            }
        }



        if (gameStarted === true || diceRolled === true) {
            const rollingResult = this.props.gameResult.entity as RollingResult

            if (diceRolled === true) {
                if (this.props.result?.success !== true) {
                    this.showToast("error", this.props.result?.message || "Something went wrong, please try again");
                    this.diceRollerRef.current?.stop(-1);
                    this.rolledOut = true;
                    return;
                }

                const { currentPlayer, nextPlayer } = { ...rollingResult };
                if (this.rolledOut === false) {
                    this.diceRollerRef.current?.stop(rollingResult?.currentPlayer?.currentScore);
                    $('#message').html(`<strong>${currentPlayer?.nickName}</strong> got ${currentPlayer?.currentScore}, next turn: <strong>${nextPlayer?.nickName}</strong>`);
                    this.rolledOut = true;
                    this.updatePlayers(this.state.players, rollingResult);
                }
            }

            if (gameStarted && this.state?.started === false) {
                this.setState({
                    ...this.state,
                    nextTurn: rollingResult.nextPlayer,
                    room: {
                        ...this.state.room,
                        started: gameStarted
                    },
                    started: gameStarted,
                    gameOver: !gameStarted && gameEnded
                });
            }

        }
    }

    updatePlayers = (allPlayers: Array<Player>, rollingResult: RollingResult): void => {
        const currentPlayer = rollingResult?.currentPlayer;
        const nextTurn = rollingResult?.nextPlayer;

        const players = allPlayers?.filter(player => {
            if (player?.id === currentPlayer?.id) {
                player.totalScore = currentPlayer?.totalScore;
            }
            return player;
        });

        this.rolledOut = true;
        if (rollingResult.winner === true) {
            // const winner = players.sort((a, b) => b.totalScore - a.totalScore)[0];
            const winner = this.getWinner(players);
            $('#message').html(`Congratulations! <strong>${winner.nickName}</strong> won the game`);
        }

        this.setState({
            ...this.state,
            nextTurn,
            players,
            gameOver: rollingResult.winner === true
        });


    }

    getWinner = (players: Array<Player>): Player => {
        const sorted = players.sort((a, b) => a.totalScore < b.totalScore ? 1 : a.totalScore > b.totalScore ? -1 : 0);
        return sorted[0];
    }

    resetPlayers = (): void => {
        const players = this.state?.players?.filter(player => {
            player.totalScore = 0;
            return true;
        });

        this.rolledOut = true;
        this.showToast('success', 'Game is over');
        this.diceRollerRef.current?.stop(-1);
        this.setState({
            ...this.state,
            nextTurn: null,
            players,
            gameOver: false,
            started: false
        });
    }

    showToast = (type: string, message: string): void => {
        if (type === "success") {
            toast.success(message, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
            });
        } else {
            toast.error(message, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
            });
        }
    };

    copyPlayers = (room: GamingRoom): Array<Player> => {
        const players: Array<Player> = [];
        if (room?.allPlayers !== null || room?.allPlayers !== undefined) {
            for (const player of room?.allPlayers) {
                players.push(player);
            }
        }
        return players;
    }

    playerAtPosition = (pos: string): Player => {

        if (!this.state?.players) return null;

        for (const player of this.state?.players) {
            if (player.position === pos) {
                return player;
            }
        }
        return null;
    }

    onRollingDice = (): boolean => {
        let canRoll = false;
        if ((this.state?.room?.soloMode === true
            || this.props.playerId === this.state.nextTurn?.id) && this.state?.started === true) {
            canRoll = true;
            this.rolledOut = false;
            this.props.rollDice(this.state.nextTurn);
        }
        return canRoll;
    }

    showAddPlayerForm = () => {
        this.addPlayerDialogRef?.current?.show();
    }

    onCloseAddPlayerDialog = (player: Player): void => {
        if (player?.nickName) {
            this.props.joinPlayer(player);
        }
    }

    startGame = () => {
        this.props.startGame(this.state?.room?.id);
    }

    quitGame = () => {
        this.props.endGame(this.state?.room?.id);
        this.props.onQuit();
    }

    render() {

        const canPlay = this.state?.started === true || (this.state?.players?.length < 2 || false);
        const started = this.state?.started === true;
        const currentPlayer = this.state?.nextTurn;

        return (
            <div style={{ maxHeight: '70%' }}>
                {
                    (this.state?.room?.soloMode === true) ? (
                        <Button color="primary" onClick={() => this.showAddPlayerForm()}
                            disabled={this.state?.started === true || this.state?.players?.length === 4}>
                            Add Player
                        </Button>
                    ) : null
                }{' '}
                <Button color="secondary" onClick={this.startGame} disabled={canPlay} >
                    Play
                </Button>{' '}
                {/* <Button color="secondary" onClick={this.quitGame}>
                    Quit
                </Button> */}

                <Row style={{ maxHeight: '30%' }}>
                    <Col sm="8" className='justify-content-center' style={{ margin: 'auto' }}>
                        <PlayerWidget player={this.playerAtPosition('NORTH')} horizontal={false} gameStarted={started} currentPlayer={currentPlayer} />
                    </Col>
                </Row>

                <Row style={{ maxHeight: '30%' }}>
                    <Col sm="3">
                        <PlayerWidget player={this.playerAtPosition('WEST')} horizontal={true} gameStarted={started} currentPlayer={currentPlayer} />
                    </Col>

                    <Col sm="6">
                        <DiceRoller ref={this.diceRollerRef} room={this.state?.room} onTouchDice={this.onRollingDice} />
                    </Col>

                    <Col sm="3">
                        <PlayerWidget player={this.playerAtPosition('EAST')} horizontal={true} gameStarted={started} currentPlayer={currentPlayer} />
                    </Col>

                </Row>

                <Row style={{ maxHeight: '30%', paddingTop: '15px' }}>
                    <Col sm="8" className='justify-content-center' style={{ margin: 'auto' }}>
                        <PlayerWidget player={this.playerAtPosition('SOUTH')} horizontal={false} gameStarted={started} currentPlayer={currentPlayer} />
                    </Col>
                </Row>
                <AddPlayerDialog ref={this.addPlayerDialogRef} roomId={this.props.room?.id} onClose={this.onCloseAddPlayerDialog} />
                <ToastContainer />
            </div>
        );
    }
}


const mapStateToProps = ({ player, game }: IRootState) => ({
    result: player.result,
    gameResult: game.result,
    loadingPlayer: player.loading,

    startingGame: game.starting,
    rollingDice: game.rolling,
    endingGame: game.ending,

    gameStarted: game.started,
    diceRolled: game.rolled,
    gameEnded: game.ended,

});

const mapDispatchToProps = {
    joinPlayer,
    rollDice,
    startGame,
    endGame
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);


// export default GameBoard;