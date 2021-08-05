import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';
import Login from './Login/Login';
import Navigation from './components/Navbar/Nav';

import { useAuth0 } from "@auth0/auth0-react";


function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [pokemon, setPokemon] = useState([]);

  const [pokeName, setPokeName] = useState(null);

  const [pokeData, setPokeData] = useState(null);

  const [filteredPokemon, setFilteredPokemon]= useState(null)

  const [currentPokeUser, setCurrentPokeUser] = useState(null);


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

class pokeUser{

  constructor(email, username){
    this.email = email;
    this.username = username;
    this.favPoke = [];
  }
}

const findCurrentPokeUser = async() => {
  try{
      const res = await fetch ('http://localhost:4000');
      const data = await res.json();
      data.map((el) => {
          if(el.email === user.email){
              setCurrentPokeUser(el)
          }
          console.log(currentPokeUser);
      })
  }

  catch(err){
      console.log(err);
  }
}

const handleLogin = async() => {
  if(!isAuthenticated) return;
  const res = await fetch ('http://localhost:4000');
  const data = await res.json();

  console.log(data);

  let count = 0;
  data.map((pokeUser) => {
    if(pokeUser.email === user.email){count++}
  })
  if(count){
     return
  } else {
      try{
        const res = await fetch ('http://localhost:4000/pokemon',{
          method: 'POST',
          body: JSON.stringify(new pokeUser(user.email, user.nickname)),
          headers: {
            "Content-Type": "application/json"
        }
      })
      console.log(res);
      }

      catch(err){
        console.log(err);
      }
  }

}


  useEffect(() => {
  
    getAPIdata();
  
    
  }, [])

  useEffect(()=> {
    handleLogin();
    findCurrentPokeUser();
  },[isAuthenticated])

  return (
    // <>
    
    <div>
        <Navigation /> 
        <Switch>
          <Route path='/' exact render={()=> <PokemonList filteredPokemon={filteredPokemon} setFilteredPokemon={setFilteredPokemon} setPokemon={setPokemon} pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
          <Route path={`/type/:type`} component= { Type } />
          <Route path={`/pokemon/:pokemon`} render= {() => <Pokemon pokeUser={currentPokeUser} pokeName={pokeName}user={user} />} />
          <Route path='/pokemon' exact render={()=> <PokemonList filteredPokemon={filteredPokemon} setFilteredPokemon={setFilteredPokemon} setPokemon={setPokemon}pokemon={pokemon} setPokeName={setPokeName} setPokeData={setPokeData}/> } />
          <Route path={`/login`} component= { Login } />

        </Switch>
      </div>
    // </>
      
  );
}

export default App;
