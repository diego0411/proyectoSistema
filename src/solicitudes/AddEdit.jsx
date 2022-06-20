import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { solicitudAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const solicitud = useRecoilValue(solicitudAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        Renovacion: Yup.boolean(),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getBySolicitud(id);
        }

        return userActions.resetSolicitud;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && solicitud) {
            reset(solicitud);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [solicitud])

    function onSubmit(data) {
        return mode.add
            ? createSolicitud(data)
            : updateSolicitud(solicitud.id, data);
    }

    function createSolicitud(data) {
        data.planId = localStorage.getItem('idp');
        return userActions.registerSolicitud(data)
            .then(() => {
                history.push('/solicitudes');
                alertActions.success('Solicitud added');
            });
    }

    function updateSolicitud(id, data) {
        return userActions.updateSolicitud(id, data)
            .then(() => {
                history.push('/solicitudes');
                alertActions.success('Solicitud updated');
            });
    }

    const loading = mode.edit && !solicitud;
    return (
        <>
            <h1>{mode.add ? 'Add Solicitud' : 'Edit Solicitud'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Renovaciones</label>
                            <input name="Renovacion" type="checkbox" aria-invalid={true} {...register('Renovacion')} className={`form-control ${errors.Renovacion ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.Renovacion?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(solicitud)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/solicitudes" className="btn btn-link">Cancel</Link>
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
