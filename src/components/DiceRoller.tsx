import { GamingRoom } from 'app/Shared/Model/GamingRoom.model';
import * as React from 'react';
import { Paper } from '@material-ui/core';

import Dice from './Dice';

export interface DiceRollerProps {
    room: GamingRoom;
    onTouchDice: Function;
}

export interface DiceRollerState {
    room: GamingRoom;
    rolling: boolean;
    currentNumber: number;

}

class DiceRoller extends React.Component<DiceRollerProps, DiceRollerState> {

    private diceRef: React.RefObject<Dice> = React.createRef();

    start = () => {
        this.diceRef.current?.roll();
    }

    stop = (num: number): void => {
        this.diceRef.current?.setNumber(num);
    }

    error = (isError: boolean): void => {
        this.diceRef.current?.error(isError);
    }

    onClickDice = () => {
        if (this.props?.onTouchDice !== null || this.props?.onTouchDice !== undefined) {
            return this.props?.onTouchDice();
        }
    }

    render() {
        return (
            <Paper elevation={3} style={{ padding: '10px', marginTop: '7px', height: '100%' }}>
                <Dice ref={this.diceRef} rollPrompt="Click to roll" initMessage="Yet to start" errorMessage="Something went wroing!"
                    onDiceClick={this.onClickDice} />
            </Paper>
        );
    }
}

export default DiceRoller;