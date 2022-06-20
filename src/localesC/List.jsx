import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { localesAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const locales = useRecoilValue(localesAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getLocal();

        return userActions.resetLocales;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Locales Disponibles</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '30%' }}>idLocal</th>
                    <th style={{ width: '30%' }}>nombre</th>
                    <th style={{ width: '30%' }}>descripcion</th>
                    <th style={{ width: '30%' }}>direccion</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {locales?.map(local =>
                    <>
                        <tr key={local.id}>
                            <td>{local.id}</td>
                            <td>{local.nombre}</td>
                            <td>{local.direccion}</td>
                            <td>{local.descripcion}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to="/eventosC" onClick={() => userActions.saveData(local.id)}  className="btn btn-sm btn-primary mr-1">eventos</Link>
                            </td>
                        </tr>
                    </>
                )}
                {!locales &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <span className="spinner-border spinner-border-lg align-center"></span>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
}
export default List;