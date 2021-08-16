import HELPER from "../../HELPER";
import P from "../POKEDEX";

import { Form, Card } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const List = ({ getter, formatter, search, attr, match}) => {

    const [allToList, setAllToList] = useState(null);
    const [searchRes, setSearchRes] = useState(null);

    const history = useHistory();

    let plural = '';
    if (attr === 'type'){
        plural = 'types';
    }else if (attr === 'move'){
        plural = 'moves'
    }else if (attr === 'ability'){
        plural = 'abilities'
    }

    
    
    const getAllToList = async () => {
        try{
            const res = await getter;
            console.log(res);
            setAllToList(res.results)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        setAllToList(null);
        getAllToList();
    }, [formatter]);

    console.log(allToList);
    if(!allToList){
        return(
            <h1>Loading</h1>
        )
    }


    HELPER.alphabeticalSort(allToList)

    return (
        <div>

            <Form.Control onChange={(e) => {HELPER.handleSearch(e, setSearchRes, allToList)}} className='ability-search' type="text" placeholder={`Search for a ${attr}`} />
            {searchRes  && (
                <div className='all-abilities'>
                    {searchRes.map((attribute) => {
                        return (
                            <Card onClick={() => { history.push(`/${plural}/${attribute.name}`) }} border='dark' className='single-move'>
                                <Card.Title className='move-title'>{HELPER.capitalize(formatter(attribute.name))}</Card.Title>
                            </Card>
                        )
                    })}
                </div>
            )}

                    {!searchRes && (
                    <>
                        <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
                        <Card.Text>All of the {plural} in the games (click for details):</Card.Text>
                    </Card>
                    <div className='all-abilities'>
                        {allToList.map((attribute) => {
                            return (
                                <Card onClick={() => { history.push(`/${plural}/${attribute.name}`) }} border='dark' className='single-move'>
                                    <Card.Title className='move-title'>{HELPER.capitalize(formatter(attribute.name))}</Card.Title>
                                </Card>
                            )
                        })}
                    </div>
                    </>
                        )}
        </div>
    );
};

export default List;