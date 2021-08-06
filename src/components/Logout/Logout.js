import { Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = ({currentPokeUser}) => {
    const { logout } = useAuth0();

    return (  
        <Nav.Link  onClick={() => logout({ returnTo: window.location.origin })}>
         Log Out
        </Nav.Link>
    );
};

export default Logout;