import { Nav } from "react-bootstrap";

import { useContext } from "react";

import { DataContext } from "../../App";

import { useHistory } from "react-router";

const FavPokeButton = () => {

    const history = useHistory();
    const data = useContext(DataContext)
    console.log(data.currentPokeUser);

    return (
        (data.currentPokeUser &&
        <Nav.Link onClick={()=> {history.push(`/${data.currentPokeUser.username}/favorite-pokemon`)}}>Favorite Pokemon</Nav.Link>
        )
        // <div>Hi</div>
    );
};

export default FavPokeButton;