import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Card, ListGroup, Spinner } from 'react-bootstrap';

import Location from './Location';
import Moves from './Moves';
import EvolutionChain from '../EvolutionChain/EvolutionChain';
import PokeCard from '../Poke-Card/PokeCard';

import HELPER from '../../HELPER';
import P from '../POKEDEX';

const Pokemon = ({ match }) => {
    const history = useHistory();
    const [pokeData, setPokeData] = useState(null);

    const getPokeData = async () => {
        try {
            setPokeData(await P.getPokemonByName(match.params.pokemon));
            // setPokeData(res);
        }
        catch (err) {
            console.log(err);
        }
    }
    console.log(pokeData);

    useEffect(() => {
        // setPokeData(null);
        getPokeData();

    }, [match]);

    if (!pokeData) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return (
        <div className='poke-div' >
            <PokeCard name={pokeData.name} img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} id={pokeData.id} needsFavorite={true}></PokeCard>

            <Card border='dark' className='shadow-box center-div-small-top-margin abilities' style={{ width: '18rem' }}>
                <ListGroup.Item className='bold'>Abilities:</ListGroup.Item>
                {pokeData.abilities.map((ability) => {
                    return (
                        <ListGroup.Item className='type' onClick={() => { history.push(`/abilities/${ability.ability.name}`) }}>{HELPER.replaceDashWithSpace(ability.ability.name)}</ListGroup.Item>
                    )
                })}
            </Card>

            <Card border='dark' className='shadow-box center-div-small-top-margin abilities' style={{ width: '18rem' }}>
                <ListGroup.Item className='bold'>Types:</ListGroup.Item>
                {pokeData.types.map((type) => {
                    return (
                        <ListGroup.Item className='type' onClick={() => { history.push(`/types/${type.type.name}`) }}><span className='type'>{HELPER.capitalize(type.type.name)}</span></ListGroup.Item>
                    )
                })}
            </Card>


            <EvolutionChain pokeData={pokeData} />
            <div className="shiny-div">
                <Card className='shiny-card' border='dark' style={{ width: '18rem' }} >
                    <Card.Title>
                        Normal:
                    </Card.Title>
                    <Card.Body>
                        <Card.Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`}></Card.Img>
                    </Card.Body>
                </Card>

                <Card className='shiny-card' border='dark' style={{ width: '18rem' }} >
                    <Card.Title>
                        Shiny:
                    </Card.Title>
                    <Card.Body>
                        <Card.Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeData.id}.png`}></Card.Img>
                    </Card.Body>
                </Card>
            </div>
            <Location pokeData={pokeData} />
            <Moves pokeData={pokeData} />
            {/* WORK IN PROGRESS */}

        </div>
    );
};

export default Pokemon;