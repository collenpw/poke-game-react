import { Modal, ListGroup, Button, CloseButton } from "react-bootstrap";

import { useState } from "react";

const LocationModal = ({version, HELPER, show, setShow}) => {

    // const [show, setShow] = useState(false);

    
    // SHOW/ HIDE MODALS
    const handleClose = () => setShow(false);

    // const handleShow = (v) => {
    //     setShow(true);
    //     console.log(v);
    //     setVersionClicked(v);
    // }

    console.log(version);
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
            <Modal.Title>{`Pokemon ${HELPER.capitalize(version.name)}`}</Modal.Title>
            <button className='btn-close' onClick={handleClose} />
            </Modal.Header>
            <Modal.Body style={{ overflowY:'auto', maxHeight: '600px'}}><p style={{fontWeight:'bold', textAlign:'center'}} >Locations:</p>
                <div className='flex-locations'>

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
                        <ListGroup.Item style={{width: '22rem'}}className='full-size-move'>{`${prefix}${HELPER.capitalize(detail.method)} ${prep} ${HELPER.formatLocation(detail.area)}`}</ListGroup.Item>
                        )
                    })}
                
                </div>
                </Modal.Body>
            <Modal.Footer>
        
            </Modal.Footer>
    </Modal>
    );
};

export default LocationModal;