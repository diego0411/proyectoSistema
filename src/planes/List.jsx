import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { planesAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const planes = useRecoilValue(planesAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getPlan();

        return userActions.resetPlanes;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Planes</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Plan</Link>
        </div>
    );
}
