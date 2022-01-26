import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

import { useParams, useNavigate } from "react-router-dom";

import multasService from '../../services/multasService';
import accidentesService from '../../services/accidentesService';

export default function MultasDetalle(props) {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('idMulta' in params);

    const multaVacio = {id:"", tipo: "", sancion: "", accidente: { id: null, descripcion: "", localizacion: {} } };
    const [multa, setMulta] = useState(multaVacio);
    const [submitted, setSubmitted] = useState(false);
    const [accidentes, setAccidentes] = useState([]);


    useEffect(() => {
        if (!esNuevo) {
            multasService.buscarPorId(params.idMulta).then(res => setMulta(res.data));
        }
        accidentesService.buscarTodos().then(res => setAccidentes(res.data));
    }, []);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _multa = { ...multa };

        _multa[`${name}`] = val;
        
        setMulta(_multa);
    }

    function onAccidenteChange(e) {
        let _multa = { ...multa };
        _multa.accidente = e.value;
        setMulta(_multa);
    }

    function onCancelar(event) {
        navigate("/multa");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (datosMultaCorrectos(multa)) {
            if (esNuevo) {
                await multasService.crear(multa);
            } else {
                await multasService.modificar(multa.id, multa).catch(error => {
                    props.showError();
                });
            }
            navigate("/multa");
        }
    }

    function datosMultaCorrectos(v) {
        return (v.tipo && v.sancion && v.accidente.id);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Detalle de multa</span>}
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nuevo multa</span>}

                <form onSubmit={handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="tipo" >Tipo</label>
                            <InputText id="tipo" value={multa.tipo} onChange={(e) => onInputChange(e, 'tipo')} required autoFocus className={classNames({ 'p-invalid': submitted && !multa.tipo })} />
                            {submitted && !multa.tipo && <small className="p-error">Debe indicarse un Tipo.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="sancion">Sanción</label>
                            <InputText id="sancion" value={multa.sancion} onChange={(e) => onInputChange(e, 'sancion')} required className={classNames({ 'p-invalid': submitted && !multa.sancion })} />
                            {submitted && !multa.sancion && <small className="p-error">Debe indicarse una Sanción.</small>}
                        </div>
                        
                        <div className="p-field">
                            <label htmlFor="accidente">Accidente</label>
                            <Dropdown value={multa.accidente} options={accidentes} onChange={onAccidenteChange} optionLabel="id"
                                filter showClear filterBy="id" placeholder={esNuevo ? "Seleccionar accidente" : multa.accidente.id} />
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
