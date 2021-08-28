import NoClickPokeCard from "../Poke-Card/NoClickPokeCard";

import { useState, useEffect } from "react";

import HELPER from "../../HELPER";

const Forms = ({specData, pokeData}) => {

    const [formData, setFormData] = useState(null);

    
    useEffect(() => {
        if(!pokeData || !specData) return;
        if(pokeData.forms.length > 1) {
            setFormData(pokeData.forms)
        } else {
            setFormData(specData.varieties)
        }

    }, [pokeData])

    console.log(formData);

    return (
        <div>
            {formData && (

                <div className='pokeList'>
                {pokeData.forms.length > 1 && (
                    <>
                        {formData.map((form) => {
                            return(
                                <NoClickPokeCard form={form} />
                                )
                            })}
            
                    </>
                )}

                {pokeData.forms.length <= 1 && (
                    <>
                        {formData.map((form) => {
                            return(
                                <NoClickPokeCard form={form.pokemon} />
                                )
                            })}
                    </>
                )}
            </div>
        )}
        </div>
    );
};

export default Forms;