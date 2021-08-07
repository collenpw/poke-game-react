import { Navbar, Container, Nav } from "react-bootstrap";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import FavPokeButton from "../FavPoke/FavPokeButton";

import { useAuth0 } from "@auth0/auth0-react";

import logo from '../../imgs/logo.png'

import { useContext } from "react";
import { DataContext } from "../../App";

import { useHistory } from "react-router";


const Navigation = ({currentPokeUser}) => {

    const data = useContext(DataContext);
    // const { isAuthenticated } = useAuth0();
    const history = useHistory();
  
    return (
        
        <Navbar sticky='top' bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => {history.push('/')}} >
                    <img 
                        src={logo}
                        width="160"
                        height="30"
                        className="d-inline-block align-top"
                        alt="okie-dokie-dex logo" 
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    {!data.isAuthenticated && (
                        <Login />
                    )}
                    <Nav.Link onClick={()=> {history.push('/pokemon')}}>Pokemon</Nav.Link>
                    <Nav.Link onClick={()=> {history.push('/moves')}}>Moves</Nav.Link>
                    <Nav.Link onClick={()=> {history.push('/abilities')}}>Abilities</Nav.Link>                       
                    <Nav.Link onClick={()=> {history.push('/types')}}>Types</Nav.Link>
                    {data.isAuthenticated && currentPokeUser &&(
                        <>
                            <FavPokeButton />
                        </>
                    )}
                </Nav >
                <Nav>
                {data.isAuthenticated && currentPokeUser &&(
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