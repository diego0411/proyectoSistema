import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { reclamoAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const reclamo = useRecoilValue(reclamoAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        asunto: Yup.string()
            .required('el asunto es requerido'),
        descripcion: Yup.string()
            .required('la descripcion es requerida'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByReclamo(id);
        }

        return userActions.resetReclamo;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && reclamo) {
            reset(reclamo);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reclamo])

    function onSubmit(data) {
        return mode.add
            ? createReclamo(data)
            : updateReclamo(reclamo.id, data);
    }

    function createReclamo(data) {
        return userActions.registerReclamo(data)
            .then(() => {
                history.push('/reclamos');
                alertActions.success('Reclamo added');
            });
    }

    function updateReclamo(id, data) {
        return userActions.updateReclamo(id, data)
            .then(() => {
                history.push('/reclamos');
                alertActions.success('Reclamo updated');
            });
    }

    const loading = mode.edit && !reclamo;
    return (
        <>
            <h1>{mode.add ? 'Add Reclamo' : 'Edit Reclamo'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>asunto</label>
                            <input name="asunto" type="text" {...register('asunto')} className={`form-control ${errors.asunto ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.asunto?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>descripcion</label>
                            <input name="descripcion" type="text" {...register('descripcion')} className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.descripcion?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(reclamo)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/reclamos" className="btn btn-link">Cancel</Link>
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
