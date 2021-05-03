import * as React from 'react';
import { Component } from 'react';

export interface FooterProps {

}

export interface FooterState {

}

class Footer extends React.Component<FooterProps, FooterState> {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">Place sticky footer content here.</span>
                </div>
            </footer>
        );
    }
}

export default Footer;