import {useContext, useState, useEffect} from 'react';
import { DataContext } from '../../App';

import { useHistory } from 'react-router';

import { Card, ListGroup } from 'react-bootstrap';

const FavPoke = () => {

    const history = useHistory();
    const [favPoke, setFavPoke] = useState(null);
    const data = useContext(DataContext);

    const getFavPoke = async() => {
        try{

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        getFavPoke()
    }, [])

    console.log(data);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleClick = (name) => {
        history.push(`/pokemon/${name}`)
    }

    data.userFavPoke.sort(function(a, b) {
        return a.id - b.id;
    });

    return (
        <div className='fav-poke'>

            {data.userFavPoke && (
                data.userFavPoke.map((pokemon) => {
                    return(
                        <Card onClick={() => {handleClick(pokemon.name)}} border='dark'style={{ width: '18rem' }}>   
                            <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                            <Card.Body>
                                <Card.Title>{capitalize(pokemon.name)}</Card.Title>
                                <Card.Text className='poke-num'>
                                #{pokemon.id}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            )}
        </div>
    );
};

export default FavPoke;