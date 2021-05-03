# A very simple rolling dice game for fun

This application is a front end REACT app to inetegrate with the back-end API to:

* Create a game room with a name along with the owner name (a Player indeed)

* Add Player(s) using 'Add Player' option once the room is successfully created

* Start the game using the Play buttton



## Pre Requisits

* Node.js

* npm - Node package installer

## How to run

* Clone the project using git clone https://github.com/mdaliazam/az-rolling-dice-game-front.git

* Install dependencies using CLI by running `npm install` (without quote character)

* Run `npm start`

By default, the front-end app will integrate back-end API wiht http://localhost:8080/api. This URL is configured in .env file located in the root folder. You may change it to point where you install the back-end 

## Limitations
* GUI is not so professional

* Not so well tested

* Not tested in disconnected mode

* Only solo mode is possible as of now. Not a true online multiplayer game

## Back-end

You can find back-end project at https://github.com/mdaliazam/az-rolling-dice-game-back

Thank you