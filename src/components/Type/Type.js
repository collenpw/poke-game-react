import { useState, useEffect } from "react";

import { Card, ListGroup, Spinner, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

import HELPER from "../../HELPER";
import P from "../POKEDEX";

const Type = ({ match }) => {

    const history = useHistory();

    const [type, setType] = useState(null);

    const getType = async () => {
        try {
            setType(await P.getTypeByName(match.params.type))
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setType(null);
        getType();
    }, [match]);

    if (!type) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return (
        <div>

            <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '10rem' }}>
                <Card.Text>{`${HELPER.capitalize(match.params.type)}:`}</Card.Text>
            </Card>

            <div className="dmg-relations">

                {Object.keys(type.damage_relations).map((key) => {

                    if (type.damage_relations[key].length === 0) { return }
                    return (
                        <ListGroup className='relation' style={{ width: '12rem' }}>

                            <ListGroup.Item variant='dark'>{`${HELPER.replaceUnderscoreWithSpace(key)}:`}</ListGroup.Item>
                            {type.damage_relations[key].map((relation) => {
                                return (
                                    <ListGroupItem onClick={() => { history.push(relation.name) }} >{HELPER.capitalize(relation.name)}</ListGroupItem>
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