import { useState, useEffect } from "react";

import { Card, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

const Types = () => {

    const history = useHistory();
    const [typeData, setTypeData] = useState(null);

    const getTypeData = async() => {
        try{
            const res = await fetch ('https://pokeapi.co/api/v2/type/?limit=327')
            const data = await res.json();
            setTypeData(data.results)
        }
        catch(err){
            console.log(err);
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(()=> {
        getTypeData()
    }, [])



    console.log(typeData);


    if(!typeData) return <h1>Loading...</h1>

    typeData.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    return (
        <div>
            <Card bg='dark'className='ability-descriptor'style={{ width: '24rem' }}>
                <Card.Text>All of the types in the games (click for effectiveness):</Card.Text>
            </Card>
            <div className='all-abilities'>
                {typeData.map((type) => {
                    return(
                        <Card onClick={() => {history.push(`/types/${type.name}`)}} border='dark' className='single-ability'>
                            <Card.Title>{capitalize(type.name)}</Card.Title>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default Types;