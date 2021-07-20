import './App.css';
import { useState, useEffect } from 'react';
import { Route } from 'react-router'

import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

function App() {

  const [pokemon, setPokemon] = useState([]);

  const [pokeName, setPokeName] = useState(null);

  const [pokeData, setPokeData] = useState(null);

const getAPIdata = async() => {

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
    const data = await res.json();
    // console.log(data);
    setPokemon(data.results)
  }

  catch(err) {
    console.error(err);
  }

}

const getSpecificPokemon = async() => {
  try {
    const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const data = await res.json();
    setPokeData(data);
  }
  catch (err) {
    console.log(err);
  }
}

  useEffect(() => {

    getSpecificPokemon();

  }, [pokeName]);

  useEffect(() => {
  
    getAPIdata();
  
    
  }, [])

  return (

    
    <div>
      <Route path={`/${pokeName}`} exact render={() => <Pokemon pokeData={pokeData} pokemon={pokeName} /> } />
      <Route path='/' exact render={()=> <PokemonList pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
    </div>
    
  );
}

export default App;
