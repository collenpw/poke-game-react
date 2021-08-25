import { Card } from "react-bootstrap";

import { useState, useEffect } from "react";

import HELPER from "../../HELPER";

const NoClickPokeCard = ({form}) => {

    const [currentForm, setCurrentForm] = useState(null);

    const getCurrentForm = async(url) => {
        try{
            const res = await fetch (url);
            const data = await res.json();
            setCurrentForm(data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCurrentForm(form.url);
    }, []);

    useEffect(() => {
        if(!currentForm) return
        if(!currentForm.names){
            getCurrentForm(currentForm.forms[0].url)
        }
    }, [currentForm])

    return (
        currentForm && (
            <Card className='center-div shadow-box' border='dark' style={{ topMargin: '1rem !important', width: '18rem' }}>
                <Card.Img src={currentForm.sprites.front_default} />
                <Card.Body>
                    <Card.Title>

                        {!currentForm.names || currentForm.names.length === 0 && (
                            HELPER.replaceDashWithSpace(currentForm.name)
                        )}

                        {currentForm.names && (
                            <>
                                {currentForm.names.map((name) => {
                                    if(name.language.name === 'en'){
                                        return name.name;
                                    }
                                    
                                })}
                            </>
                        )}

                    </Card.Title>
                </Card.Body>
            </Card>

        )
    );
};

export default NoClickPokeCard;