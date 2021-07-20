import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroup';



const Pokemon = ({pokeData}) => {

    const [locations, setLocations] = useState([]);

    const getLocationData = async() => {
        try {
            const res = await fetch (`${pokeData.location_area_encounters}`);
            const data = await res.json();
            setLocations(data);
            console.log(locations);
        }
        catch (err) {
            console.log(err);
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatLocation = (str) => {
        let formattedLoc = str.replace(/-/g, ' ');
        formattedLoc = formattedLoc.replace(/area/g, '')

        return capitalize(formattedLoc);
    }


    useEffect(() => {
        getLocationData();
    },[])


    console.log(locations[2]);


    console.log(pokeData.location_area_encounters);

        return (
            <>
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
                                <ListGroup.Item>{capitalize(type.type.name)}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    
                </Card>

                <ListGroup className='locations'>
                    {locations.map((location) => {
                        return (
                            <ListGroup.Item>{`Pokemon: ${capitalize(location.version_details[0].version.name)} -- ${capitalize(location.version_details[0].encounter_details[0].method.name)} at ${formatLocation(location.location_area.name)}`}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </>
            );
        
  
};

export default Pokemon;