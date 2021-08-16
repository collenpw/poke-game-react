import { Nav } from "react-bootstrap";

import { useContext } from "react";

import { DataContext } from "../../App";

import { useHistory } from "react-router";

const FavPokeButton = () => {

    const history = useHistory();

    return (
        <Nav.Link onClick={()=> {history.push(`/my/favorite-pokemon`)}}>Favorite Pokemon</Nav.Link>
    );
};

export default FavPokeButton;