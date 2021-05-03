import * as React from 'react';

import $ from 'jquery';

import { ToastContainer, toast } from "react-toastify";

export interface DiceProps {
    initMessage: string;
    rollPrompt: string;
    errorMessage: string;
    onDiceClick: Function;
}

export interface DiceState {
    num?: number;
    message?: string;
    rolling?: boolean;
}

class Dice extends React.Component<DiceProps, DiceState> {

    constructor(props: DiceProps) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({
            num: -1,
            message: this.props.initMessage,
            rolling: false
        });
    }

    componentDidUpdate = (prevProps: DiceProps, prevState: DiceState) => {
        this.showNumber();
    }

    error = (isError: boolean): void => {
        const message = (isError === true) ? this.props.errorMessage : this.props.initMessage;
        this.setState({
            ...this.state,
            message
        });
    }

    roll = () => {
        console.log('rolling dice...');

        this.setState({
            ...this.state,
            rolling: true
        });
    }

    setNumber = (num: number): void => {
        this.setState({
            ...this.state,
            rolling: false,
            num
        });
    }

    showNumber = () => {
        if (this.state?.rolling === true) {
            return;
        }

        const num = this.state.num;
        let cls = 'odd-';
        if (num % 2 === 0) {
            cls = 'even-';
        }
        $('#die').empty();
        for (let i = 1; i <= num; i++) {
            $('#die').append('<div class="dot ' + cls + i + '"></div>');
        }
    }

    handleDiceClick = (e) => {
        if (this.state?.rolling !== true) {
            const canRoll = this.props.onDiceClick();
            if (canRoll === true) {
                this.setState({
                    ...this.state,
                    rolling: true
                });
            } else {
                this.showError();
            }
        }
    }

    showError = (): void => {
        toast.error('Please start playing', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
        });
    };

    setDiceView = () => {
        let component = null;
        if (this.state?.rolling === true) {
            $('#die').empty();
            component = <img src="../content/images/src/images/animated-dice.gif" alt="Rolling, please wait" />;
        }
        return component;
    }

    render() {
        return (
            <div className='vertical-center'>
                {
                    (this.state?.rolling === true)
                        ? (
                            <div style={{ margin: 'auto', textAlign: 'center' }}>
                                <img src="../content/images/src/images/animated-dice.gif" alt="Rolling, please wait" />
                            </div>
                        ) : <div id="die" className="dice" onClick={this.handleDiceClick} style={{ margin: 'auto' }}></div>
                }
                <ToastContainer />
            </div>
        );
    }
}

export default Dice;


