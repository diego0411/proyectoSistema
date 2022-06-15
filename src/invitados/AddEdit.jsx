import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { invitadoAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const invitado = useRecoilValue(invitadoAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
        apellidos: Yup.string()
            .required('almenuos uno de sus apellidos es requerido'),
        ci: Yup.number()
            .required('es requerido su Carnet de Identidad'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByInvitado(id);
        }

        return userActions.resetUser;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && invitado) {
            reset(invitado);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitado])

    function onSubmit(data) {
        return mode.add
            ? createInvitado(data)
            : updateInvitado(invitado.id, data);
    }

    function createInvitado(data) {
        data.reservaId = localStorage.getItem('idr');
        return userActions.registerInvitado(data)
            .then(() => {
                history.push('/invitados');
                alertActions.success('Invitado added');
            });
    }

    function updateInvitado(id, data) {
        return userActions.updateInvitado(id, data)
            .then(() => {
                history.push('/invitados');
                alertActions.success('Invitado updated');
            });
    }

    const loading = mode.edit && !invitado;
    return (
        <>
            <h1>{mode.add ? 'Add Invitado' : 'Edit Invitado'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>nombre</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>apellidos</label>
                            <input name="apellidos" type="text" {...register('apellidos')} className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.apellidos?.message}</div>
                        </div>
                        <div className="form-row"><div className="form-group col">
                            <label>ci</label>
                            <input name="ci" type="text" {...register('ci')} className={`form-control ${errors.ci ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.ci?.message}</div>
                        </div>
                    </div>

                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(invitado)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/invitados" className="btn btn-link">Cancel</Link>
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
