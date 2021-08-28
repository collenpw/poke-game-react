import { Card, ListGroup } from "react-bootstrap";

const determineMax = (stat, statName) => {
    if (statName === 'hp'){
        return(
            Math.floor(stat * 2 + 204)
        )
    }
        return Math.floor((stat * 2 + 99) * 1.1);
}

const determineMin = (stat, statName) => {
    if (statName === 'hp'){
        return(
            Math.floor((stat * 2 + 110))
        )
    }
        return Math.floor((stat * 2 + 5) * 0.9);
}

const Stats = ({pokeData}) => {
    return (
        <>
            <Card className='poke-stats' style={{width: '30rem'}}>
                {pokeData.stats.map((stat) => {
                    return(
                        <ListGroup.Item className='stat'>
                            {`Base ${stat.stat.name}: ${stat.base_stat}`} 
                            <span className='stats'>
                                <span className='min-stat'>{`Min: ${determineMin(stat.base_stat, stat.stat.name)} `}</span>
                                <span className='max-stat'>{`Max: ${determineMax(stat.base_stat, stat.stat.name)}`}</span>
                            </span> 
                        </ListGroup.Item>
                    )
                })}
            </Card>
            <ListGroup.Item
                style={{width: '24rem', fontStyle:'italic', margin: '.5rem auto', textAlign:'center'}}>
                    *The above max stats are at level 100 with 31 IVs, and 252 EVs with a boosting nature if applicable. The minimum are calculated with 0 IVs, 0 EV and a decrementing nature.*
            </ListGroup.Item>
        </>
    );
};

export default Stats;