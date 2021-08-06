import {useContext, useState, useEffect} from 'react';
import { DataContext } from '../../App';

import { useHistory } from 'react-router';

import { Card, ListGroup } from 'react-bootstrap';

const FavPoke = () => {

    const history = useHistory();

    const data = useContext(DataContext);
    // console.log(data);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleClick = (name) => {
        history.push(`/pokemon/${name}`)
    }

    return (
        <div className='fav-poke'>

            {data.userFavPoke && (
                data.userFavPoke.map((pokemon) => {
                    console.log(pokemon);
                    return(
                        <Card onClick={() => {handleClick(pokemon.name)}} border='dark'style={{ width: '18rem' }}>   
                            {/* {data.isAuthenticated && !favorited && (<Card.Header><img onClick={handleFavorite} src={heart} alt="" /></Card.Header>)}
                            {data.isAuthenticated &&favorited && ( <Card.Header><img onClick={handleUnfavorite} src={filledHeart} alt="" /></Card.Header>)}             */}
                            <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                            <Card.Body>
                                <Card.Title>{capitalize(pokemon.name)}</Card.Title>
                            </Card.Body>
                            {/* <ListGroup className="abilities">
                                <ListGroup.Item>Abilities:</ListGroup.Item>
                                {pokemon.abilities.map((ability) => {
                                    return (
                                        <ListGroup.Item>{capitalize(ability.ability.name)}</ListGroup.Item>
                                        )
                                    })}
                                    </ListGroup>
                                    <ListGroup className="type">
                                    <ListGroup.Item>Types:</ListGroup.Item>
                                    {pokemon.types.map((type) => {
                                        return (
                                            <ListGroup.Item> <a href={`/type/${type.type.name}`}>{capitalize(type.type.name)}</a></ListGroup.Item>
                                            )
                                        })}
                                    </ListGroup>     */}
                        </Card>
                    )
                })
            )}
        </div>
    );
};

export default FavPoke;