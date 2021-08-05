import { useHistory } from "react-router-dom";

import logo from '../../imgs/logo.png'

import Card from 'react-bootstrap/Card';

import { useState, useEffect } from 'react'

const PokemonList = ( {pokemon, setPokeName, setPokeData, setPokemon, filteredPokemon, setFilteredPokemon} ) => {

    const history = useHistory();

    // const [filteredPokemon, setFilteredPokemon] = useState(pokemon)
    const [search, setSearch] = useState('')

    const defaultPoke = [...pokemon]

    const handleClick = async (name) => {
        setPokeName(name);
        history.push(`/pokemon/${name}`)
    }
    
    const handleChange = (e) => {
        setFilteredPokemon(defaultPoke)
        setSearch(e.target.value)
        
        const newArr = pokemon.filter(function (el) {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setFilteredPokemon(newArr)
    }

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    console.log(filteredPokemon);

    // console.log(pokemon[68].url.split('/')[6]);

    if(!filteredPokemon) return(
        <div>Loading</div>
    )

    return (
        
        <>

        <div className='search'>
            <img className='home-logo' src={logo} alt="Okie-Dokie-Dex logo" />
            <input onChange={handleChange} className='pokesearch' placeholder='Search for a Pokemon' type="text" />
        </div>

        

        <div className='pokeList'>

            {filteredPokemon.map((pokemon) => {

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
        </>
    )

}
export default PokemonList;