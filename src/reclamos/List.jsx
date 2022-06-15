import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { reclamosAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const reclamos = useRecoilValue(reclamosAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getReclamo();

        return userActions.resetReclamos;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Realizar Reclamo</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">realizar reclamo</Link>
        </div>
    );
}
