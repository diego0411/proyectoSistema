import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { menuAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const menu = useRecoilValue(menuAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByMenu(id);
        }

        return userActions.resetMenu;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && menu) {
            reset(menu);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    function onSubmit(data) {
        return mode.add
            ? createMenu(data)
            : updateMenu(menu.id, data);
    }

    function createMenu(data) {
        data.eventoId = localStorage.getItem('ide');
        return userActions.registerMenu(data)
            .then(() => {
                history.push('/menus');
                alertActions.success('Menu added');
            });
    }

    function updateMenu(id, data) {
        return userActions.updateMenu(id, data)
            .then(() => {
                history.push('/menus');
                alertActions.success('Menu updated');
            });
    }

    const loading = mode.edit && !menu;
    return (
        <>
            <h1>{mode.add ? 'Add Menu' : 'Edit Menu'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>nombre del menu</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(menu)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/menus" className="btn btn-link">Cancel</Link>
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