import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

const PokeNav = ({locations, moves, name, setDisplayed, varieties, forms}) => {

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: name, value: '1', ref: 'home'},
        { name: 'Stats', value: '2', ref: 'Stats'}
    ];

    if(locations && locations.length > 0) {
        radios.push({name: 'Locations', value: `${radios.length + 1}`, ref: 'Locations'});
    }

    if(moves && moves.length > 0) {
        radios.push({name: 'Moves', value: `${radios.length + 1}`, ref: 'Moves'});
    }

    if(varieties && varieties.length > 1) {
        radios.push({name: 'Forms', value: `${radios.length + 1}`, ref: 'Forms'});
    }

    if(forms && forms.length > 1) {
        radios.push({name: 'Forms', value: `${radios.length + 1}`, ref: 'Forms'});
    }

    const handleClick = (e, name) => {
        setRadioValue(e.currentTarget.value)
        setDisplayed(name)
    }


    return (
        <div className='pokenav'>
            <ButtonGroup className="mb-2 ">
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