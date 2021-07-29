import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import { useState, useEffect } from 'react';

const Location = ( {pokeData, capitalize} ) => {

    class VersionLocation{
        constructor(name, locations=[]){
            this.name = name;
            this.locations = locations;
        }

        addLocation(loc) {
            this.locations.push(loc)
        }

    }

    const [locations, setLocations] = useState(null)
    const [versions, setVersions] = useState(null)

    const getLocationData = async() => {
        try {
            const res = await fetch (`${pokeData.location_area_encounters}`);
            const data = await res.json();
            setLocations(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getVersionData = async() => {
        try{
            const res = await fetch ('https://pokeapi.co/api/v2/version/?limit=40')
            const data = await res.json()
            // console.log(data);
            const versionsTemp = data.results.map((version) => {
                return(
                    new VersionLocation(version.name)       
                )
            })
            setVersions(versionsTemp)
        }
        catch(err) {
            console.log(err);
        }
    }
    
    useEffect(()=> {
        getLocationData()
    }, [])
    
    useEffect(() => {
        getVersionData()
    },[locations])
    
    const formatLocation = (str) => {
        let formattedLoc = str.replace(/-/g, ' ');
        formattedLoc = formattedLoc.replace(/area/g, '')
        
        return capitalize(formattedLoc);
    }
    
    console.log(versions);
    if(!locations|| !versions) return (
        <Spinner className='spinner'animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    const sendLocToObject = () => {
        for (let i=0; i<versions.length; i++) {
            if(versions[i].locations.length > 0) return;
        }
        locations.map((location) => {
            return location.version_details.map((loc) => {
                for(let i=0; i<versions.length; i++) {
                    if (versions[i].name === loc.version.name) {
                        versions[i].locations.push(loc)
                    }
                }
            })
        })
    }

    sendLocToObject();

    console.log(versions);

    return (
        <ListGroup style={{ width: '40rem' }} className='locations'>
                    {locations.map((location) => {
                        // console.log(location.version_details)
                        return location.version_details.map((loc) => {
                            // console.log(loc);
                            if(!loc.encounter_details[0].method.name.includes('headbutt')) {
                            return (
                                <ListGroup.Item>{`Pokemon ${capitalize(loc.version.name)} -- ${loc.encounter_details[0].method.name} at ${formatLocation(location.location_area.name)}`}</ListGroup.Item>
                            )
                            }
                        })
                    })}
         </ListGroup>
    );
};

export default Location;