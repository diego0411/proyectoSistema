import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { itemAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const item = useRecoilValue(itemAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
        descripcion: Yup.string()
            .required('la descripcion es requerida'),
        precio: Yup.number()
            .required('el precio es requerido'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByItem(id);
        }

        return userActions.resetItem;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && item) {
            reset(item);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item])

    function onSubmit(data) {
        return mode.add
            ? createItem(data)
            : updateItem(item.id, data);
    }

    function createItem(data) {
        data.menuId = localStorage.getItem('idm');
        return userActions.registerItem(data)
            .then(() => {
                history.push('/items');
                alertActions.success('Item added');
            });
    }

    function updateItem(id, data) {
        return userActions.updateItem(id, data)
            .then(() => {
                history.push('/items');
                alertActions.success('Item updated');
            });
    }

    const loading = mode.edit && !item;
    return (
        <>
            <h1>{mode.add ? 'Add Menu' : 'Edit Menu'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>nombre del Item</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>descripcion</label>
                            <input name="descripcion" type="text" {...register('descripcion')} className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.descripcion?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>precio</label>
                            <input name="precio" type="text" {...register('precio')} className={`form-control ${errors.precio ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.precio?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(item)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/items" className="btn btn-link">Cancel</Link>
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
