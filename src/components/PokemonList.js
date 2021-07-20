import { useEffect } from "react";
import { Link, Route } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Pokemon from "./Pokemon";

export default function PokemonList( {pokemon, setPokeName, setPokeData} ) {

    const handleClick = async (name) => {

        // e.preventDefault();
        setPokeName(name);

        try {
            const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await res.json();
            setPokeData(data);
        }
        catch(err) {
            console.log(err);
        }
    }

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        
        <div className='pokeList'>

            {pokemon.map((pokemon, i) => {

                return (
                    <div>  

                        <Link onClick={() => handleClick(pokemon.name)} to={`/${pokemon.name}`}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`} />
                            <Card.Body>
                                <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.name)}</Card.Title>
                                <Card.Text className='poke-num'>
                                    #{i + 1}
                                </Card.Text>
                                {/* <Button variant="primary">More info</Button> */}
                            </Card.Body>
                            </Card>
                        </Link>
                    </div>
                )
            })}


        </div>
    )

}