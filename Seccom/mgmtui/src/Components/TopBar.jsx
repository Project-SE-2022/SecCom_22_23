import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function TopBar() {
    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgba(39,170,226,255)' }} variant="light">
            <Navbar.Brand href="/" style={{ paddingLeft: '4%' }}>
                <img
                    alt=""
                    src="/Logo.png"
                    width="199"
                    height="54"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{ paddingRight: '4%' }}>
                <Nav className="me-auto"></Nav>
                <Nav>
                    <Nav.Link href="#profile">
                        <img
                            alt=""
                            src="/profile.png"
                            width="47"
                            height="47"
                            className="d-inline-block align-top"
                        // onClick={() => keycloak.login()}
                        />
                    </Nav.Link>
                </Nav>
                <Nav style={{ paddingRight: '5px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                    SecCom user
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;