import { Card } from "react-bootstrap";

import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import { useAuth0 } from "@auth0/auth0-react";

import { DataContext } from '../../App';


import heart from '../../imgs/heart.svg'
import filledHeart from '../../imgs/heart-fill.svg'



const PokeCard = ({ name, img, id, needsFavorite = false }) => {
    const history = useHistory();
    const data = useContext(DataContext);

    const [favPoke, setFavPoke] = useState([]);
    const [favorited, setFavorited] = useState(false);
    const { isAuthenticated } = useAuth0();


    class Pokemon {
        constructor(name, img, id) {
            this.name = name;
            this.img = img;
            // this.url = url;
            this.id = id;
            // this.img = img;
            // this.types = types;
            // this.abilities = abilities;
            // this.fav = true;
        }
    }

    const officialArtworkURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`

    const getFavPoke = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await fetch(`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`);
            const resData = await res.json()
            setFavPoke(resData.favPoke);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleFavorite = async (e) => {
        e.preventDefault();
        setFavorited(!favorited);
        const tempArr = [...favPoke];
        tempArr.push(new Pokemon(name, officialArtworkURL, id));
        console.log(tempArr);
        setFavPoke(tempArr);
        console.log(favPoke);

        const res = await fetch(`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ favPoke: tempArr }),
            headers: {
                "Content-Type": "application/json"
            }
        })

    }

    const handleUnfavorite = async (e) => {
        e.preventDefault();
        const tempArr = favPoke.filter(function (el) {
            return el.name !== name;
        })
        console.log(tempArr);
        const res = await fetch(`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ favPoke: tempArr }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        data.userFavPoke = [...tempArr];
        console.log(data.userFavPoke);
        console.log(res);
        setFavPoke(tempArr);
        setFavorited(false);
    }

    useEffect(() => {

        getFavPoke();
    }, [])

    useEffect(() => {
        if (!favPoke) return;
        favPoke.map((pokemon) => {
            if (pokemon.name === name) {
                setFavorited(true)
            }

        })
    }, [favPoke])


    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    const checkForFav = () => {
        if (!data.userFavPoke) return;
        data.userFavPoke.map((pokemon) => {
            if (pokemon.name === name && !favorited) {
                setFavorited(true)
            }
        })
    }

    checkForFav();
    return (
        <Card onClick={() => { history.push(`/pokemon/${name}`) }} className='center-div shadow-box' border='dark' style={{ topMargin: '1rem !important', width: '18rem' }}>
            {needsFavorite && data.isAuthenticated && !favorited && (<Card.Header><img onClick={handleFavorite} src={heart} alt="" /></Card.Header>)}
            {needsFavorite && data.isAuthenticated && favorited && (<Card.Header><img onClick={handleUnfavorite} src={filledHeart} alt="" /></Card.Header>)}
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{capitalize(name)}</Card.Title>
                <Card.Text>#{id}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PokeCard;