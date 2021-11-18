import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    return (
        <div className="Navigateion">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">MoodMood</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
            </Navbar>
        </div>
    );
}

export default Navigation;