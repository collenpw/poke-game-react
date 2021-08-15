const getAllAbilities = async (setAllAbilities) => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/ability/?limit=327');
        const data = await res.json();
        setAllAbilities(data.results);
    }
    catch (err) {
        console.log(err);
    }
}
export default getAllAbilities;