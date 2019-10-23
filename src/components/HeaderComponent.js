import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

//Site-wide header
class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = { isNavOpen: false };
    }

    //Mobile friendly: transform nav buttons into a hamburger menu on narrower screens
    toggleNav() { this.setState({ isNavOpen: !this.state.isNavOpen }); }

    //display the logo and tabs for Search and Play
    render() {
        return (
            <Navbar dark expand="md" fixed="top" >
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/jeopardy/"><img className='logo' src='./assets/images/logo.png' alt='Jeopardy!' /></NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/search'><span className="fa fa-search fa-lg"></span> Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/play'><span className="fa fa-gamepad fa-lg"></span> Play</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;