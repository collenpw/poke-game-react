import { Card, ListGroupItem, ListGroup, Spinner } from 'react-bootstrap';

import { useState, useEffect } from 'react';

const Location = ({ pokeData, capitalize }) => {

    class VersionLocation {
        constructor(name, locations = []) {
            this.name = name;
            this.locations = locations;
        }

        addLocation(loc) {
            this.locations.push(loc)
        }

    }

    class VersionMethodAndLocation {
        constructor(area, name, method) {
            this.area = area;
            this.name = name;
            this.method = method;
        }
    }

    const [locations, setLocations] = useState(null)
    const [versions, setVersions] = useState(null)

    const getLocationData = async () => {
        try {
            const res = await fetch(`${pokeData.location_area_encounters}`);
            const data = await res.json();
            const temp = data.map((loc) => {
                return loc.version_details.map((detail) => {
                    return new VersionMethodAndLocation(loc.location_area.name, detail.version.name, detail.encounter_details[0].method.name)

                })

            })
            setLocations(temp);
        }
        catch (err) {
            console.log(err);
        }

    }

    const getVersionData = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/version/?limit=40')
            const data = await res.json()
            const versionsTemp = data.results.map((version) => {
                return (
                    new VersionLocation(version.name)
                )
            })
            setVersions(versionsTemp)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLocationData()
    }, [])

    useEffect(() => {
        getVersionData()
    }, [locations])

    const formatLocation = (str) => {
        let formattedLoc = str.replace(/-/g, ' ');
        formattedLoc = formattedLoc.replace(/area/g, '')

        return capitalize(formattedLoc);
    }

    if (!locations || !versions) return (
        <Spinner className='spinner' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    const sendLocToObject = () => {
        for (let i = 0; i < versions.length; i++) {
            if (versions[i].locations.length > 0) return;
        }
        for (let z = 0; z < versions.length; z++) {
            for (let i = 0; i < locations.length; i++) {
                for (let j = 0; j < locations[i].length; j++) {
                    if (locations[i][j].name === versions[z].name) {
                        versions[z].locations.push(locations[i][j])
                    }
                }
            }
        }
    }

    sendLocToObject();

    const filterLocationsForHeadbutt = () => {

        versions.map((version) => {
            if (version.locations.length === 0) return;
            for (let i = 0; i < version.locations.length; i++) {
                if (version.locations[i].method.includes('headbut')) {
                    version.locations.splice(i, 1);
                }
            }

        })
    }

    filterLocationsForHeadbutt();
    return (
        locations.length > 0 && (
            <div>
                {filterLocationsForHeadbutt()}
                <Card bg='dark' className='center-div white-text big-descriptor' style={{ width: '24rem' }}>
                    <Card.Text>{`${capitalize(pokeData.name)} can be found in these games, at their respective location:`}</Card.Text>
                </Card>
                <div className='locations'>

                    {versions.map((version) => {
                        if (version.locations.length === 0) return;
                        return (
                            <>
                                <Card style={{ width: '25rem' }} border='dark' className='location'>
                                    <ListGroup.Item variant='dark'>{`Pokemon ${capitalize(version.name)}:`}</ListGroup.Item>
                                    {version.locations.map((detail) => {

                                        if (detail.method.includes('headbutt')) return

                                        let prefix = '';
                                        if (detail.method.includes('rod')) {
                                            prefix = 'Use the '
                                        }

                                        let prep = 'at'
                                        if (detail.method === 'walk') {
                                            prep = 'around'
                                        }
                                        return (
                                            <ListGroup.Item>{`${prefix}${capitalize(detail.method)} ${prep} ${formatLocation(detail.area)}`}</ListGroup.Item>
                                        )
                                    })}
                                </Card>
                            </>
                        )
                    })}
                </div>
            </div>
        )
    )
};

export default Location;