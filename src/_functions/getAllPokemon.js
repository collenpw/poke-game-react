const getAllPokemon = async (setAllPokemon) => {
    let allPoke;
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=400')
        const data = await res.json();
        allPoke = data.results;
        console.log(allPoke);
        setAllPokemon(allPoke)
    }
    catch (err) {
        console.log(err);
    }

}
export default getAllPokemon;