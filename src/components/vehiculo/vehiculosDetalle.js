import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

import { useParams, useNavigate } from "react-router-dom";

import vehiculosService from '../../services/vehiculosService';
import personasService from '../../services/personasService';

export default function VehiculosDetalle(props) {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('idVehiculo' in params);

    const vehiculoVacio = {id:"", modelo: "", matricula: "", conductor: { id: null, dni: "", nombre: "", apellidos: "" } };
    const [vehiculo, setVehiculo] = useState(vehiculoVacio);
    const [submitted, setSubmitted] = useState(false);
    const [personas, setPersonas] = useState([]);


    useEffect(() => {
        if (!esNuevo) {
            vehiculosService.buscarPorId(params.idVehiculo).then(res => setVehiculo(res.data));
        }
        personasService.buscarTodos().then(res => setPersonas(res.data));
    }, []);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _vehiculo = { ...vehiculo };

        _vehiculo[`${name}`] = val;
        
        setVehiculo(_vehiculo);
    }

    function onConductorChange(e) {
        let _vehiculo = { ...vehiculo };
        _vehiculo.conductor = e.value;
        setVehiculo(_vehiculo);
    }

    function onCancelar(event) {
        navigate("/vehiculo");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (datosVehiculoCorrectos(vehiculo)) {
            if (esNuevo) {
                await vehiculosService.crear(vehiculo);
            } else {
                await vehiculosService.modificar(vehiculo.id, vehiculo).catch(error => {
                    props.showError();
                });
            }
            navigate("/vehiculo");
        }
    }

    function datosVehiculoCorrectos(v) {
        return (v.matricula && v.modelo);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Detalle de cliente</span>}
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nuevo cliente</span>}

                <form onSubmit={handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="modelo" >Modelo</label>
                            <InputText id="modelo" value={vehiculo.modelo} onChange={(e) => onInputChange(e, 'modelo')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehiculo.modelo })} />
                            {submitted && !vehiculo.modelo && <small className="p-error">Debe indicarse un Modelo.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="matricula">Matrícula</label>
                            <InputText id="matricula" value={vehiculo.matricula} onChange={(e) => onInputChange(e, 'matricula')} required className={classNames({ 'p-invalid': submitted && !vehiculo.matricula })} />
                            {submitted && !vehiculo.matricula && <small className="p-error">Debe indicarse una Matrícula.</small>}
                        </div>
                        
                        <div className="p-field">
                            <label htmlFor="conductor">Conductor</label>
                            <Dropdown value={vehiculo.conductor} options={personas} onChange={onConductorChange} optionLabel="id"
                                filter showClear filterBy="id" placeholder={esNuevo ? "Seleccionar conductor" : `${vehiculo.conductor.id}`} />
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
