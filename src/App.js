import './App.css';
import { useState, useEffect, createContext } from 'react';
import { Route, Switch} from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';
import Login from './components/Login/Login';
import Navigation from './components/Navbar/Nav';
import FavPoke from './components/FavPoke/FavPoke';
import Ability from './components/Ability/Ability';
import Move from './components/Move/Move';
import Abilities from './components/Abilities/Abilities';
import Moves from './components/Moves/Moves';
import Types from './components/Types/Types';

import { useAuth0 } from "@auth0/auth0-react";

export const DataContext = createContext();

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentPokeUser, setCurrentPokeUser] = useState(null);
  const [userFavPoke, setUserFavPoke] = useState(null)

class pokeUser{

  constructor(email, username){
    this.email = email;
    this.username = username;
    this.favPoke = [];
  }
}

const findCurrentPokeUser = async() => {
  try{
      const res = await fetch ('https://pokedex-api-collenpw.herokuapp.com/pokemon');
      const data = await res.json();
      data.map((el) => {
          if(el.email === user.email){
              setCurrentPokeUser(el)
              setUserFavPoke(el.favPoke)
          }
      })
  }

  catch(err){
      console.log(err);
  }
}

const handleLogin = async() => {
  if(!isAuthenticated) return;
  const res = await fetch ('https://pokedex-api-collenpw.herokuapp.com/pokemon');
  const data = await res.json();
  let count = 0;
  data.map((pokeUser) => {
    if(pokeUser.email === user.email){count++}
  })
  if(count){
     return
  } else {
      try{
        const res = await fetch ('https://pokedex-api-collenpw.herokuapp.com/pokemon',{
          method: 'POST',
          body: JSON.stringify(new pokeUser(user.email, user.nickname)),
          headers: {
            "Content-Type": "application/json"
        }
      })
      }

      catch(err){
        console.log(err);
      }
  }

}

  useEffect(()=> {
    handleLogin();
    findCurrentPokeUser();
  },[isAuthenticated])


  return ( 
    <div className='app-div'>
      <DataContext.Provider value={{userFavPoke, currentPokeUser, user, isAuthenticated}}>
          <Navigation currentPokeUser={currentPokeUser} /> 
          <Switch>
            <Route path={'/'} component={PokemonList} />
            <Route path={`/abilities/:ability`} component= { Ability } />
            <Route path={`/moves/:move`} component= { Move } />
            <Route path={`/types/:type`} component= { Type } />
            <Route path={`/pokemon/:pokemon`} component= { Pokemon } />
            <Route path={'/pokemon'} component={PokemonList} />
            <Route path={`/login`} component= { Login } />
            <Route path={`/:user/favorite-pokemon`} component= {FavPoke} />
            <Route path={'/abilities' } component= { Abilities } />
            <Route path={'/moves' } component= { Moves } />
            <Route path={'/types' } component= { Types } />



          </Switch>
      </DataContext.Provider>

      </div>      
  );
}

export default App;
