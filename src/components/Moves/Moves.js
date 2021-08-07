import { json } from "body-parser";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

const Moves = () => {

    const history = useHistory();
    const [moveData, setMoveData] = useState(null)

    const getMoveData = async() => {
        try{
            const res = await fetch ('https://pokeapi.co/api/v2/move/?limit=1000');
            const data = await res.json();
            setMoveData(data.results);
        }
        catch(err){
            console.log(err);
        }

    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(()=> {
        getMoveData()
    }, []);

    if(!moveData) return(
        <h1>Loading...</h1>
    );

    
    
    moveData.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    const formatMove = (str) => {
        if(str[0]=== '1'){
            let arr = str.split('-');
            let numArr = arr.slice(0, 3).join(',');
            let wordArr = arr.slice(3).join(' ');
            console.log(wordArr);
            console.log(numArr);
            return `${numArr} ${wordArr}` 
        }
        let formattedMove = str.replace(/-/g, ' ');        
        return capitalize(formattedMove);
    }
    

    console.log(moveData);

    return (
        <div>
            <Card bg='dark'className='ability-descriptor'style={{ width: '24rem' }}>
                <Card.Text>All of the moves in the games (click for details):</Card.Text>
            </Card>
            <div className='all-abilities'>
                {moveData.map((move) => {
                    return(
                        <Card onClick={() => {history.push(`/moves/${move.name}`)}} border='dark' className='single-move'>
                            <Card.Title className='move-title'>{capitalize(formatMove(move.name))}</Card.Title>
                        </Card>
                    )
                })}
            </div>
        </div>        
    );
};

export default Moves;