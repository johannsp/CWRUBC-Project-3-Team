import React from 'react'
import { Navbar } from 'react-bootstrap';
import logo from '../images/classtimelogo.jpg'

function Header() {
  return (
    <Navbar sticky="top" className="justify-content-center">
    <Navbar.Brand className="mx-auto p-0">
      <img
        src={logo}
        width="325"
        height="100"
        className="d-inline-block align-top"
        alt="Classtime app logo"
      />
    </Navbar.Brand>
  </Navbar>
  )
}

export default Header;