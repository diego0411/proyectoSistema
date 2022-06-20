import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { useUserActions } from '_actions';


export { Nav };

function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();
    let role = null;
    if (JSON.parse(localStorage.getItem('user'))){
        role= JSON.parse(localStorage.getItem('user')).role;
        console.log(role)
    }

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <Link to={{pathname: '/'}} className="hover:no-underline hover:text-white hover:bg-primary btn btn-ghost normal-case text-xl text-white">
                    SITME
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 text-white">
                    <li>
                        <Link to={{pathname: '/'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={{pathname: '/account/login'}} onClick={userActions.logout} className="hover:no-underline hover:text-white hover:bg-primary">
                            Logout
                        </Link>
                    </li>
                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/solicitudes'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            suscripciones
                        </Link>
                    </li>}
                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/reclamos'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            reclamos
                        </Link>
                    </li>}
                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/reservas'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            reservas
                        </Link>
                    </li>}
                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/localesC'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            local
                        </Link>
                    </li>}
                    {(role !== null && role === 1) && <li>
                        <Link to={{pathname: '/locales'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            local
                        </Link>
                    </li>}
                    {(role !== null && role === 0) && <li>
                        <Link to={{pathname: '/Users'}} className="hover:no-underline hover:text-white hover:bg-primary">
                            Users
                        </Link>
                    </li>}
                </ul>
            </div>
        </div>
    );
}
