import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../App';

import { useHistory } from 'react-router';

import PokeCard from '../Poke-Card/PokeCard';

import { Spinner } from 'react-bootstrap';

const FavPoke = () => {

    const history = useHistory();
    const [favPoke, setFavPoke] = useState(null);
    const data = useContext(DataContext);

    const getFavPoke = async () => {
        try {
            const res = await fetch(`https://pokedex-api-collenpw.herokuapp.com/pokemon/${data.currentPokeUser._id}`);
            console.log(res);
            const resData = await res.json();
            setFavPoke(resData.favPoke)
            console.log(resData);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFavPoke()
    }, [])

    console.log(data);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleClick = (name) => {
        history.push(`/pokemon/${name}`)
    }


    if (favPoke) {
        favPoke.sort(function (a, b) {
            if (!favPoke) return;
            return a.id - b.id;
        });
    }

    if (!favPoke) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return (
        <div className='fav-poke'>

            
                {favPoke.map((pokemon) => {
                    return (
                        <PokeCard name={pokemon.name} img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} id={pokemon.id} />
                    )
                })}
            
        </div>
    );
};

export default FavPoke;