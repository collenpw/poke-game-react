import { Dropdown } from "react-bootstrap";

const TypeDropdown = ({ setType, setTypeData, typeData }) => {

    const getTypeData = async (type) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await res.json();
            setTypeData(data.pokemon)
            console.log(data);
            // trimPokemonArr();
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleTypeChoice = (type) => {
        if (type !== 'none') {
            getTypeData(type);
        } else {
            setTypeData(null);
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle className='type-drop' variant="success" id="dropdown-basic">
                Filter by type
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => { handleTypeChoice('none') }} >None</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('normal') }} >Normal</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('fire') }} >Fire</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('water') }} >Water</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('grass') }} >Grass</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('electric') }} >Electric</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('ice') }} >Ice</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('fighting') }} >Fighting</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('poison') }} >Poison</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('ground') }} >Ground</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('flying') }} >Flying</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('psychic') }} >Psychic</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('bug') }} >Bug</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('rock') }} >Rock</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('ghost') }} >Ghost</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('dark') }} >Dark</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('dragon') }} >Dragon</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('steel') }} >Steel</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleTypeChoice('fairy') }} >Fairy</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    )
}
export default TypeDropdown;