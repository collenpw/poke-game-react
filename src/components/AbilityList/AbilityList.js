import { useState } from "react";

import { Card, Form, Spinner } from "react-bootstrap";

import { useHistory } from "react-router";

const Abilities = ({ allAbilities }) => {

    const history = useHistory();
    const [searchRes, setSearchRes] = useState(allAbilities);

    const formatSearch = (str) => {
        let formattedSearch = str.replace(/ /g, '-');
        return formattedSearch;
    }

    const handleChange = (e) => {
        const newArr = allAbilities.filter(function (el) {
            return el.name.toLowerCase().includes(formatSearch(e.target.value.toLowerCase()))
        })

        setSearchRes(newArr)
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    const formatAbility = (str) => {
        let formattedAbility = str.replace(/-/g, ' ');

        return capitalize(formattedAbility);
    }


    if (!allAbilities || !searchRes) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    allAbilities.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })

    return (
        <div>
            <Form.Control onChange={handleChange} className='ability-search' type="text" placeholder="Search for an ability" />
            {searchRes && searchRes.length !== allAbilities.length && (
                <div className='all-abilities'>
                    {searchRes.map((ability) => {
                        return (
                            <Card onClick={() => { history.push(`/abilities/${ability.name}`) }} border='dark' className='single-ability'>
                                <Card.Title>{formatAbility(ability.name)}</Card.Title>
                            </Card>
                        )
                    })}
                </div>

            )}
            {searchRes.length === allAbilities.length && (

                <>
                    <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
                        <Card.Text>All of the abilities in the games (click for details):</Card.Text>
                    </Card>
                    <div className='all-abilities'>
                        {allAbilities.map((ability) => {
                            return (
                                <Card onClick={() => { history.push(`/abilities/${ability.name}`) }} border='dark' className='single-ability'>
                                    <Card.Title>{formatAbility(ability.name)}</Card.Title>
                                </Card>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Abilities;