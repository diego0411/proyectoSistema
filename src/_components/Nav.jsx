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
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <Link to={{pathname: '/'}} className="hover:no-underline hover:text-white hover:bg-primary btn btn-ghost normal-case text-xl text-white">
                    SITME
                </Link>
            </div>
            <div className="flex-none">
                <ul className="navbar-nav">
                    <li>
                        <Link to={{pathname: '/'}} className="nav-item nav-link">
                            home
                        </Link>
                    </li>

                    <li>
                        <Link to={{pathname: '/account/login'}} onClick={userActions.logout} className="nav-item nav-link">
                             Logout
                        </Link>
                    </li>

                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/solicitudes'}} className="nav-item nav-link">
                            suscripciones
                        </Link>
                    </li>}

                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/reclamos'}} className="nav-item nav-link">
                            reclamos
                        </Link>
                    </li>}

                    {(role !== null && role == 2) && <li>
                        <Link to={{pathname: '/localesC'}} className="nav-item nav-link">
                            local disponibles
                        </Link>
                    </li>}

                    {(role !== null && role == 2 || role===1) && <li>
                        <Link to={{pathname: '/reservas'}} className="nav-item nav-link">
                            reservas
                        </Link>
                    </li>}

                    {(role !== null && role === 1 || role === 0 ) && <li>
                        <Link to={{pathname: '/locales'}} className="nav-item nav-link">
                            mis locales
                        </Link>
                    </li>}

                    {(role !== null && role === 0) && <li>
                        <Link to={{pathname: '/Users'}} className="nav-item nav-link">
                            Users
                        </Link>
                    </li>}
                </ul>
            </div>
        </div>
        </nav>
    );
}
