// import { useState, useEffect } from "react";

// import ListGroup from 'react-bootstrap/ListGroup';


// const EvolutionChain = ({pokeData}) => {

//     const [evolutionsLink, setEvolutionsLink] = useState([]);
//     const [evolutions, setEvolutions] = useState([]);


//     const getEvolutionsLink = async () => {
//         try {
//             const res = await fetch (pokeData.species.url);
//             const data = await res.json();
//             // console.log(data);
//             setEvolutionsLink(data.evolution_chain.url);
//         }
//         catch(err) {
//             console.log(err);
//         }
//     }

//     const getEvolutions = async(url) => {
//         try {
//             console.log('hi');
//             const res = await fetch (url);
//             const data = await res.json();
//             setEvolutions(data);
//         }
//         catch(err) {
//             console.log(err);
//         }
//     }
    
    
//     useEffect(() => {
//         getEvolutionsLink();
//         // getEvolutions(evolutionsLink)
//     }, [])

//     useEffect(() => {
//         getEvolutions(evolutionsLink)
//     }, [evolutionsLink])
    
//     console.log(evolutionsLink);
//     console.log(evolutions);

//     return (
//         <div>
//             <ListGroup>
//                 <h4>Evolution Chain:</h4>
//             </ListGroup>
//         </div>
//     )
// };

// export default EvolutionChain;