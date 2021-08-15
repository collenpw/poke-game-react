import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import { Card, ListGroup, Spinner } from 'react-bootstrap';

import Location from './Location';
import Moves from './Moves';
import EvolutionChain from '../EvolutionChain/EvolutionChain';
import PokeCard from '../Poke-Card/PokeCard';

import { DataContext } from '../../App';

const Pokemon = ({ match }) => {
    const data = useContext(DataContext);
    const history = useHistory();

    const [pokeData, setPokeData] = useState(null);

    const getPokeData = async () => {
        const API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${match.params.pokemon}`
        try {
            const res = await fetch(API_ENDPOINT);
            const data = await res.json();
            setPokeData(data);
        }
        catch (err) {
            console.log(err);
        }
        // getFavPoke()
    }

    useEffect(() => {

        getPokeData();

    }, []);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatAbility = (str) => {
        let formattedAbility = str.replace(/-/g, ' ');
        return capitalize(formattedAbility);
    }

    if (!pokeData) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    console.log(pokeData);


    return (
        <div className='poke-div' >
            <PokeCard name={pokeData.name} img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} id={pokeData.id} needsFavorite={true}></PokeCard>

            <Card border='dark' className='shadow-box center-div-small-top-margin abilities' style={{ width: '18rem' }}>
                <ListGroup.Item className='bold'>Abilities:</ListGroup.Item>
                {pokeData.abilities.map((ability) => {
                    return (
                        <ListGroup.Item className='type' onClick={() => { history.push(`/abilities/${ability.ability.name}`) }}>{formatAbility(ability.ability.name)}</ListGroup.Item>
                    )
                })}
            </Card>

            <Card border='dark' className='shadow-box center-div-small-top-margin abilities' style={{ width: '18rem' }}>
                <ListGroup.Item className='bold'>Types:</ListGroup.Item>
                {pokeData.types.map((type) => {
                    return (
                        <ListGroup.Item className='type' onClick={() => { history.push(`/types/${type.type.name}`) }}><span className='type'>{capitalize(type.type.name)}</span></ListGroup.Item>
                    )
                })}
            </Card>


            <EvolutionChain capitalize={capitalize} pokeData={pokeData} />
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
            <Location pokeData={pokeData} cap={capitalize} />
            <Moves pokeData={pokeData} capitalize={capitalize} />
            {/* WORK IN PROGRESS */}

        </div>
    );
};

export default Pokemon;