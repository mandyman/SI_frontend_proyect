import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import personasService from '../../services/personasService';

export default function PersonasDetalle() {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('idPersona' in params);

    const personaVacio = {id:"", dni: "", nombre: "", apellidos: "" };
    const [persona, setPersona] = useState(personaVacio);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!esNuevo) {
            personasService.buscarPorId(params.idPersona).then(res => setPersona(res.data));
        }
    }, []);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _persona = { ...persona };

        _persona[`${name}`] = val;
        
        setPersona(_persona);
    }

    function onCancelar(event) {
        navigate("/persona");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (datosPersonaCorrectos(persona)) {
            if (esNuevo) {
                await personasService.crear(persona);
            } else {
                await personasService.modificar(persona.id, persona);
            }
            navigate("/persona");
        }
    }

    function datosPersonaCorrectos(c) {
        return (c.dni && c.nombre);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Detalle de persona</span>}
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nuevo persona</span>}

                <form onSubmit={handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="dni" >DNI</label>
                            <InputText id="dni" value={persona.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && !persona.dni })} />
                            {submitted && !persona.dni && <small className="p-error">Debe indicarse un DNI.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" value={persona.nombre} onChange={(e) => onInputChange(e, 'nombre')} required className={classNames({ 'p-invalid': submitted && !persona.nombre })} />
                            {submitted && !persona.nombre && <small className="p-error">Debe indicarse un nombre.</small>}
                        </div>
                        
                        <div className="p-field">
                            <label htmlFor="nombre">Apellidos</label>
                            <InputText id="nombre" value={persona.apellidos} onChange={(e) => onInputChange(e, 'apellidos')} required className={classNames({ 'p-invalid': submitted && !persona.apellidos })} />
                            {submitted && !persona.apellidos && <small className="p-error">Debe indicarse apellidos.</small>}
                        </div>

                    </div>

                    <Divider />

                    <div className="p-p-3">
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-outlined mr-2" onClick={onCancelar} />
                        <Button label="Guardar" icon="pi pi-check" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}
