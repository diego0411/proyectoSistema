import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { List } from  './List';



import {  eventoAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';


export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const evento = useRecoilValue(eventoAtom);
    let localId;






    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
        fecha: Yup.string()
            .required('la fecha es requerida'),
        horaInicio: Yup.string()
            .required('la hora de inicio es requerida'),
        horaFin: Yup.string()
            .required('la hora de finalizacion es requerida'),
        cantidadPersonas: Yup.string()
            .required('la cantidad de personas permitidas es requerida'),
       // localId: userActions.getData(),
            //Yup.string().required('el id de inicio es requerida'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByEvento(id);
        }

        return userActions.resetEvento;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && evento) {
            reset(evento);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [evento])

    function onSubmit(data) {
        return mode.add
            ? createEvento(data)
            : updateEvento(evento.id, data);
    }

    function createEvento(data) {
        data.localId = localStorage.getItem('idl');
        return userActions.registerEvento(data)
            .then(() => {
                history.push('/eventos');
                alertActions.success('Evento added');
            });
    }

    function updateEvento(id, data) {
        return userActions.updateEvento(id, data)
            .then(() => {
                history.push('/eventos');
                alertActions.success('Evento updated');
            });
    }


    const loading = mode.edit && !evento;
    let register1 = register('localId');
    return (
        <>
            <h1>{mode.add ? 'Add Evento' : 'Edit Evento'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>NOMBRE</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>FECHA</label>
                            <input name="fecha" type="text" {...register('fecha')} className={`form-control ${errors.fecha ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.fecha?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>HORA DE INICIO</label>
                            <input name="horaInicio" type="text" {...register('horaInicio')} className={`form-control ${errors.horaInicio ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.horaInicio?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>HORA DE FINALIZACION</label>
                            <input name="horaFin" type="text" {...register('horaFin')} className={`form-control ${errors.horaFin ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.horaFin?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>CUPOS DISPONIBLES</label>
                            <input name="cantidadPersona" type="text" {...register('cantidadPersonas')} className={`form-control ${errors.cantidadPersonas ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.cantidadPersonas?.message}</div>
                        </div>
                        <div className="form-group col">
                            </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            GUARDAR
                        </button>
                        <Link to="/eventos" className="btn btn-link">CANCELAR</Link>
                    </div>
                </form>
            }
            {loading &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
        </>
    );
}
