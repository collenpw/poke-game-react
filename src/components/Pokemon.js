import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroup';



const Pokemon = ({pokeData}) => {


    console.log(pokeData.moves);

        return (

            <Card border='dark'style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} />
                <Card.Body>
                    <Card.Title>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</Card.Title>
                </Card.Body>
                <ListGroup className="abilities">
                    <ListGroupItem>Abilities:</ListGroupItem>
                    {pokeData.abilities.map((ability) => {
                        return (
                            <ListGroupItem>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</ListGroupItem>
                        )
                    })}
                </ListGroup>
                <ListGroup className="type">
                    <ListGroupItem>Types:</ListGroupItem>
                    {pokeData.types.map((type) => {
                        return (
                            <ListGroupItem>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</ListGroupItem>
                        )
                    })}
                </ListGroup>
                
            </Card>
            );
        
  
};

export default Pokemon;