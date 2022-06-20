import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { mesaAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const mesa = useRecoilValue(mesaAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        numeroMesa: Yup.string()
            .required('el numero de la mesa es requerido'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByMesa(id);
        }

        return userActions.resetMesa;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && mesa) {
            reset(mesa)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesa])

    function onSubmit(data) {
        return mode.add
            ? createMesa(data)
            : updateMesa(mesa.id, data);
    }

    function createMesa(data) {
        data.eventoId = localStorage.getItem('ide');
        return userActions.registerMesa(data)
            .then(() => {
                history.push('/mesas');
                alertActions.success('Mesa added');
            });
    }

    function updateMesa(id, data) {
        return userActions.updateMesa(id, data)
            .then(() => {
                history.push('/mesas');
                alertActions.success('Mesa updated');
            });
    }

    const loading = mode.edit && !mesa;
    return (
        <>
            <h1>{mode.add ? 'Add Mesa' : 'Edit Mesa'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>NUMERO DE MESA</label>
                            <input name="numeroMesa" type="text" {...register('numeroMesa')} className={`form-control ${errors.numeroMesa ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.numeroMesa?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(mesa)} type="button" disabled={isSubmitting} className="btn btn-secondary">RESET</button>
                        <Link to="/mesas" className="btn btn-link">CANCELAR</Link>
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