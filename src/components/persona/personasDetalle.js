import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import personasService from '../../services/personasService';

export default function PersonasDetalle(props) {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('idPersona' in params);

    const personaVacio = {id:"", dni: "", nombre: "", apellidos: "", 
        direccion: { 
            domicilio: "",
            localidad: "",
            codigoPostal: "",
            provincia: ""
        } 
    };
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
        
        
        if (name.includes('.')) {
            let splited = name.split('.');

            _persona[`${splited[0]}`][`${splited[1]}`] = val;
        }
        else {
            _persona[`${name}`] = val;
        }

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
                await personasService.modificar(persona.id, persona).catch(error => {
                    props.showError();
                });
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
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nueva persona</span>}

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

                        <div className="p-field">
                            <label htmlFor="direccion.domicilio">Domicilio</label>
                            <InputText id="direccion.domicilio" value={persona.direccion.domicilio} onChange={(e) => onInputChange(e, 'direccion.domicilio')} required className={classNames({ 'p-invalid': submitted && !persona.direccion.domicilio })} />
                            {submitted && !persona.direccion.domicilio && <small className="p-error">Debe indicarse domicilio.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="direccion.localidad">Localidad</label>
                            <InputText id="direccion.localidad" value={persona.direccion.localidad} onChange={(e) => onInputChange(e, 'direccion.localidad')} required className={classNames({ 'p-invalid': submitted && !persona.direccion.localidad })} />
                            {submitted && !persona.direccion.localidad && <small className="p-error">Debe indicarse localidad.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="direccion.codigoPostal">Código Postal</label>
                            <InputText id="direccion.codigoPostal" value={persona.direccion.codigoPostal} onChange={(e) => onInputChange(e, 'direccion.codigoPostal')} required className={classNames({ 'p-invalid': submitted && !persona.direccion.codigoPostal })} />
                            {submitted && !persona.direccion.codigoPostal && <small className="p-error">Debe indicarse Código Postal.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="direccion.provincia">Provincia</label>
                            <InputText id="direccion.provincia" value={persona.direccion.provincia} onChange={(e) => onInputChange(e, 'direccion.provincia')} required className={classNames({ 'p-invalid': submitted && !persona.direccion.provincia })} />
                            {submitted && !persona.direccion.provincia && <small className="p-error">Debe indicarse Provincia.</small>}
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
