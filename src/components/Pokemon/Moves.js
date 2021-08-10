
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

const Moves = ({ pokeData, capitalize }) => {

    const history = useHistory();

    class Method {
        constructor(method) {
            this.method = method;
            this.moves = [];
        }

        addMove(move) {
            this.moves.push(move);
        }
    }

    const egg = new Method('egg');
    const levelUp = new Method('level-up');
    const tutor = new Method('tutor');
    const machine = new Method('machine');
    const methods = [levelUp, egg, tutor, machine];

    pokeData.moves.map((move) => {
        for (let i = 0; i < methods.length; i++) {
            if (move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === methods[i].method) {
                methods[i].addMove(move)
            }

        }
    })

    levelUp.moves.sort(function (a, b) {
        return a.version_group_details[a.version_group_details.length - 1].level_learned_at - b.version_group_details[b.version_group_details.length - 1].level_learned_at;
    });

    const formatMove = (str) => {
        let formattedMove = str.replace(/-/g, ' ');
        return capitalize(formattedMove);
    }

    return (

        <div>
            <Card bg='dark' className='center-div, big-descriptor' style={{ width: '24rem' }}>
                <Card.Text>{`${capitalize(pokeData.name)} can learn the following moves via their respective method:`}</Card.Text>
            </Card>
            <div className='poke-moves'>
                {levelUp.moves.length !== 0 && (
                    <Card border='dark' className='move-list-on-pokemon'>
                        <ListGroupItem variant='secondary'>{capitalize(levelUp.method)}</ListGroupItem>
                        {levelUp.moves.map((move) => {
                            return (
                                <ListGroupItem className='full-size-move' onClick={() => { history.push(`/moves/${move.move.name}`) }}>{`${formatMove(move.move.name)} (level ${move.version_group_details[move.version_group_details.length - 1].level_learned_at})`}</ListGroupItem>
                            )
                        })}
                    </Card>
                )}
                {methods.map((method) => {

                    if (method.method === 'level-up' || method.moves.length === 0) return;

                    return (
                        <Card border='dark' className='move-list-on-pokemon'>
                            <ListGroupItem variant='secondary'>{capitalize(method.method)}</ListGroupItem>
                            {method.moves.map((move) => {
                                return (

                                    <ListGroupItem className='full-size-move' onClick={() => { history.push(`/moves/${move.move.name}`) }}>{`${formatMove(move.move.name)}`}</ListGroupItem>

                                )
                            })}
                        </Card>

                    )
                })}
            </div>
        </div>
    );
};

export default Moves;