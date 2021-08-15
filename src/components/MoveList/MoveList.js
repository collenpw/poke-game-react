import { useState, useEffect } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

import P from '../POKEDEX'
import HELPER from "../../HELPER";

const Moves = () => {

    const history = useHistory();
    const [allMoves, setAllMoves] = useState(null);
    const [searchRes, setSearchRes] = useState(allMoves);

    const getAllMoves = async () => {
        try {
            const res = await P.getMovesList();
            setAllMoves(res.results);
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getAllMoves();
    }, []);
    
    if (!allMoves) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

        
    HELPER.alphabeticalSort(allMoves);

    const formatMove = (str) => {
        if (str[0] === '1') {
            let arr = str.split('-');
            let numArr = arr.slice(0, 3).join(',');
            let wordArr = arr.slice(3).join(' ');
            console.log(wordArr);
            console.log(numArr);
            return `${numArr} ${wordArr}`
        }
        let formattedMove = str.replace(/-/g, ' ');
        return HELPER.capitalize(formattedMove);
    }


    console.log(searchRes);

    return (
        <div>

            <Form.Control onChange={(e) => {HELPER.handleSearch(e, setSearchRes, allMoves)}} className='ability-search' type="text" placeholder="Search for a move" />
            {searchRes  && (
                <div className='all-abilities'>
                    {searchRes.map((move) => {
                        return (
                            <Card onClick={() => { history.push(`/moves/${move.name}`) }} border='dark' className='single-move'>
                                <Card.Title className='move-title'>{HELPER.capitalize(formatMove(move.name))}</Card.Title>
                            </Card>
                        )
                    })}
                </div>
            )}

    <>
                    <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
                        <Card.Text>All of the moves in the games (click for details):</Card.Text>
                    </Card>
                    <div className='all-abilities'>
                        {allMoves.map((move) => {
                            return (
                                <Card onClick={() => { history.push(`/moves/${move.name}`) }} border='dark' className='single-move'>
                                    <Card.Title className='move-title'>{HELPER.capitalize(formatMove(move.name))}</Card.Title>
                                </Card>
                            )
                        })}
                    </div>
                </>
            {/* )} */}
        </div>
    );
};

export default Moves;