import { useEffect, useState } from "react";

import Card from 'react-bootstrap/Card';


const Pokemon = ({pokeData}) => {

    const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

    // const [pokeData, setPokeData] = useState({});

    console.log(pokeData);

    
        return (

                    <div>
                        <h1>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h1>
                        <img className='main-pic' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`} alt="" /> 
                    </div>            
       
        );
  
};

export default Pokemon;