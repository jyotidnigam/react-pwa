import React from 'react';
import { Link } from 'react-router-dom';
import { AccountDropdown } from 'tabler-react';
import { Navbar, Nav, Image} from 'react-bootstrap';
import 'tabler-react/dist/Tabler.css';

import { logout } from '../../Context/Actions/authActions';
import { useAuthDispatch, useAuthState } from '../../Context';
const Header = () => {

  const dispatch = useAuthDispatch();
  const { userDetails } = useAuthState();
    return <Navbar  bg="dark" variant="dark" expand="lg" className="p-4">
    <Navbar.Brand href="#home" className="mr-auto">
      <Image src="/images/logo.png" width="200"/>
    </Navbar.Brand>
      <Nav className="text-right">
        <Link to="/admin/builder" className="nav-link">Builder</Link>
        <Link to="/game-demo" className="nav-link">Demo</Link>
       </Nav>
      <Nav>
        <AccountDropdown
          avatarURL="/images/profile-avatar.png"
          options={[
            { icon: "user", value: `${userDetails && userDetails.name && userDetails.name}`},
            { icon: "settings", value: "Logout", to: "/login", onClick: () => logout(dispatch) },
          ]}
        />
      </Nav>
  </Navbar>
}


export default Header;