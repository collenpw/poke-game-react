import './App.css';
import { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';
import TypeList from './components/TypeList/TypeList'
import Ability from './components/Ability/Ability';
import AbilityList from './components/AbilityList/AbilityList'
import Move from './components/Move/Move';
import MoveList from './components/MoveList/MoveList'

import Nav from './components/Nav/Nav';
import Login from './components/Nav/Login'
import FavPoke from './components/FavPoke/FavPoke';

import { useAuth0 } from "@auth0/auth0-react";

export const DataContext = createContext();

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentPokeUser, setCurrentPokeUser] = useState(null);
  const [userFavPoke, setUserFavPoke] = useState(null)

  class pokeUser {

    constructor(email, username) {
      this.email = email;
      this.username = username;
      this.favPoke = [];
    }
  }

  const findCurrentPokeUser = async () => {
    try {
      const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon');
      const data = await res.json();
      data.map((el) => {
        if (el.email === user.email) {
          setCurrentPokeUser(el)
          setUserFavPoke(el.favPoke)
        }
      })
    }

    catch (err) {
      console.log(err);
    }
  }

  const handleLogin = async () => {
    if (!isAuthenticated) return;
    const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon');
    const data = await res.json();
    let count = 0;
    data.map((pokeUser) => {
      if (pokeUser.email === user.email) { count++ }
    })
    if (count) {
      return
    } else {
      try {
        const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon', {
          method: 'POST',
          body: JSON.stringify(new pokeUser(user.email, user.nickname)),
          headers: {
            "Content-Type": "application/json"
          }
        })
      }

      catch (err) {
        console.log(err);
      }

      findCurrentPokeUser();
    }

  }

  useEffect(() => {
    handleLogin();
    findCurrentPokeUser();
  }, [isAuthenticated])

  return (
    <body>

      <DataContext.Provider value={{ userFavPoke, currentPokeUser, user, isAuthenticated }}>
        <Nav currentPokeUser={currentPokeUser} />
        <Switch>
          <Route path={'/'} exact component={PokemonList} />
          <Route path={`/pokemon/:pokemon`} exact component={Pokemon} />
          <Route path={`/abilities/:ability`} component={Ability} />
          <Route path={`/moves/:move`} component={Move} />
          <Route path={`/types/:type`} component={Type} />
          <Route path={'/pokemon'} component={PokemonList} />
          <Route path={`/login`} component={Login} />
          <Route path={`/:user/favorite-pokemon`} component={FavPoke} />
          <Route path={'/abilities'} component={AbilityList} />
          <Route path={'/moves'} component={MoveList} />
          <Route path={'/types'} component={TypeList} />



        </Switch>
      </DataContext.Provider>

    </body>
  );
}

export default App;
