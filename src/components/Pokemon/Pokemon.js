import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import Location from './Location';
import Moves from './Moves';
import EvolutionChain from '../EvolutionChain/EvolutionChain';

import heart from '../../imgs/heart.svg'
import filledHeart from '../../imgs/heart-fill.svg'

import { useAuth0 } from "@auth0/auth0-react";

import { DataContext } from '../../App';

const Pokemon = ({match}) => {

    const data = useContext(DataContext);
    const history = useHistory();
    const { isAuthenticated } = useAuth0();

    const [favPoke, setFavPoke] = useState([]);
    const [pokeData, setPokeData] = useState(null);
    const [favorited, setFavorited] = useState(false);

    class Pokemon{
        constructor(name, id, img, types, abilities){
            this.name=name;
            this.id=id;
            this.img=img;
            this.types=types;
            this.abilities=abilities;
            this.fav = true;
        }
    }

    const getPokeData = async() => {
        const API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${match.params.pokemon}`
        try {
            const res = await fetch (API_ENDPOINT);
            const data = await res.json();
            setPokeData(data); 
        }
        catch (err) {
            console.log(err);
        }
        getFavPoke()
    }

    const getFavPoke = async() => {
        if(!isAuthenticated) return;
        try{
            const res = await fetch (`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`);
            const resData = await res.json()
            setFavPoke(resData.favPoke);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleFavorite = async (e) => {
        e.preventDefault();
        setFavorited(!favorited);
        const tempArr = [...favPoke]
        tempArr.push(new Pokemon(pokeData.name, pokeData.id, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`, pokeData.types, pokeData.abilities))
        console.log(tempArr);
        setFavPoke(tempArr);
        console.log(favPoke);

        const res = await fetch (`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`,{
            method: 'PATCH',
            body: JSON.stringify({favPoke: tempArr}),
            headers: {
                "Content-Type": "application/json"
            }
        })

    }

    const handleUnfavorite = async (e) => {
        e.preventDefault();
        const tempArr = favPoke.filter(function (el) {
            return el.name !== pokeData.name;
        })
        console.log(tempArr);
        const res = await fetch (`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`,{
            method: 'PATCH',
            body: JSON.stringify({favPoke: tempArr}),
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

    useEffect(()=> {

        getPokeData();

    }, []);

    useEffect(()=> {
        getFavPoke();
    }, [])
    
    useEffect(()=>{
        if(!pokeData || !favPoke) return;
        favPoke.map((pokemon) => {
            if(pokemon.name===pokeData.name){
                setFavorited(true)
            }
            
        })
    },[favPoke])
    
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const checkForFav = () => {
        if(!data.userFavPoke) return;
        data.userFavPoke.map((pokemon)=> {
            if(pokemon.name===match.params.pokemon && !favorited){
                setFavorited(true)
            }
        })
    }

    checkForFav();

    if(!pokeData) return (
        <Spinner className='spinner'animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) 

    console.log(pokeData);


        return (
            <div>
                <Card border='dark'style={{ width: '18rem' }}>
                    
                         
                        {data.isAuthenticated && !favorited && (<Card.Header><img onClick={handleFavorite} src={heart} alt="" /></Card.Header>)}
                        {data.isAuthenticated &&favorited && ( <Card.Header><img onClick={handleUnfavorite} src={filledHeart} alt="" /></Card.Header>)}
                        
                    <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} />
                    <Card.Body>
                        <Card.Title>{capitalize(pokeData.name)}</Card.Title>
                    </Card.Body>
                    <ListGroup className="abilities">
                        <ListGroup.Item className='bold'>Abilities:</ListGroup.Item>
                        {pokeData.abilities.map((ability) => {
                            return (
                                <ListGroup.Item><span className='ability' onClick={() => {history.push(`/abilities/${ability.ability.name}`)}}>{capitalize(ability.ability.name)}</span></ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item className='bold'>Types:</ListGroup.Item>
                        {pokeData.types.map((type) => {
                            return (
                                <ListGroup.Item className='type' onClick={() => {history.push(`/types/${type.type.name}`)}}><span className='type'>{capitalize(type.type.name)}</span></ListGroup.Item>
                            )
                        })}
                    </ListGroup>    
                </Card>
                <Location pokeData={pokeData} capitalize={capitalize} />
                <Moves pokeData={pokeData} capitalize={capitalize}/>
                {/* WORK IN PROGRESS */}
                {/* <EvolutionChain pokeData={pokeData}/> */}
                
            </div>
            ); 
};

export default Pokemon;