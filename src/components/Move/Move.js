import { useState, useEffect } from "react";

import { Card, ListGroupItem } from "react-bootstrap";

import HELPER from "../../HELPER";
import P from "../POKEDEX";

import PokeCard from "../Poke-Card/PokeCard";

const Move = ({ match }) => {

    const [moveData, setMoveData] = useState(null);

    const getMoveData = async () => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/move/${match.params.move}`)
            const data = await res.json();
            setMoveData(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMoveData()
    }, []);

    const formatMove = (str) => {
        if (str[0] === '1') {
            let arr = str.split('-');
            let numArr = arr.slice(0, 3).join(',');
            let wordArr = arr.slice(3).join(' ');
            return `${numArr} ${wordArr}`
        }
        let formattedMove = str.replace(/-/g, ' ');
        return HELPER.capitalize(formattedMove);
    }

    if (!moveData) return <h1>Loading...</h1>

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Card className='poke-card move-detail' bg='dark' style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title text='white' className='move-title white-text'>{HELPER.capitalize(formatMove(moveData.name))}</Card.Title>
                    <ListGroupItem>{`Type: ${HELPER.capitalize(moveData.type.name)}`}</ListGroupItem>
                    <ListGroupItem>{`Damage type: ${HELPER.capitalize(moveData.damage_class.name)}`}</ListGroupItem>
                    {moveData.power && (
                        <ListGroupItem>{`Power: ${moveData.power}`}</ListGroupItem>
                    )}
                    {moveData.accuracy && (
                        <ListGroupItem>{`Accuracy: ${moveData.accuracy}`}</ListGroupItem>
                    )}
                    {moveData.pp && (
                        <ListGroupItem>{`PP: ${moveData.pp}`}</ListGroupItem>
                    )}
                    <Card.Text className='white-text'>{moveData.effect_entries[0].effect.split('$effect_chance%').join(`${moveData.effect_chance}%`)}</Card.Text>
                </Card.Body>

            </Card>

            {moveData.learned_by_pokemon.length > 0 && (
                <>
                    <Card bg='dark' className='one-line-desc' style={{ width: '24rem' }}>
                        <Card.Text>The following Pokemon can learn this move:</Card.Text>
                    </Card>

                    <div className='fav-poke'>
                        {moveData.learned_by_pokemon.map((pokemon) => {
                            console.log(pokemon);
                            if(HELPER.grabID(pokemon.url) < 899){
                                return (
                                    <PokeCard
                                        name={pokemon.name}
                                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                                        id={HELPER.grabID(pokemon.url)}
                                    />
                                )}
                        })}
                    </div>
                </>
            )}


        </div>
    );

};

export default Move;