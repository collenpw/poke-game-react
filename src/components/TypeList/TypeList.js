import { useState, useEffect } from "react";

import { Card, Spinner } from "react-bootstrap";

import { useHistory } from "react-router";

import HELPER from "../../HELPER";
import P from "../POKEDEX";

const Types = () => {

    const history = useHistory();
    const [allTypes, setAllTypes] = useState(null);

    const getAllTypes = async () => {
        try {
            const res = await P.getTypesList();
            setAllTypes(res.results)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllTypes();
    }, [])

    if (!allTypes) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
   HELPER.alphabeticalSort(allTypes);

    return (
        <div>
            <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
                <Card.Text>All of the types in the games (click for effectiveness):</Card.Text>
            </Card>
            <div className='all-types'>
                {allTypes.map((type) => {
                    console.log(parseInt((type.url.split('/')[6].length)));
                    if (parseInt(type.url.split('/')[6]) > 20) return;
                    return (
                        <Card className='single-type' onClick={() => { history.push(`/types/${type.name}`) }} border='dark' >
                            <Card.Title>{HELPER.capitalize(type.name)}</Card.Title>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default Types;