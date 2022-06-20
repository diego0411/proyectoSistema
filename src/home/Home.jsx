import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { Home };

function Home() {
    const auth = useRecoilValue(authAtom);

    return (
        <div className="p-4">
            <div className="container">
                <h1>HOLA {auth?.firstName}!</h1>
                <p>BIENVENIDO a SITME</p>
                <p>DISFRUTA DE LA SIMPLICIDAD Y LA FACILIDAD Y REALIZA TU RESERVA</p>
                <p>¡¡AHORA MISMO!!</p>
            </div>
        </div>
    );
}
