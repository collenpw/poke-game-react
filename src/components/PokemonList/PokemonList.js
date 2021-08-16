import logo from '../../imgs/logo.png'

import { Form, Spinner } from "react-bootstrap";

import { useState, useEffect, useContext } from 'react';

import { DataContext } from "../../App";

import getAllPokemon from '../../_functions/getAllPokemon'
import TypeDropdown from "./TypeDropdown";
import PokeCard from "../Poke-Card/PokeCard";

const PokemonList = () => {

    const data = useContext(DataContext);

    const [type, setType] = useState('type');
    const [searchRes, setSearchRes] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [typeSearch, setTypeSearch] = useState(null);
    const [allPokemon, setAllPokemon] = useState(null);

    const handleChange = (e, arr) => {
        const newArr = arr.filter(function (el) {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        const newArr2 = arr.filter(function (el) {
            return el.url.split('/')[6].includes(e.target.value);
        })

        if (newArr.length > 0) setSearchRes(newArr);
        if (newArr2.length > 0) setSearchRes(newArr2);

    }

    const typeFilterSearch = (e, arr) => {
        const newArr = arr.filter(function (el) {
            return el.pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        const newArr2 = arr.filter(function (el) {
            console.log(el.url);
            return el.pokemon.url.split('/')[6].includes(e.target.value);
        })

        console.log(newArr);
        if (newArr.length > 0) setTypeSearch(newArr);
        if (newArr2.length > 0) setTypeSearch(newArr2);

    }

    const grabID = (url) => {
        return url.split('/')[6];
    }

    useEffect(() => {
        getAllPokemon(setAllPokemon);
    }, [])

    if (!allPokemon) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return (

        <div className='poke-list'>

            <div className='search'>
                <img className='home-logo' src={logo} alt="Okie-Dokie-Dex logo" />
                {!typeData && (
                    <div className='search-and-filter'>
                        <Form.Control onChange={(e) => { handleChange(e, allPokemon) }} className='pokemon-search' type="text" placeholder="Search for a Pokemon" />
                        <TypeDropdown className='type-drop' typeData={typeData} setTypeData={setTypeData} type={type} setType={setType} />
                    </div>

                )}
                {typeData && (
                    <div className='search-and-filter'>
                        <Form.Control onChange={(e) => { typeFilterSearch(e, typeData) }} className='pokemon-search' type="text" placeholder="Search for a Pokemon" />
                        <TypeDropdown className='type-drop' typeData={typeData} setTypeData={setTypeData} type={type} setType={setType} />
                    </div>

                )}
            </div>

            {/* displays search results from home */}

            {searchRes && !typeData && (
                <div className='pokeList'>
                    {searchRes.map((pokemon) => {
                        return (
                            <PokeCard
                                name={pokemon.name}
                                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                                id={grabID(pokemon.url)}
                            />
                        )
                    })}


                </div>

            )}

            {/* displays search results from filtered by type */}
            {typeSearch && typeData && (
                <div className='pokeList'>

                    {typeSearch.map((pokemon) => {
                        if (parseInt(pokemon.pokemon.url.split('/')[6]) > 898) return

                        return (
                            <PokeCard
                                name={pokemon.pokemon.name}
                                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png`}
                                id={grabID(pokemon.pokemon.url)}
                            />
                        )
                    })}


                </div>

            )}

            {/* displays filtered by type */}
            {typeData && !typeSearch && (
                console.log(typeData[0].name),
                <div className='pokeList'>

                    {typeData.map((pokemon) => {
                        if (parseInt(pokemon.pokemon.url.split('/')[6]) > 898) return

                        return (
                            <PokeCard
                                name={pokemon.pokemon.name}
                                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png`}
                                id={grabID(pokemon.pokemon.url)}
                            />
                        )
                    })}


                </div>

            )} 


            {/* displays all pokemon */}
            {!searchRes && !typeData && (

                <div className='pokeList'>

                    {allPokemon.map((pokemon) => {
                        return (
                            <PokeCard
                                name={pokemon.name}
                                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                                id={grabID(pokemon.url)}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )

}
export default PokemonList;