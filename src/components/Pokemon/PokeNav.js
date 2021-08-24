import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

const PokeNav = ({locations, moves, name, setDisplayed}) => {

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: name, value: '1', ref: 'home' },
    ];

    if(locations && locations.length > 0) {
        radios.push({name: 'Locations', value: `${radios.length + 1}`, ref: 'Locations'});
    }

    if(moves && moves.length > 0) {
        radios.push({name: 'Moves', value: `${radios.length + 1}`, ref: 'Moves'});
    }

    console.log(radios);
    console.log(locations);
    console.log(moves);

    const handleClick = (e, name) => {
        setRadioValue(e.currentTarget.value)
        setDisplayed(name)
    }


    return (
        <div>
            <ButtonGroup className="mb-2">
                    {radios.map((radio, idx) => (
                    <Button
                        active={radioValue === radio.value}
                        key={idx}
                        id={`radio-${idx}`}
                        variant="secondary"
                        value={radio.value}
                        onClick={(e) => {handleClick(e, radio.ref)}}
                    >
                        {radio.name}
                    </Button>
                    ))}
            </ButtonGroup>
   
        </div>
    );
};

export default PokeNav;