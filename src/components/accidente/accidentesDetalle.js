import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import accidentesService from '../../services/accidentesService';

export default function AccidentesDetalle() {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('idAccidente' in params);

    const accidenteVacio = {id:"", descripcion: "", 
        localizacion: { 
            domicilio: "",
            localidad: "",
            codigoPostal: "",
            provincia: ""
        } 
    };
    const [accidente, setAccidente] = useState(accidenteVacio);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!esNuevo) {
            accidentesService.buscarPorId(params.idAccidente).then(res => setAccidente(res.data));
        }
    }, []);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _accidente = { ...accidente };
        
        
        if (name.includes('.')) {
            let splited = name.split('.');

            _accidente[`${splited[0]}`][`${splited[1]}`] = val;
        }
        else {
            _accidente[`${name}`] = val;
        }

        setAccidente(_accidente);
    }

    function onCancelar(event) {
        navigate("/accidente");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (datosAccidenteCorrectos(accidente)) {
            if (esNuevo) {
                await accidentesService.crear(accidente);
            } else {
                await accidentesService.modificar(accidente.id, accidente);
            }
            navigate("/accidente");
        }
    }

    function datosAccidenteCorrectos(c) {
        return (c.descripcion && c.localizacion.provincia);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Detalle de accidente</span>}
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nuevo accidente</span>}

                <form onSubmit={handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="descripcion" >Descripcion</label>
                            <InputText id="descripcion" value={accidente.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required autoFocus className={classNames({ 'p-invalid': submitted && !accidente.descripcion })} />
                            {submitted && !accidente.descripcion && <small className="p-error">Debe indicarse una Descripcion.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="localizacion.domicilio">Domicilio</label>
                            <InputText id="localizacion.domicilio" value={accidente.localizacion.domicilio} onChange={(e) => onInputChange(e, 'localizacion.domicilio')} required className={classNames({ 'p-invalid': submitted && !accidente.localizacion.domicilio })} />
                            {submitted && !accidente.localizacion.domicilio && <small className="p-error">Debe indicarse domicilio.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="localizacion.localidad">Localidad</label>
                            <InputText id="localizacion.localidad" value={accidente.localizacion.localidad} onChange={(e) => onInputChange(e, 'localizacion.localidad')} required className={classNames({ 'p-invalid': submitted && !accidente.localizacion.localidad })} />
                            {submitted && !accidente.localizacion.localidad && <small className="p-error">Debe indicarse localidad.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="localizacion.codigoPostal">Código Postal</label>
                            <InputText id="localizacion.codigoPostal" value={accidente.localizacion.codigoPostal} onChange={(e) => onInputChange(e, 'localizacion.codigoPostal')} required className={classNames({ 'p-invalid': submitted && !accidente.localizacion.codigoPostal })} />
                            {submitted && !accidente.localizacion.codigoPostal && <small className="p-error">Debe indicarse Código Postal.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="localizacion.provincia">Provincia</label>
                            <InputText id="localizacion.provincia" value={accidente.localizacion.provincia} onChange={(e) => onInputChange(e, 'localizacion.provincia')} required className={classNames({ 'p-invalid': submitted && !accidente.localizacion.provincia })} />
                            {submitted && !accidente.localizacion.provincia && <small className="p-error">Debe indicarse Provincia.</small>}
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
