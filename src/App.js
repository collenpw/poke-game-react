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

// import getAllPokemon from './_functions/getAllPokemon';
import getAllMoves from './_functions/getAllMoves';
import handleLogin from './_functions/handleLogin';
import getAllAbilities from './_functions/getAllAbilities';

import Nav from './components/Nav/Nav';
import Login from './components/Nav/Login'
import FavPoke from './components/FavPoke/FavPoke';

import { useAuth0 } from "@auth0/auth0-react";

export const DataContext = createContext();

function App() {

  const { user, isAuthenticated } = useAuth0();
  const [currentPokeUser, setCurrentPokeUser] = useState(null);
  const [userFavPoke, setUserFavPoke] = useState(null);
  const [allPokemon, setAllPokemon] = useState(null);
  const [allMoves, setAllMoves] = useState(null);
  const [allAbilities, setAllAbilities] = useState(null);

  // const findCurrentPokeUser = async () => {
  //   try {
  //     const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon');
  //     const data = await res.json();
  //     data.map((el) => {
  //       if (el.email === user.email) {
  //         setCurrentPokeUser(el)
  //         setUserFavPoke(el.favPoke)
  //       }
  //     })
  //   }

  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    getAllMoves(setAllMoves);
    getAllAbilities(setAllAbilities);
    handleLogin(user, isAuthenticated, setCurrentPokeUser, setUserFavPoke);
  }, [])

  useEffect(() => {
    handleLogin(user, isAuthenticated, setCurrentPokeUser, setUserFavPoke);
  }, [isAuthenticated])

  return (
    <body>

      <DataContext.Provider value={{ userFavPoke, currentPokeUser, user, isAuthenticated, allPokemon }}>
        <Nav currentPokeUser={currentPokeUser} />
        <Switch>

          <Route path={'/'} exact component={PokemonList} />
          <Route path={'/pokemon'} exact component={PokemonList} />
          <Route path={`/pokemon/:pokemon`} exact component={Pokemon} />
          <Route path={`/abilities/:ability`} component={Ability} />
          <Route path={`/moves/:move`} component={Move} />
          <Route path={`/types/:type`} component={Type} />
          <Route path={`/login`} component={Login} />
          <Route path={`/:user/favorite-pokemon`} component={FavPoke} />
          <Route path={'/abilities'}>
            <AbilityList allAbilities={allAbilities} />
          </Route>
          <Route path={'/moves'}>
            <MoveList allMoves={allMoves} />
          </Route>
          <Route path={'/types'} component={TypeList} />



        </Switch>
      </DataContext.Provider>

    </body>
  );
}

export default App;
