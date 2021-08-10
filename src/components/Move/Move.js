import { useState, useEffect } from "react";

import { Card, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

const Move = ({ match }) => {

    const history = useHistory();

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
    }, [])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleClick = (name) => {
        history.push(`/pokemon/${name}`)
    }

    const grabID = (url) => {
        const urlArr = url.split('/');
        // console.log(urlArr);
        return (urlArr[6])
    }

    console.log(moveData);

    const formatMove = (str) => {
        if (str[0] === '1') {
            let arr = str.split('-');
            let numArr = arr.slice(0, 3).join(',');
            let wordArr = arr.slice(3).join(' ');
            console.log(wordArr);
            console.log(numArr);
            return `${numArr} ${wordArr}`
        }
        let formattedMove = str.replace(/-/g, ' ');
        return capitalize(formattedMove);
    }

    if (!moveData) return <h1>Loading...</h1>

    console.log(moveData);

    return (
        <div>
            <Card bg='dark' style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title text='white' className='move-title, white-text'>{capitalize(formatMove(moveData.name))}</Card.Title>
                    <ListGroupItem>{`Move type: ${capitalize(moveData.damage_class.name)}`}</ListGroupItem>
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
                    <ListGroupItem className='center-div' style={{ width: '24rem' }}>The following Pokemon can learn this move:</ListGroupItem>

                    <div className='fav-poke'>
                        {moveData.learned_by_pokemon.map((pokemon) => {
                            if (parseInt(pokemon.url.split('/')[6]) > 898) return;
                            return (
                                <Card onClick={() => { handleClick(pokemon.name) }} border='dark' style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${grabID(pokemon.url)}.png`} />
                                    <Card.Body>
                                        <Card.Title>{capitalize(pokemon.name)}</Card.Title>
                                        <Card.Text>#{grabID(pokemon.url)}</Card.Text>
                                    </Card.Body>
                                </Card>
                            )

                        })}
                    </div>
                </>
            )}


        </div>
    );

};

export default Move;