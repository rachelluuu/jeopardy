import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, pullRight } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand href="/jeopardy/"><b>Jeopardy!</b></NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/search'>
                                    <span className="fa fa-search fa-lg"></span>
                                    Browse
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/play'>
                                    <span className="fa fa-gamepad fa-lg"></span>
                                    Play
                                    </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar >
        );
    }
}

export default Header;