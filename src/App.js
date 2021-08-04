import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';
import Login from './Login/Login';
import Navigation from './components/Navbar/Nav';

function App() {

  const [pokemon, setPokemon] = useState([]);

  const [pokeName, setPokeName] = useState(null);

  const [pokeData, setPokeData] = useState(null);

  const [filteredPokemon, setFilteredPokemon]= useState(null)


const getAPIdata = async() => {

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
    const data = await res.json()
    setPokemon(data.results)
    console.log(pokemon)
    setFilteredPokemon(data.results)
    console.log(filteredPokemon);
  }

  catch(err) {
    console.error(err);
  }

}


  useEffect(() => {
  
    getAPIdata();
  
    
  }, [])

  return (
    // <>
    
    <div>
        <Navigation /> 
        <Switch>
          <Route path='/' exact render={()=> <PokemonList filteredPokemon={filteredPokemon} setFilteredPokemon={setFilteredPokemon} setPokemon={setPokemon} pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
          <Route path={`/type/:type`} component= { Type } />
          <Route path={`/pokemon/:pokemon`} component= { Pokemon } />
          <Route path='/pokemon' exact render={()=> <PokemonList filteredPokemon={filteredPokemon} setFilteredPokemon={setFilteredPokemon} setPokemon={setPokemon}pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
          <Route path={`/login`} component= { Login } />

        </Switch>
      </div>
    // </>
      
  );
}

export default App;
