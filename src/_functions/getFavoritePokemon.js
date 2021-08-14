const getFavoritePokemon = async (setFavoritePokemon, id) => {
    try {
        const res = await fetch(`https://pokedex-api-collenpw.herokuapp.com/pokemon/${id}`);
        const data = await res.json();
        console.log(data);
        setFavoritePokemon(data.favPoke);
    }
    catch (err) {
        console.log(err);
    }
}
export default getFavoritePokemon;