import { useState, useEffect } from "react";

import { Card, ListGroup, Spinner, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

const Type = ({ match }) => {

    const history = useHistory();

    const [type, setType] = useState(null);
    const [dmgRelations, setDmgRelations] = useState(null);

    const getType = async () => {
        const API_ENDPOINT = `https://pokeapi.co/api/v2/type/${match.params.type}`
        console.log(API_ENDPOINT);
        try {
            const res = await fetch(API_ENDPOINT);
            const data = await res.json();
            setType(data)
            console.log(type);
            setDmgRelations(type["damage_relations"])
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        getType();

    }, []);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const formatRelation = (str) => {
        let formattedRel = str.replace(/_/g, ' ');
        formattedRel = formattedRel.replace(/area/g, '')

        return capitalize(formattedRel);
    }

    const weirdRedirect = async (name) => {
        await history.push('/');
        history.push(`/types/${name}`)
    }

    if (!type) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )



    return (
        <div>

            <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '10rem' }}>
                <Card.Text>{`${capitalize(match.params.type)}:`}</Card.Text>
            </Card>

            <div className="dmg-relations">

                {Object.keys(type.damage_relations).map((key) => {

                    if (type.damage_relations[key].length === 0) {
                        return
                    }
                    return (
                        <ListGroup className='relation' style={{ width: '12rem' }}>

                            <ListGroup.Item variant='dark'>{`${formatRelation(key)}:`}</ListGroup.Item>
                            {type.damage_relations[key].map((relation) => {
                                return (
                                    <ListGroupItem onClick={() => { weirdRedirect(relation.name) }} >{capitalize(relation.name)}</ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    )
                })}

            </div>
        </div>
    );
};

export default Type;