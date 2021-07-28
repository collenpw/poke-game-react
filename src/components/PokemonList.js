import { useHistory } from "react-router-dom";

import Card from 'react-bootstrap/Card';

export default function PokemonList( {pokemon, setPokeName, setPokeData} ) {

    const history = useHistory();

    const handleClick = async (name) => {
        setPokeName(name);
        history.push(`/pokemon/${name}`)
    } 

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        
        <div className='pokeList'>

            {pokemon.map((pokemon, i) => {

                return (
                       
                    <Card onClick={() => {handleClick(pokemon.name)}} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`} />
                        <Card.Body>
                            <Card.Title className='poke-name'>{capitalizeFirstLetter(pokemon.name)}</Card.Title>
                            <Card.Text className='poke-num'>
                                #{i + 1}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                       
                   
                )
            })}


        </div>
    )

}