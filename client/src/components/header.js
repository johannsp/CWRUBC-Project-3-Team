import React from 'react'
import { Navbar } from 'react-bootstrap';
import logo from '../images/classtimelogo.jpg'

function Header() {
  return (
    <Navbar bg="dark">
    <Navbar.Brand>
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Classtime app logo"
      />
    </Navbar.Brand>
  </Navbar>
  )
}

export default Header;