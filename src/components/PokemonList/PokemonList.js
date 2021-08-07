import { useHistory } from "react-router-dom";

import logo from '../../imgs/logo.png'

import { Form, Card, Spinner } from "react-bootstrap";

import { useState } from 'react'
import { useEffect } from "react";

const PokemonList = ( {setPokeName} ) => {

    const history = useHistory();

    const [pokeData, setPokeData] = useState(null);
    const [searchRes, setSearchRes] = useState(null);

    const getPokeData = async() => {
        try{
            const res = await fetch ('https://pokeapi.co/api/v2/pokemon/?limit=898')
            const data = await res.json()
            setPokeData(data.results);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleClick = async (name) => {
        history.push(`/pokemon/${name}`)
    }
    
    const handleChange = (e) => {
        const newArr = pokeData.filter(function (el) {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setSearchRes(newArr);
        console.log(searchRes);
    }

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        getPokeData();
    },[])

    if(!pokeData) return (
        <Spinner className='spinner'animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) 

        console.log(pokeData);

    return (
        
        <>

        <div className='search'>
            <img className='home-logo' src={logo} alt="Okie-Dokie-Dex logo" />
            <Form.Control onChange={handleChange} className='ability-search'type="text" placeholder="Search for a Pokemon" />
        </div>

        {searchRes && (
            <div className='pokeList'>

            {searchRes.map((pokemon) => {

                return (
                       
                    <Card border='dark' onClick={() => {handleClick(pokemon.name)}} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
                        <Card.Body>
                            <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.name)}</Card.Title>
                            <Card.Text className='poke-num'>
                                #{pokemon.url.split('/')[6]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                       
                   
                )
            })}


        </div>

        )}

        {!searchRes && (

        <div className='pokeList'>

            {pokeData.map((pokemon) => {

                return (
                       
                    <Card border='dark' onClick={() => {handleClick(pokemon.name)}} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
                        <Card.Body>
                            <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.name)}</Card.Title>
                            <Card.Text className='poke-num'>
                                #{pokemon.url.split('/')[6]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                       
                   
                )
            })}

        </div>
        )}
        </>
    )

}
export default PokemonList;