import { Navbar, Container, Nav } from "react-bootstrap";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import FavPoke from "../FavPoke/FavPoke";

import { useAuth0 } from "@auth0/auth0-react";

import logo from '../../imgs/logo.png'


const Navigation = () => {


    const { isAuthenticated } = useAuth0();

  
    return (
        
        <Navbar sticky='top' bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img 
                        src={logo}
                        width="160"
                        height="30"
                        className="d-inline-block align-top"
                        alt="okie-dokie-dex logo" 
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {!isAuthenticated && (
                        <Login />
                    )}
                    {isAuthenticated && (
                        <>
                            <Logout />
                            <FavPoke />
                        </>
                    )}
                </Nav>
            </Container>
         </Navbar>

    );
};

export default Navigation;