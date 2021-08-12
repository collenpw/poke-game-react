import { useState, useEffect } from 'react';

import { ListGroupItem, Card } from 'react-bootstrap';

const EvolutionChain = ({ pokeData, capitalize }) => {

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
        getEvolutionData();
    }, []);

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

    const grabID = (url) => {
        const urlArr = url.split('/');
        // console.log(urlArr);
        return (urlArr[6])
    }

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

    console.log(pokeObj);
    // console.log(`${evolutionData.chain.species.name} level ${evolutionData.chain.evolves_to[0].evolution_details[0].min_level} --> ${evolutionData.chain.evolves_to[0].species.name} level ${evolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level} --> ${evolutionData.chain.evolves_to[0].evolves_to[0].species.name} `);

    return (
        evolutionData.chain.evolves_to.length > 0 && (
            <div className="evolution-chain">
                <div className='first-tier-evolution'>
                    <Card border='dark' style={{ width: '12rem' }}>
                        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${grabID(evolutionData.chain.species.url)}.png`} />
                        <Card.Body>
                            <Card.Title>{capitalize(evolutionData.chain.species.name)}</Card.Title>
                            <Card.Text>{`#${grabID(evolutionData.chain.species.url)}`}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className='second-tier-evolution'>
                    {evolutionData.chain.evolves_to.map((evolution) => {
                        return (
                            <>
                                <Card border='dark' style={{ width: '12rem' }}>
                                    <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${grabID(evolution.species.url)}.png`} />
                                    <Card.Body>
                                        <Card.Title>{capitalize(evolution.species.name)}</Card.Title>
                                        <Card.Text>{`#${grabID(evolution.species.url)}`}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </>

                        )
                    })}
                </div>
                {evolutionData.chain.evolves_to[0].evolves_to.length > 0 && (
                    <Card border='dark' style={{ width: '12rem' }}>
                        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${grabID(evolutionData.chain.evolves_to[0].evolves_to[0].species.url)}.png`} />
                        <Card.Body>
                            <Card.Title>{capitalize(evolutionData.chain.evolves_to[0].evolves_to[0].species.name)}</Card.Title>
                            <Card.Text>{`#${grabID(evolutionData.chain.evolves_to[0].evolves_to[0].species.url)}`}</Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
        // <ListGroupItem>{`${pokeObj.from} ${pokeObj.minLevel} --> ${pokeObj.to}`}</ListGroupItem>
    );
};

export default EvolutionChain;