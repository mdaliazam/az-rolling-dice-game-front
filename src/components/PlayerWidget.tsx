import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Paper } from '@material-ui/core';

import { Player } from '../Shared/Model/Player.model';

export interface PlayerWidgetProps {
    player: Player;
    onQuit?: Function;
    horizontal: boolean;
    gameStarted: boolean;
    currentPlayer: Player;
}

export interface PlayerWidgetState {
    player: Player;
}

class PlayerWidget extends React.Component<PlayerWidgetProps, PlayerWidgetState> {

    componentDidMount = () => {
        this.setState({
            ...this.state,
            player: this.props.player
        });
    }

    componentDidUpdate = (prevProps: PlayerWidgetProps, prevState: PlayerWidgetState) => {
        if (prevState?.player?.id === this.state?.player?.id) {
            return;
        }

        this.setState({
            ...this.state,
            player: this.props.player
        });
    }

    quit = () => {
        if (this.props.onQuit) {
            this.props.onQuit();
        }
    }

    render() {
        const image = require("../images/player.jpg");
        let playerName = "Nobody";
        let imageClass = 'blurred';
        const { player, gameStarted, currentPlayer } = { ...this.props };
        const width = this.props.horizontal === true ? '90%' : '30%';
        const height = this.props.horizontal === true ? '90%' : '100%';

        if (player !== null) {
            imageClass = gameStarted === false ? 'active-player' : (player?.id === currentPlayer?.id ? 'active-player' : 'semi-blurred');
            playerName = player.nickName;
        }
        return (

            <Paper elevation={3} style={{
                padding: '10px', marginTop: '7px',
                maxWidth: width, maxHeight: height, textAlign: 'center',
                margin: 'auto'
            }}>
                <img src="../content/player.jpg" alt={playerName} className={imageClass} />
                <Typography variant="body2" color="textSecondary" component="p">
                    {`${player?.nickName || 'Not Joined'} ${player?.totalScore || ''}`}
                </Typography>
            </Paper>

        );
    }
}

export default PlayerWidget;