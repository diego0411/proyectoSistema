import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { history, useFetchWrapper } from '_helpers';
import {authAtom, usersAtom, userAtom, localesAtom, eventosAtom} from '_state';

export { useUserActions };

function useUserActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const localesUrl = `${process.env.REACT_APP_API_URL}/locales`;
    const eventosUrl = `${process.env.REACT_APP_API_URL}/eventos`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);
    const setLocales = useSetRecoilState(localesAtom);
    const setEventos = useSetRecoilState(eventosAtom);

    return {
        login,
        logout,
        register,
        registerLocal,
        registerEvento,
        updateLocal,
        updateEvento,
        getAll,
        getAllLocales,
        getAllEventos,
        getById,
        getByIdLocales,
        getByIdEventos,
        update,
        deleteUser,
        deleteLocales,
        deleteEventos,
        resetUsers: useResetRecoilState(usersAtom),
        resetUser: useResetRecoilState(userAtom),
        resetLocales: useResetRecoilState(localesAtom),
        resetEventos: useResetRecoilState(eventosAtom)
    }

    function login({ username, password }) {
        return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.push(from);
            });
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/account/login');
    }

    function register(user) {
        return fetchWrapper.post(`${baseUrl}/register`, user);
    }

    function registerLocal(locales) {
        return fetchWrapper.post(`${localesUrl}/registrar`, locales);
    }

    function registerEvento(eventos) {
        return fetchWrapper.post(`${localesUrl}/registrar`, eventos);
    }

    // GETTERS
    function getAll() {
        return fetchWrapper.get(baseUrl).then(setUsers);
    }

    function getAllLocales() {
        return fetchWrapper.get(localesUrl).then(setLocales);
    }

    function getAllEventos() {
        return fetchWrapper.get(eventosUrl).then(setEventos);
    }

    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
    }

    function getByIdLocales(id) {
        return fetchWrapper.get(`${localesUrl}/${id}`).then(setLocales);
    }

    function getByIdEventos(id) {
        return fetchWrapper.get(`${eventosUrl}/${id}`).then(setEventos);
    }

    function update(id, params) {
        return fetchWrapper.put(`${localesUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const user = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // update auth user in recoil state
                    setAuth(user);
                }
                return x;
            });
    }

    function updateLocal(id, params) {
        return fetchWrapper.put(`${localesUrl}/${id}`, params)
            .then(x => {
                return x;
            });
    }

    function updateEvento(id, params) {
        return fetchWrapper.put(`${eventosUrl}/${id}`, params)
            .then(x => {
                return x;
            });
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function deleteUser(id) {
        setUsers(users => users.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${localesUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setUsers(users => users.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }

    function deleteLocales(id) {
        setLocales(locales => locales.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${localesUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setLocales(locales => locales.filter(x => x.id !== id));
            });
    }

    function deleteEventos(id) {
        setEventos(eventos => eventos.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${eventosUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setEventos(eventos => eventos.filter(x => x.id !== id));
            });
    }
}
