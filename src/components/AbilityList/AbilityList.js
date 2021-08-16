// import { useState, useEffect } from "react";

// import { Card, Form, Spinner } from "react-bootstrap";

// import { useHistory } from "react-router";

// import P from '../POKEDEX';
// import HELPER from '../../HELPER'

// const Abilities = () => {

//     const history = useHistory();
//     const [allAbilities, setAllAbilities] = useState(null);
//     const [searchRes, setSearchRes] = useState(null)

//     const getAllAbilities = async () => {
//         try {
//             const res = await P.getAbilitiesList();     
//             setAllAbilities(res.results)
            
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         getAllAbilities();
//     }, [])

//     const formatAbility = (str) => {
//         let formattedAbility = str.replace(/-/g, ' ');

//         return HELPER.capitalize(formattedAbility);
//     }


//     if (!allAbilities) return (
//         <Spinner className='spinner' animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//         </Spinner>
//     )
  
//     HELPER.alphabeticalSort(allAbilities)

//     return (
//         <div>
//             <Form.Control onChange={(e) => {HELPER.handleSearch(e, setSearchRes, allAbilities)}} className='ability-search' type="text" placeholder="Search for an ability" />
//             {searchRes && (

//                 <div className='all-abilities'>
//                     {searchRes.map((ability) => {
//                         return (
//                             <Card onClick={() => { history.push(`/abilities/${ability.name}`) }} border='dark' className='single-ability'>
//                                 <Card.Title>{formatAbility(ability.name)}</Card.Title>
//                             </Card>
//                         )
//                     })}
//                 </div>

//             )}

//                     {!searchRes && (

//                         <>
//                     <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
//                         <Card.Text>All of the abilities in the games (click for details):</Card.Text>
//                     </Card>
//                     <div className='all-abilities'>
//                         {allAbilities.map((ability) => {
//                             return (
//                                 <Card onClick={() => { history.push(`/abilities/${ability.name}`) }} border='dark' className='single-ability'>
//                                     <Card.Title>{formatAbility(ability.name)}</Card.Title>
//                                 </Card>
//                             )
//                         })}
//                     </div>
//                 </>
//                         )}
//         </div>
//     );
// };

// export default Abilities;