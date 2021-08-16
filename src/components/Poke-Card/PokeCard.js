import { Card } from "react-bootstrap";

import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import { useAuth0 } from "@auth0/auth0-react";

import { DataContext } from '../../App';

import heart from '../../imgs/heart.svg'
import filledHeart from '../../imgs/heart-fill.svg'

import HELPER from "../../HELPER";

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
            this.id = id;
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
        setFavPoke(tempArr);

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
        setFavPoke(tempArr);
        setFavorited(false);
    }

    useEffect(() => {
        if(needsFavorite) {
            getFavPoke();

        }
    }, [])

    useEffect(() => {
        if (!favPoke) return;
        favPoke.map((pokemon) => {
            if (pokemon.name === name) {
                setFavorited(true)
            }

        })
    }, [favPoke])

    const checkForFav = () => {
        if (!data.userFavPoke) return;
        data.userFavPoke.map((pokemon) => {
            if (pokemon.name === name && !favorited) {
                setFavorited(true)
            }
        })
    }
    if (needsFavorite) { checkForFav() };

    return (
        <Card className='center-div shadow-box' border='dark' style={{ topMargin: '1rem !important', width: '18rem' }}>
            {needsFavorite && data.isAuthenticated && !favorited && (<Card.Header><img onClick={handleFavorite} src={heart} alt="" /></Card.Header>)}
            {needsFavorite && data.isAuthenticated && favorited && (<Card.Header><img onClick={handleUnfavorite} src={filledHeart} alt="" /></Card.Header>)}
            <Card.Img onClick={() => { history.push(`/pokemon/${name}`) }} variant="top" src={img} />
            <Card.Body onClick={() => { history.push(`/pokemon/${name}`) }}>
                <Card.Title>{HELPER.capitalize(name)}</Card.Title>
                <Card.Text>#{id}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PokeCard;