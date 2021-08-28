import './App.css';
import { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom'

import Pokemon from './components/Pokemon/Pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Type from './components/Type/Type';
import Ability from './components/Ability/Ability';
import Move from './components/Move/Move';
import List from './components/List/List';

import handleLogin from './_functions/handleLogin';

import Nav from './components/Nav/Nav';
import Login from './components/Nav/Login'
import FavPoke from './components/FavPoke/FavPoke';

import { useAuth0 } from "@auth0/auth0-react";
import P from './components/POKEDEX';
import HELPER from './HELPER';

export const DataContext = createContext();

function App() {

  const { user, isAuthenticated } = useAuth0();
  const [currentPokeUser, setCurrentPokeUser] = useState(null);

  useEffect(() => {
    handleLogin(user, isAuthenticated, setCurrentPokeUser);
  }, [isAuthenticated])

  return (
    <body>

      <DataContext.Provider value={{ currentPokeUser, user, isAuthenticated }}>
        <Nav currentPokeUser={currentPokeUser} />
        <Switch>

          <Route path={'/'} exact component={PokemonList} />
          <Route path={'/pokemon'} exact component={PokemonList} />
          <Route path={`/pokemon/:pokemon`} exact component={Pokemon} />
          <Route path={`/abilities/:ability`} component={Ability} />
          <Route path={`/moves/:move`} component={Move} />
          <Route path={`/types/:type`} component={Type} />
          <Route path={`/login`} component={Login} />
          <Route path={`/my/favorite-pokemon`} component={FavPoke} />

          <Route path={'/abilities'} exact>
            <List getter={P.getAbilitiesList()} formatter={HELPER.replaceDashWithSpace} search={true} attr={'ability'} />
          </Route> 

          <Route path={'/moves'} exact>
            <List getter={P.getMovesList()} formatter={HELPER.formatMove} search={true} attr={'move'} />
          </Route>

          <Route path={'/types'}>
            <List getter={P.getTypesList()} formatter={HELPER.replaceUnderscoreWithSpace} search={false} attr={'type'} />
          </Route>

        </Switch>
      </DataContext.Provider>

    </body>
  );
}

export default App;
