import { useState, useEffect } from 'react';

import { ListGroupItem, ListGroup, Card } from 'react-bootstrap';

import { useHistory } from 'react-router';

import arrow from '../../imgs/arrow-right.svg';

import HELPER from '../../HELPER';

const EvolutionChain = ({ pokeData, match }) => {

    const history = useHistory();
    console.log(match);

    const [evolutionData, setEvolutionData] = useState(null)
    const [pokeObj, setPokeObj] = useState(null);

    const getEvolutionData = async () => {
        try {
            const res = await fetch(pokeData.species.url);
            const data = await res.json();
            const secRes = await fetch(data.evolution_chain.url);
            const secData = await secRes.json();
            setEvolutionData(secData);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setEvolutionData(null)
        getEvolutionData();
    }, [history]);

    class Evolve {
        constructor(from, to, gender = null, heldItem = null, item = null, knownMove = null, knownMoveType = null, location = null, minAffection = null, minBeauty = null, minHappiness = null, minLevel = null, needsOverworldRain = false, partySpecies = null, partyType = null, relativePhysicalStats = null, timeOfDay = null, tradeSpecies = null, trigger = null, turnUpsideDown = null) {
            this.from = from;
            this.to = to;
            this.gender = gender;
            this.heldItem = heldItem;
            this.item = item;
            this.knownMove = knownMove;
            this.knownMoveType = knownMoveType;
            this.location = location;
            this.minAffection = minAffection;
            this.minBeauty = minBeauty;
            this.minHappiness = minHappiness;
            this.minLevel = minLevel;
            this.needsOverworldRain = needsOverworldRain;
            this.partySpecies = partySpecies;
            this.partyType = partyType;
            this.relativePhysicalStats = relativePhysicalStats;
            this.timeOfDay = timeOfDay;
            this.tradeSpecies = tradeSpecies;
            this.trigger = trigger;
            this.turnUpsideDown = turnUpsideDown;
        }
    }

    // const weirdRedirect = async (name) => {
    //     await history.push('/')
    //     history.push(`/pokemon/${name}`)
    // }

    if (!evolutionData) return (
        <h1>Loading</h1>
    )

    if (evolutionData.chain.evolves_to.length > 0) {
        const d = (evolutionData.chain.evolves_to[0].evolution_details[0]);
        // console.log(d);
        const poke = new Evolve(evolutionData.chain.species.name, evolutionData.chain.evolves_to[0].species.name, d.gender, d.held_item, d.item, d.known_move, d.known_move_type, d.location, d.min_affection, d.min_beauty, d.min_happiness, d.min_level, d.needs_overworld_rain, d.party_species, d.party_type, d.relative_physical_stats, d.time_of_day, d.trade_species, d.trigger, d.turn_upside_down)
        // console.log(poke);
        if (!pokeObj) {
            setPokeObj(poke);

        }
    }

    return (
        evolutionData.chain.evolves_to.length > 0 && (
            <div className="evolution-chain">
                <Card border='dark' className='first-tier-evolution' style={{ width: '12rem' }}>
                    <ListGroup>
                        <ListGroup.Item onClick={() => { history.push(`/pokemon/${evolutionData.chain.species.name}`) }} className='flex' style={{ maxHeight: '12rem' }}>
                            <img className='too-big-img' style={{ maxHeight: '80% !important' }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${HELPER.grabID(evolutionData.chain.species.url)}.png`} />
                            {HELPER.capitalize(evolutionData.chain.species.name)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <img className='arrow' src={arrow} />

                <Card border='dark' className='first-tier-evolution' style={{ width: '12rem' }}>
                    <ListGroup>

                        {evolutionData.chain.evolves_to.map((evolution) => {
                            return (
                                <ListGroupItem onClick={() => { history.push(`/pokemon/${evolution.species.name}`) }}>
                                    <img className='too-big-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${HELPER.grabID(evolution.species.url)}.png`} />
                                    {HELPER.capitalize(evolution.species.name)}
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </Card>
                {
                    evolutionData.chain.evolves_to[0].evolves_to.length > 0 && (
                        <>
                            <img className='arrow' src={arrow} />
                            <Card border='dark' className='first-tier-evolution' style={{ width: '12rem' }}>

                                <ListGroup style={{ width: '12rem' }}>
                                    {evolutionData.chain.evolves_to[0].evolves_to.map((evolution) => {
                                        return (
                                            <ListGroup.Item onClick={() => { history.push(`/pokemon/${evolution.species.name}`) }}>
                                                <img className='too-big-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${HELPER.grabID(evolution.species.url)}.png`} />
                                                {HELPER.capitalize(evolution.species.name)}
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </Card>
                        </>
                    )
                }
            </div >
        )
    );
};

export default EvolutionChain;