import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { Component } from 'react';



export interface HeaderProps {

}

export interface HeaderState {

}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    {/* <a className="navbar-brand" href="#">Fixed navbar</a> */}
                    <h5 style={{ color: 'whitesmoke' }}>[Rolling Dice Game]</h5>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Game Rules</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;