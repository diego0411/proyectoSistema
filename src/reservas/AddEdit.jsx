import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { reservaAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const reserva = useRecoilValue(reservaAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        hora: Yup.string()
            .required('la hora es requerida'),
        cantidadInvitados: Yup.string()
            .required('el numero de sus invitados es requerido'),
        mesaId: Yup.string()
            .required('el id de su mesa es requerido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByReserva(id);
        }

        return userActions.resetReservas;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && reserva) {
            reset(reserva);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reserva])

    function onSubmit(data) {
        return mode.add
            ? createReserva(data)
            : updateReserva(reserva.id, data);
    }

    function createReserva(data) {
        return userActions.registerReserva(data)
            .then(() => {
                history.push('/reservas');
                alertActions.success('Reservas added');
            });
    }

    function updateReserva(id, data) {
        return userActions.updateReserva(id, data)
            .then(() => {
                history.push('/reserva');
                alertActions.success('reserva updated');
            });
    }

    const loading = mode.edit && !reserva;
    return (
        <>
            <h1>{mode.add ? 'Add Reserva' : 'Edit Reserva'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>hora</label>
                            <input name="hora" type="text" {...register('hora')} className={`form-control ${errors.hora ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.hora?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>numero de Invitados</label>
                            <input name="cantidadInvitados" type="text" {...register('cantidadInvitados')} className={`form-control ${errors.cantidadInvitados ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.cantidadInvitados?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Nro.Mesa</label>
                            <input name="mesaId" type="text" {...register('mesaId')} className={`form-control ${errors.mesaId ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.mesaId?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(reserva)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/reserva" className="btn btn-link">Cancel</Link>
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
