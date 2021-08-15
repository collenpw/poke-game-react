import { Navbar, Container, Nav } from "react-bootstrap";

import Login from './Login';
import Logout from './Logout';
import FavPokeButton from "./FavPokeButton";

import logo from '../../imgs/logo.png'

import { useContext } from "react";
import { DataContext } from "../../App";

import { useHistory } from "react-router";

import { useAuth0 } from "@auth0/auth0-react";

const Navigation = ({ currentPokeUser }) => {

    const data = useContext(DataContext);
    const history = useHistory();
    const { user, isAuthenticated } = useAuth0();

    console.log(data);

    return (

        <Navbar className='my-nav' fixed='top' sticky='top' bg="dark" variant="dark">
            <Container className='no-padding h-100'>
                <Navbar.Brand onClick={() => { history.push('/') }} >
                    <img
                        src={logo}
                        width="160"
                        height="30"
                        className="d-inline-block align-top nav-img"
                        alt="okie-dokie-dex logo"
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => { history.push('/pokemon') }}>Pokemon</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/moves') }}>Moves</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/abilities') }}>Abilities</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/types') }}>Types</Nav.Link>
                    {isAuthenticated && currentPokeUser && (
                        <>
                            <FavPokeButton />
                        </>
                    )}
                </Nav >
                <Nav>
                    {!isAuthenticated && (<Login />)}
                    {isAuthenticated && currentPokeUser && (
                        <>
                            <Navbar.Text>Logged in as {currentPokeUser.username}:</Navbar.Text>
                            <Logout currentPokeUser={currentPokeUser} />
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>

    );
};

export default Navigation;