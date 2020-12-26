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
    <div className="navbar-brand mr-lg-auto mr-md-0">
      <Link to="/admin"><Image src="/images/logo.png"/></Link>
      </div>
      <Nav className="text-right d-flex">
        <Link to="/admin/builder" className="nav-link">Builder</Link>
        <Link to="/admin/games" className="nav-link">Games</Link>
      </Nav>
      <Nav>
        <AccountDropdown
          avatarURL="/images/profile-avatar.png"
          options={[
            { icon: "user", value: `${userDetails && userDetails.name && userDetails.name}`},
            { icon: "settings", value: "Logout", to: "/", onClick: () => logout(dispatch) },
          ]}
        />
      </Nav>
  </Navbar>
}


export default Header;