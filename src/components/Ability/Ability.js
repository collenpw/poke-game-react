import { useState, useEffect } from "react";

import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

import { useHistory } from "react-router";

const Ability = ({ match }) => {

    const [abilityData, setAbilityData] = useState(null);
    const history = useHistory();
    const getAbilityData = async () => {

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/ability/${match.params.ability}`)
            const data = await res.json()
            // console.log(data);
            setAbilityData(data)
        }

        catch (err) {
            console.log(err);
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatAbility = (str) => {
        let formattedAbility = str.replace(/-/g, ' ');

        return capitalize(formattedAbility);
    }

    const grabID = (url) => {
        const urlArr = url.split('/');
        // console.log(urlArr);
        return (urlArr[6])
    }

    const handleClick = (name) => {
        history.push(`/pokemon/${name}`)

    }

    useEffect(() => {
        getAbilityData()
    }, [])

    if (!abilityData) return (
        <h3>Loading...</h3>
    )

    console.log(abilityData);

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Card className='poke-card white-text ability-detail' bg='dark' style={{ width: '36rem' }}>
                <Card.Body>
                    <Card.Title className='ability-title'>{formatAbility(abilityData.name)}</Card.Title>
                    <Card.Text>
                        {abilityData.effect_entries.length === 0 && (<Card.Text>There is no information on the effect of this ability yet. Check back later!</Card.Text>)}
                        {abilityData.effect_entries.length > 0 && (
                            abilityData.effect_entries.map((entry) => {
                                if (entry.language.name === 'en') {
                                    return (
                                        <Card.Text> {entry.effect}</Card.Text>
                                    )
                                }

                            })
                        )}
                    </Card.Text>
                </Card.Body>

            </Card>
            {abilityData.pokemon.length > 0 && (

                <Card bg='dark' className='one-line-desc' style={{ width: '24rem' }}>
                    <Card.Text>The following Pokemon can have this ability:</Card.Text>
                </Card>
            )}

            <div className='fav-poke'>
                {abilityData.pokemon.map((pokemon) => {
                    // if (parseInt(pokemon.pokemon.url.split('/')[6]) > 898) return;
                    return (
                        <Card className='poke-card' onClick={() => { handleClick(pokemon.pokemon.name) }} border='dark' style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${grabID(pokemon.pokemon.url)}.png`} />
                            <Card.Body>
                                <Card.Title>{capitalize(pokemon.pokemon.name)}</Card.Title>
                                {parseInt(pokemon.pokemon.url.split('/')[6]) < 899 && (
                                    <Card.Text>#{grabID(pokemon.pokemon.url)}</Card.Text>

                                )}
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>


        </div>
    );
};

export default Ability;