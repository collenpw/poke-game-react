const getAllMoves = async (setAllMoves) => {
    let allMoves;
    try {
        const res = await fetch('https://pokeapi.co/api/v2/move/?limit=898')
        const data = await res.json();
        allMoves = data.results;
        console.log(allMoves);
        setAllMoves(allMoves)
    }
    catch (err) {
        console.log(err);
    }

}
export default getAllMoves;