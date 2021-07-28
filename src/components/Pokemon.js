import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const Pokemon = ({match}) => {

    const [pokeData, setPokeData] = useState(null);
    const [locations, setLocations] = useState([]);

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

    const getLocationData = async() => {
        try {
            const res = await fetch (`${pokeData.location_area_encounters}`);
            const data = await res.json();
            setLocations(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {

        getPokeData();

    }, []);

    useEffect(() => {
        getLocationData();
    },[pokeData]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatLocation = (str) => {
        let formattedLoc = str.replace(/-/g, ' ');
        formattedLoc = formattedLoc.replace(/area/g, '')

        return capitalize(formattedLoc);
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

                <ListGroup style={{ width: '40rem' }} className='locations'>
                    {locations.map((location) => {
                        return (
                            <ListGroup.Item>{`Pokemon: ${capitalize(location.version_details[0].version.name)} -- ${capitalize(location.version_details[0].encounter_details[0].method.name)} at ${formatLocation(location.location_area.name)}`}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
            ); 
};

export default Pokemon;