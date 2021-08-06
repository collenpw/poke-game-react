
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Moves = ({pokeData, capitalize}) => {

    class Method{
        constructor(method){
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
    const methods= [levelUp, egg, tutor, machine];

    pokeData.moves.map((move) => {
        for(let i=0; i< methods.length; i++) {
            if(move.version_group_details[move.version_group_details.length - 1].move_learn_method.name === methods[i].method){
                methods[i].addMove(move)
            }

        }
    })

    // console.log(egg);
    // console.log(levelUp);
    // console.log(machine);
    // console.log(tutor);

    console.log(levelUp.moves);
    // console.log(tutor.moves);

    levelUp.moves.sort(function(a, b) {
        return a.version_group_details[a.version_group_details.length - 1].level_learned_at - b.version_group_details[b.version_group_details.length - 1].level_learned_at;
    });

    // console.log(pokeData.moves);
    return (
        <div className='poke-moves'>
            <ListGroup className='move-list-on-pokemon'>
                <ListGroupItem variant='secondary'>{capitalize(levelUp.method)}</ListGroupItem>
                {levelUp.moves.map((move) => {
                    return(
                        <ListGroupItem>{`${capitalize(move.move.name)} (level ${move.version_group_details[move.version_group_details.length -1].level_learned_at})`}</ListGroupItem> 
                    )
                })}
            </ListGroup>
        {methods.map((method) => {
            if(method.method === 'level-up') return;
            return(
                <ListGroup className='move-list-on-pokemon'>
                    <ListGroupItem variant='secondary'>{capitalize(method.method)}</ListGroupItem>
                    {method.moves.map((move) => {
                        return(

                                <ListGroupItem>{`${capitalize(move.move.name)}`}</ListGroupItem> 
                            
                            )
                        })}
                </ListGroup>

                )
            })}
        </div>
    );
};

export default Moves;