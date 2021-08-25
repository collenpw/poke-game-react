import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Card, ListGroup, Spinner } from 'react-bootstrap';

import EvolutionChain from '../EvolutionChain/EvolutionChain';
import Forms from './Forms';
import Location from './Location';
import Moves from './Moves';
import PokeCard from '../Poke-Card/PokeCard';
import PokeNav from './PokeNav';

import HELPER from '../../HELPER';
import P from '../POKEDEX';
import getLocations from '../../_functions/getLocations';

const Pokemon = ({ match }) => {
    const history = useHistory();
    const [pokeData, setPokeData] = useState(null);
    const [displayed, setDisplayed] = useState('home');
    const [locations, setLocations] = useState(null);
    const [versions, setVersions] = useState(null);
    const [specData, setSpecData] = useState(null);

    const getPokeData = async () => {
        try {
            setPokeData(await P.getPokemonByName(match.params.pokemon));
        }
        catch (err) {
            console.log(err);
        }
    }

    const getSpecData = async () => {
        try {
            setSpecData(await P.getPokemonSpeciesByName(match.params.pokemon));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLocations.getLocationData(pokeData, setLocations);
        getLocations.getVersionData(setVersions);

    }, [pokeData]);    

    useEffect(() => {
        getPokeData();
        getSpecData();

    }, [match]);

    if (!pokeData || !specData) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return (
        <>

            <PokeNav setDisplayed={setDisplayed} versions={versions} forms={pokeData.forms} varieties={specData.varieties} locations={locations} moves={pokeData.moves} name={HELPER.capitalize(specData.name)}/>

            <div className='poke-div' >
                
                {displayed === 'home' && (
                <>
                    <PokeCard name={specData.name} img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} id={pokeData.id} needsFavorite={true}></PokeCard>

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
                </>
                )}

                {displayed === 'Forms' && specData.varieties.length > 1 && (
                    <Forms specData={specData} />
                )}

                {displayed === 'Forms' && (
                    <Forms pokeData={pokeData} specData={specData} />
                )}

                {displayed === 'Moves' && (
                    <Moves pokeData={pokeData} />
                )}

                {/* WORK IN PROGRESS */}

            </div>
        </>
    );
};

export default Pokemon;