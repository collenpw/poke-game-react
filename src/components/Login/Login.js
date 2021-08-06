import { Form, Button, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {

    const { loginWithRedirect } = useAuth0();

    return (

        <Nav.Link href="/login" onClick={() => loginWithRedirect()}>Log In</Nav.Link>
    );
};

export default Login;