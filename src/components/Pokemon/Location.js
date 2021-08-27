import { Card, Button, ListGroup, Spinner, Modal } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import LocationModal from './LocationModal';

import HELPER from '../../HELPER';

const Location = ({ pokeData, locations, versions }) => {

    const [show, setShow] = useState(false);
    const [versionClicked, setVersionClicked] = useState(null);

    // // SHOW/ HIDE MODALS
    // const handleClose = () => setShow(false);
    const handleShow = (v) => {
        setShow(true);
        console.log(v);
        setVersionClicked(v);
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
            <div className='poke-moves'>
                {filterLocationsForHeadbutt()}
                <Card bg='dark' className='center-div white-text big-descriptor' style={{ width: '24rem' }}>
                    <Card.Text>{`${HELPER.capitalize(pokeData.name)} can be found in these games (click for details):`}</Card.Text>
                </Card>
                <div className='poke-moves'>

                    {versions.map((version) => {
                        if (version.locations.length === 0) return;
                        return (
                            <>
                                <Card style={{ width: '25rem' }} border='dark' className='move-list-on-pokemon'>
                                    <ListGroup.Item onClick={() => {handleShow(version)}} variant='dark'>{`Pokemon ${HELPER.capitalize(version.name)}`}</ListGroup.Item> 
                                </Card>
                                {versionClicked && (
                                    <LocationModal version={versionClicked} HELPER={HELPER} show={show} setShow={setShow} />

                                )}
                            </>
                        )
                    })}
                </div>
            </div>
        )
    )

};

export default Location;