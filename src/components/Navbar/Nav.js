import { Navbar, Container, Nav } from "react-bootstrap";

import Login from "../../Login/Login";

const Navigation = () => {
    return (
        
        <Navbar sticky='top' bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Login />
                </Nav>
            </Container>
         </Navbar>

    );
};

export default Navigation;