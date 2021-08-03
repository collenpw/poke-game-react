import { useState, useEffect } from "react";

import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const Type = ({match}) => {

    const [type, setType] = useState(null);
    const [dmgRelations, setDmgRelations] = useState(null);

    const getType = async() => {
        const API_ENDPOINT = `https://pokeapi.co/api/v2/type/${match.params.type}`
        console.log(API_ENDPOINT);
        try{
            const res = await fetch (API_ENDPOINT);
            const data = await res.json();
            setType(data)
            console.log(type);
            setDmgRelations(type["damage_relations"])
        }
        catch (err){
            console.log(err);
        }
    }

    useEffect(() => {

        getType();

    }, []);

    // useEffect(() => {

    //     if(!type) return;
    //     setDmgRelations(type["damage_relations"])
    //     console.log(dmgRelations);

    // }, [type])

    // console.log(type.damage_relations);
    // console.log(type.damage_relations.keys());

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatRelation = (str) => {
        let formattedRel = str.replace(/_/g, ' ');
        formattedRel = formattedRel.replace(/area/g, '')

        return capitalize(formattedRel);
    }

    if(!type) return (
        <Spinner className='spinner'animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    

    return (
        <div>
            <h1 className='type-name'>{capitalize(type.name)}</h1>
            <div className="dmg-relations">

                {Object.keys(type.damage_relations).map((key) => {

                    if (type.damage_relations[key].length === 0) {
                        return
                    }
                    // console.log(key);
                    // console.log(type.damage_relations[key]);
                    return(
                        <ListGroup className='relation' style={{ width: '30rem' }}>

                        <ListGroup.Item variant='primary'>{`${formatRelation(key)}:`}</ListGroup.Item>
                        {type.damage_relations[key].map((relation) => {
                            console.log(relation);
                            return(
                                <ListGroup.Item>{capitalize(relation.name)}</ListGroup.Item>
                            )
                        })}
                        </ListGroup>
                    )
                })}
                {/* {for (const relation in type.damage_relations) {
                    return(
                        <div>
                            <h1>{relation}</h1>
                            <ListGroup style={{ width: '40rem' }} className={relation}>
                                {relation.map((dmgMod) => {
                                    return (
                                        <ListGroup.Item>{dmgMod.name}</ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </div>
                    )
                })} */}
            </div>
        </div>
    );
};

export default Type;