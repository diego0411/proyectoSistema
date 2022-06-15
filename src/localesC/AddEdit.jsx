import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { localAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const local = useRecoilValue(localAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
        direccion: Yup.string()
            .required('la direccion es requerida'),
        descripcion: Yup.string()
            .required('la descripcion es requerida')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByLocal(id);
        }

        return userActions.resetLocal;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && local) {
            reset(local);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local])

    function onSubmit(data) {
        return mode.add
            ? createLocal(data)
            : updateLocal(local.id, data);
    }

    function createLocal(data) {
        return userActions.registerLocal(data)
            .then(() => {
                history.push('/locales');
                alertActions.success('Local added');
            });
    }

    function updateLocal(id, data) {
        return userActions.updateLocal(id, data)
            .then(() => {
                history.push('/locales');
                alertActions.success('Local updated');
            });
    }

    const loading = mode.edit && !local;
    return (
        <>
            <h1>{mode.add ? 'Add Local' : 'Edit Local'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>nombre del local</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>direccion</label>
                            <input name="direccion" type="text" {...register('direccion')} className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.direccion?.message}</div>
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
                        <button onClick={() => reset(local)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/locales" className="btn btn-link">Cancel</Link>
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
