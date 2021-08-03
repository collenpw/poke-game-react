import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';

function App() {

  const [pokemon, setPokemon] = useState([]);

  const [pokeName, setPokeName] = useState(null);

  const [pokeData, setPokeData] = useState(null);

const getAPIdata = async() => {

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
    const data = await res.json();
    setPokemon(data.results)
  }

  catch(err) {
    console.error(err);
  }

}


  useEffect(() => {
  
    getAPIdata();
  
    
  }, [])

  return (

    
    <div>
      <Switch>
        <Route path='/' exact render={()=> <PokemonList pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
        <Route path={`/type/:type`} component= { Type } />
        <Route path={`/pokemon/:pokemon`} component= { Pokemon } />
        <Route path='/pokemon' exact render={()=> <PokemonList pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
      </Switch>
    </div>
    
  );
}

export default App;
