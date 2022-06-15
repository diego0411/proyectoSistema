import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { planAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const plan = useRecoilValue(planAtom);

    // form validation rules
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('el nombre es requerido'),
        descripcion: Yup.string()
            .required('la descripcion es requerida'),
        precio: Yup.string()
            .required('el precio es requerido'),
        cantidadMeses: Yup.string()
            .required('la cantidad de meses es requerida'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getByPlan(id);
        }

        return userActions.resetPlan;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && plan) {
            reset(plan);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plan])

    function onSubmit(data) {
        return mode.add
            ? createPlan(data)
            : updatePlan(plan.id, data);
    }

    function createPlan(data) {
        return userActions.registerPlan(data)
            .then(() => {
                history.push('/planes');
                alertActions.success('Plan added');
            });
    }

    function updatePlan(id, data) {
        return userActions.updatePlan(id, data)
            .then(() => {
                history.push('/planes');
                alertActions.success('plan updated');
            });
    }

    const loading = mode.edit && !plan;
    return (
        <>
            <h1>{mode.add ? 'Add Plan' : 'Edit Plan'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>nombre del local</label>
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
                        <div className="form-group col">
                            <label>cantidadMeses</label>
                            <input name="cantidadMeses" type="text" {...register('cantidadMeses')} className={`form-control ${errors.cantidadMeses ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.cantidadMeses?.message}</div>
                        </div>

                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(plan)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/planes" className="btn btn-link">Cancel</Link>
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
