import { useHistory } from "react-router-dom";

import logo from '../../imgs/logo.png'

import { Form, Card, Spinner } from "react-bootstrap";

import { useState } from 'react'
import { useEffect } from "react";

import TypeDropdown from "./TypeDropdown";

const PokemonList = ({ setPokeName }) => {

    const history = useHistory();

    const [type, setType] = useState('type');
    const [pokeData, setPokeData] = useState(null);
    const [searchRes, setSearchRes] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [typeSearch, setTypeSearch] = useState(null)

    const getPokeData = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=898')
            const data = await res.json()
            setPokeData(data.results);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClick = async (name) => {
        history.push(`/pokemon/${name}`)
    }

    const handleChange = (e, arr) => {
        const newArr = arr.filter(function (el) {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        const newArr2 = arr.filter(function (el) {
            console.log(el.url);
            return el.url.split('/')[6].includes(e.target.value);
        })

        // console.log(newArr2);

        if (newArr.length > 0) setSearchRes(newArr);
        if (newArr2.length > 0) setSearchRes(newArr2);

        // setSearchRes(newArr);
        // console.log(searchRes);
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

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        getPokeData();
    }, [])

    if (!pokeData) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    console.log(pokeData);

    console.log(typeData);

    return (

        <>

            <div className='search'>
                <img className='home-logo' src={logo} alt="Okie-Dokie-Dex logo" />
                {!typeData && (
                    <div className='search-and-filter'>
                        <Form.Control onChange={(e) => { handleChange(e, pokeData) }} className='pokemon-search' type="text" placeholder="Search for a Pokemon" />
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

                            <Card border='dark' onClick={(e) => { handleClick(pokemon.name) }} style={{ width: '18rem' }}>
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

            {/* displays search results from filtered by type */}
            {typeSearch && typeData && (
                <div className='pokeList'>

                    {typeSearch.map((pokemon) => {
                        if (parseInt(pokemon.pokemon.url.split('/')[6]) > 898) return

                        return (

                            <Card border='dark' onClick={(e) => { handleClick(pokemon.pokemon.name) }} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png`} />
                                <Card.Body>
                                    <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.pokemon.name)}</Card.Title>
                                    <Card.Text className='poke-num'>
                                        #{pokemon.pokemon.url.split('/')[6]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>


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
                            <Card border='dark' onClick={() => { handleClick(pokemon.pokemon.name) }} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png`} />
                                <Card.Body>
                                    <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.pokemon.name)}</Card.Title>
                                    <Card.Text className='poke-num'>
                                        #{pokemon.pokemon.url.split('/')[6]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>


                        )
                    })}


                </div>

            )}


            {/* displays all pokemon */}
            {!searchRes && !typeData && (

                <div className='pokeList'>

                    {pokeData.map((pokemon) => {

                        return (

                            <Card border='dark' onClick={() => { handleClick(pokemon.name) }} style={{ width: '18rem' }}>
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