import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import Location from '../../Location/Location';

import heart from '../../imgs/heart.svg'
import filledHeart from '../../imgs/heart-fill.svg'

import { useAuth0 } from "@auth0/auth0-react";


const Pokemon = ({pokeName, pokeUser}) => {

    const { isAuthenticated } = useAuth0();

    const [favPoke, setFavPoke] = useState([]);
    const [pokeData, setPokeData] = useState(null);
    const [favorited, setFavorited] = useState(false);

    class Pokemon{
        constructor(name, id, img){
            this.name=name;
            this.id=id;
            this.img=img;
            this.fav = true;
        }
    }

    const getPokeData = async() => {
        const API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        try {
            const res = await fetch (API_ENDPOINT);
            const data = await res.json();
            setPokeData(data); 
        }
        catch (err) {
            console.log(err);
        }
        
    }

    const handleLoggedIn = () => {

        if(pokeUser){
            setFavPoke(pokeUser.favPoke);
        }

        favPoke.map((pokemon) => {
            if(pokemon.name===pokeData.name){
                setFavorited(true)
            }
        })
    }

    const handleFavorite = async (e) => {
        e.preventDefault();
        setFavorited(!favorited);
        favPoke.push(new Pokemon(pokeData.name, pokeData.id, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`))

        const res = await fetch (`http://localhost:4000/pokemon/${pokeUser._id}`,{
            method: 'PATCH',
            body: JSON.stringify({favPoke: favPoke}),
            headers: {
                "Content-Type": "application/json"
            }
        })

    }

    const handleUnfavorite = async (e) => {
        e.preventDefault();
        console.log(favPoke);

        const tempArr = favPoke.filter(function (el) {
            return el.name != pokeData.name;
        })

        console.log(tempArr);

        const res = await fetch (`http://localhost:4000/pokemon/${pokeUser._id}`,{
            method: 'PATCH',
            body: JSON.stringify({favPoke: tempArr}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        setFavorited(!favorited);
    }

    useEffect(()=> {

        getPokeData();

    }, []);

    useEffect(()=> {
        handleLoggedIn();
    }, [])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    if(!pokeData) return (
        <Spinner className='spinner'animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) 

        return (
            <div>
                <Card border='dark'style={{ width: '18rem' }}>
                    
                         
                        {isAuthenticated && !favorited && (<Card.Header><img onClick={handleFavorite} src={heart} alt="" /></Card.Header>)}
                        {isAuthenticated &&favorited && ( <Card.Header><img onClick={handleUnfavorite} src={filledHeart} alt="" /></Card.Header>)}
                        
                    <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} />
                    <Card.Body>
                        <Card.Title>{capitalize(pokeData.name)}</Card.Title>
                    </Card.Body>
                    <ListGroup className="abilities">
                        <ListGroup.Item>Abilities:</ListGroup.Item>
                        {pokeData.abilities.map((ability) => {
                            return (
                                <ListGroup.Item>{capitalize(ability.ability.name)}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    <ListGroup className="type">
                        <ListGroup.Item>Types:</ListGroup.Item>
                        {pokeData.types.map((type) => {
                            return (
                                <ListGroup.Item> <a href={`/type/${type.type.name}`}>{capitalize(type.type.name)}</a></ListGroup.Item>
                            )
                        })}
                    </ListGroup>    
                </Card>
                <Location pokeData={pokeData} capitalize={capitalize} />
                
            </div>
            ); 
};

export default Pokemon;