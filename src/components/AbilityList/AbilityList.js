import { useState, useEffect } from "react";

import { Card, Form, Spinner } from "react-bootstrap";

import { useHistory } from "react-router";

const Abilities = () => {

    const history = useHistory();
    const [abilityData, setAbilityData] = useState(null);
    const [search, setSearch] = useState(null)
    const [searchRes, setSearchRes] = useState(abilityData)

    const getAbilityData = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/ability/?limit=327')
            const data = await res.json();
            setAbilityData(data.results)
            setSearchRes(data.results)
        }
        catch (err) {
            console.log(err);
        }
    }

    const formatSearch = (str) => {
        let formattedSearch = str.replace(/ /g, '-');

        return formattedSearch;
    }

    const handleChange = (e) => {
        setSearch(e.target.value);

        const newArr = abilityData.filter(function (el) {
            return el.name.toLowerCase().includes(formatSearch(e.target.value.toLowerCase()))
        })

        setSearchRes(newArr)
        console.log(searchRes);
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        getAbilityData()
    }, [])



    console.log(abilityData);

    const formatAbility = (str) => {
        let formattedAbility = str.replace(/-/g, ' ');

        return capitalize(formattedAbility);
    }


    if (!abilityData || !searchRes) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    abilityData.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })

    return (
        <div>
            <Form.Control onChange={handleChange} className='ability-search' type="text" placeholder="Search for an ability" />
            {searchRes && searchRes.length !== abilityData.length && (
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
            {searchRes.length === abilityData.length && (

                <>
                    <Card bg='dark' className='one-line-desc ability-descriptor' style={{ width: '24rem' }}>
                        <Card.Text>All of the abilities in the games (click for details):</Card.Text>
                    </Card>
                    <div className='all-abilities'>
                        {abilityData.map((ability) => {
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