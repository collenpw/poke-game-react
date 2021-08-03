import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import Location from '../../Location/Location';

const Pokemon = ({match}) => {

    const [pokeData, setPokeData] = useState(null);

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
        
    }

    useEffect(()=> {

        getPokeData();

    }, []);

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