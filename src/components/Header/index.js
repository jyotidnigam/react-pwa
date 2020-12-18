import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
const Header = () => {
    return <Navbar  bg="dark" variant="dark" expand="lg" className="p-4">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/game-demo" className="nav-link">Demo</Link>
       </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;