import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

import { history, useFetchWrapper } from '_helpers';
import { authAtom, usersAtom, userAtom, localesAtom, localAtom, eventoAtom, eventosAtom,
         menusAtom, menuAtom, itemsAtom, itemAtom, reservaAtom, reservasAtom, mesasAtom, mesaAtom,
         invitadosAtom, invitadoAtom, solicitudAtom, solicitudesAtom, reclamoAtom, reclamosAtom, planesAtom, planAtom } from '_state';

export { useUserActions };

function useUserActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const localesUrl = `${process.env.REACT_APP_API_URL}/Locales`; //anadido
    const localesIdUrl = `${process.env.REACT_APP_API_URL}/Locales/getByUser`; //anadido
    const eventosUrl = `${process.env.REACT_APP_API_URL}/Eventos`; //anadido
    const menusUrl = `${process.env.REACT_APP_API_URL}/Menus`; //anadido
    const itemsUrl = `${process.env.REACT_APP_API_URL}/Items`; //anadido
    const mesasUrl = `${process.env.REACT_APP_API_URL}/Mesas`; //anadido
    const invitadosUrl = `${process.env.REACT_APP_API_URL}/Invitados`; //anadido
    const reservasUrl = `${process.env.REACT_APP_API_URL}/Reservas`; //anadido
    const solicitudesUrl = `${process.env.REACT_APP_API_URL}/Suscription`; //anadido
    const reclamosUrl = `${process.env.REACT_APP_API_URL}/Reclamos`; //anadido
    const planesUrl = `${process.env.REACT_APP_API_URL}/Plans`; //anadido
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);
    //anadido
    const setLocales = useSetRecoilState(localesAtom);
    const setLocal = useSetRecoilState(localAtom);
    //anadido
    const setEventos = useSetRecoilState(eventosAtom);
    const setEvento = useSetRecoilState(eventoAtom);
    //anadido
    const setMenus = useSetRecoilState(menusAtom);
    const setMenu = useSetRecoilState(menuAtom);
    //anadido
    const setItems = useSetRecoilState(itemsAtom);
    const setItem = useSetRecoilState(itemAtom);
    //anadido
    const setMesas = useSetRecoilState(mesasAtom);
    const setMesa = useSetRecoilState(mesaAtom);
    //anadido
    const setInvitados = useSetRecoilState(invitadosAtom);
    const setInvitado = useSetRecoilState(invitadoAtom);
    //anadido
    const setReservas = useSetRecoilState(reservasAtom);
    const setReserva = useSetRecoilState(reservaAtom);
    //anadido
    const setSolicitudes = useSetRecoilState(solicitudesAtom);
    const setSolicitud = useSetRecoilState(solicitudAtom);
    //anadido
    const setReclamos = useSetRecoilState(reclamosAtom);
    const setReclamo = useSetRecoilState(reclamoAtom);
    //anadido
    const setPlanes = useSetRecoilState(planesAtom);
    const setPlan = useSetRecoilState(planAtom);


    return {
        saveData,
        saveDataEventos,
        saveDataItem,
        saveDataReserva,
        saveDataPlan,
        getData,
        login,
        logout,
        register,
        registerLocal, //anadido
        registerEvento, //anadido
        registerMenu, //anadido
        registerItem, //anadido
        registerMesa, //anadido
        registerInvitado, //anadido
        registerReserva, //anadido
        registerSolicitud, //anadido
        registerReclamo, //anadido
        registerPlan, //anadido
        getAll,
        getLocal, //anadido
        getLocalId, //anadido especial locales segun el usuario
        getEvento, //anadido
        getMenu, //anadido
        getItem, //anadido
        getMesa, //anadido
        getInvitado, //anadido
        getReserva, //anadido
        getSolicitud, //anadido
        getReclamo, //anadido
        getPlan, //anadido
        getById,
        getByLocal, //anadido
        getByEvento, //anadido
        getByMenu, //anadido
        getByItem, //anadido
        getByMesa, //anadido
        getByInvitado, //anadido
        getByReserva, //anadido
        getBySolicitud, //anadido
        getByReclamo, //anadido
        getByPlan, //anadido
        update,
        updateLocal, //anadido
        updateEvento, //anadido
        updateMenu, //anadido
        updateItem, //anadido
        updateMesa, //anadido
        updateInvitado, //anadido
        updateReserva, //anadido
        updateSolicitud, //anadido
        updateReclamo, //anadido
        updatePlan, //anadido
        delete: _delete,
        deleteLocal: _deleteLocal,  //anadido
        deleteEvento: _deleteEvento,  //anadido
        deleteMenu: _deleteMenu,  //anadido
        deleteItem: _deleteItem,  //anadido
        deleteMesa: _deleteMesa,  //anadido
        deleteInvitado: _deleteInvitado,  //anadido
        deleteReserva: _deleteReserva,  //anadido
        deleteSolicitud: _deleteSolicitud,  //anadido
        deleteReclamo: _deleteReclamo,  //anadido
        deletePlan: _deletePlan,  //anadido
        resetUsers: useResetRecoilState(usersAtom),
        resetUser: useResetRecoilState(userAtom),
        //anadido
        resetLocales: useResetRecoilState(localesAtom),
        resetLocal: useResetRecoilState(localAtom),
        //anadido
        resetEventos: useResetRecoilState(eventosAtom),
        resetEvento: useResetRecoilState(eventoAtom),
        //anadido
        resetMenus: useResetRecoilState(menusAtom),
        resetMenu: useResetRecoilState(menuAtom),
        //anadido
        resetItems: useResetRecoilState(itemsAtom),
        resetItem: useResetRecoilState(itemAtom),
        //anadido
        resetMesas: useResetRecoilState(mesasAtom),
        resetMesa: useResetRecoilState(mesaAtom),
        //anadido
        resetInvitados: useResetRecoilState(invitadosAtom),
        resetInvitado: useResetRecoilState(invitadoAtom),
        //anadido
        resetReservas: useResetRecoilState(reservasAtom),
        resetRserva: useResetRecoilState(reservaAtom),
        //anadido
        resetSolicitudes: useResetRecoilState(solicitudesAtom),
        resetSolicitud: useResetRecoilState(solicitudAtom),
        //anadido
        resetReclamos: useResetRecoilState(reclamosAtom),
        resetReclamo: useResetRecoilState(reclamoAtom),
        //anadido
        resetPlanes: useResetRecoilState(planesAtom),
        resetPlan: useResetRecoilState(planAtom)
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
    //anadiodo
    function registerLocal(local) {
        return fetchWrapper.post(`${localesUrl}/registrar`, local);
    }

    //anadiodo
    function registerEvento(evento) {
        return fetchWrapper.post(`${eventosUrl}/registrar`, evento);
    }
    //anadiodo
    function registerMenu(menu) {
        return fetchWrapper.post(`${menusUrl}/registrar`, menu);
    }
    //anadiodo
    function registerItem(item) {
        return fetchWrapper.post(`${itemsUrl}/registrar`, item);
    }
    //anadiodo
    function registerMesa(mesa) {
        return fetchWrapper.post(`${mesasUrl}/registrar`, mesa);
    }
    //anadiodo
    function registerInvitado(invitado) {
        return fetchWrapper.post(`${invitadosUrl}/registrar`, invitado);
    }
    //anadiodo
    function registerReserva(reserva) {
        return fetchWrapper.post(`${reservasUrl}/registrar`, reserva);
    }
    //anadiodo
    function registerSolicitud(solicitud) {
        return fetchWrapper.post(`${solicitudesUrl}/registrar`, solicitud);
    }
    //anadiodo
    function registerReclamo(reclamos) {
        return fetchWrapper.post(`${reclamosUrl}/registrar`, reclamos);
    }
    //anadiodo
    function registerPlan(planes) {
        return fetchWrapper.post(`${planesUrl}/registrar`, planes);
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setUsers);
    }

    //anadido
    function getLocal() {
        return fetchWrapper.get(localesUrl).then(setLocales);
    }
    //anadido
    function getLocalId(id) {
        return fetchWrapper.get(`${localesIdUrl}/${id}`).then(setLocales);
    }

    //anadido
    function getEvento() {
        return fetchWrapper.get(eventosUrl).then(setEventos);
    }
    //anadido
    function getMenu() {
        return fetchWrapper.get(menusUrl).then(setMenus);
    }
    //anadido
    function getItem() {
        return fetchWrapper.get(itemsUrl).then(setItems);
    }
    //anadido
    function getMesa() {
        return fetchWrapper.get(mesasUrl).then(setMesas);
    }
    //anadido
    function getInvitado() {
        return fetchWrapper.get(invitadosUrl).then(setInvitados);
    }
    //anadido
    function getReserva() {
        return fetchWrapper.get(reservasUrl).then(setReservas);
    }
    //anadido
    function getSolicitud() {
        return fetchWrapper.get(solicitudesUrl).then(setSolicitudes);
    }
    //anadido
    function getReclamo() {
        return fetchWrapper.get(reclamosUrl).then(setReclamos);
    }
    //anadido
    function getPlan() {
        return fetchWrapper.get(planesUrl).then(setPlanes);
    }

    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
    }
    //anadido
    function getByLocal(id) {
        return fetchWrapper.get(`${localesUrl}/${id}`).then(setLocal);
    }
    //anadido
    function getByEvento(id) {
        return fetchWrapper.get(`${eventosUrl}/${id}`).then(setEvento);
    }
    //anadido
    function getByMenu(id) {
        return fetchWrapper.get(`${menusUrl}/${id}`).then(setMenu);
    }
    //anadido
    function getByItem(id) {
        return fetchWrapper.get(`${itemsUrl}/${id}`).then(setItem);
    }
    //anadido
    function getByMesa(id) {
        return fetchWrapper.get(`${mesasUrl}/${id}`).then(setMesa);
    }
    //anadido
    function getByInvitado(id) {
        return fetchWrapper.get(`${invitadosUrl}/${id}`).then(setInvitado);
    }

    //anadido
    function getByReserva(id) {
        return fetchWrapper.get(`${reservasUrl}/${id}`).then(setReserva);
    }
    //anadido
    function getBySolicitud(id) {
        return fetchWrapper.get(`${solicitudesUrl}/${id}`).then(setSolicitud);
    }
    //anadido
    function getByReclamo(id) {
        return fetchWrapper.get(`${reclamosUrl}/${id}`).then(setReclamo);
    }
    //anadido
    function getByPlan(id) {
        return fetchWrapper.get(`${planesUrl}/${id}`).then(setPlan);
    }

    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
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

    //anadido
    function updateLocal(id, params) {
        return fetchWrapper.put(`${localesUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const local = { ...auth, ...params };
                    localStorage.setItem('local', JSON.stringify(local));

                    // update auth user in recoil state
                    setAuth(local);
                }
                return x;
            });
    }

    //anadido
    function updateEvento(id, params) {
        return fetchWrapper.put(`${eventosUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const evento = { ...auth, ...params };
                    localStorage.setItem('evento', JSON.stringify(evento));

                    // update auth user in recoil state
                    setAuth(evento);
                }
                return x;
            });
    }


    //anadido
    function updateMenu(id, params) {
        return fetchWrapper.put(`${menusUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const menu = { ...auth, ...params };
                    localStorage.setItem('menu', JSON.stringify(menu));

                    // update auth user in recoil state
                    setAuth(menu);
                }
                return x;
            });
    }
    //anadido
    function updateItem(id, params) {
        return fetchWrapper.put(`${itemsUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const item = { ...auth, ...params };
                    localStorage.setItem('item', JSON.stringify(item));

                    // update auth user in recoil state
                    setAuth(item);
                }
                return x;
            });
    }
    //anadido
    function updateMesa(id, params) {
        return fetchWrapper.put(`${mesasUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const mesa = { ...auth, ...params };
                    localStorage.setItem('mesa', JSON.stringify(mesa));

                    // update auth user in recoil state
                    setAuth(mesa);
                }
                return x;
            });
    }
    //anadido
    function updateInvitado(id, params) {
        return fetchWrapper.put(`${invitadosUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const invitado = { ...auth, ...params };
                    localStorage.setItem('invitado', JSON.stringify(invitado));

                    // update auth user in recoil state
                    setAuth(invitado);
                }
                return x;
            });
    }

    //anadido
    function updateReserva(id, params) {
        return fetchWrapper.put(`${reservasUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const reserva = { ...auth, ...params };
                    localStorage.setItem('reserva', JSON.stringify(reserva));

                    // update auth user in recoil state
                    setAuth(reserva);
                }
                return x;
            });
    }
    //anadido
    function updateSolicitud(id, params) {
        return fetchWrapper.put(`${solicitudesUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const solicitud = { ...auth, ...params };
                    localStorage.setItem('solicitud', JSON.stringify(solicitud));

                    // update auth user in recoil state
                    setAuth(solicitud);
                }
                return x;
            });
    }
    //anadido
    function updateReclamo(id, params) {
        return fetchWrapper.put(`${reclamosUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const reclamo = { ...auth, ...params };
                    localStorage.setItem('reclamo', JSON.stringify(reclamo));

                    // update auth user in recoil state
                    setAuth(reclamo);
                }
                return x;
            });
    }
    //anadido
    function updatePlan(id, params) {
        return fetchWrapper.put(`${planesUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id) {
                    // update local storage
                    const plan = { ...auth, ...params };
                    localStorage.setItem('plan', JSON.stringify(plan));

                    // update auth user in recoil state
                    setAuth(plan);
                }
                return x;
            });
    }
    function saveData(idl){
        localStorage.setItem('idl',idl);
    }
    function saveDataEventos(ide){
        localStorage.setItem('ide',ide);
    }
    function saveDataItem(idm){
        localStorage.setItem('idm',idm);
    }
    function saveDataReserva(idr){
        localStorage.setItem('idr',idr);
    }
    function saveDataPlan(idp){
        localStorage.setItem('idp',idp);
    }
    function getData(id){
        return  localStorage.getItem(id);

    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id) {
        setUsers(users => users.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setUsers(users => users.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }

    //anadido
    function _deleteLocal(id) {
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

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }

    //anadido
    function _deleteEvento(id) {
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

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteMenu(id) {
        setMenus(menus => menus.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${menusUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setMenus(menus => menus.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteItem(id) {
        setItems(items => items.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${itemsUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setItems(items => items.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteMesa(id) {
        setMesas(mesas => mesas.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${mesasUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setMesas(mesas => mesas.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteInvitado(id) {
        setInvitados(invitados => invitados.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${invitadosUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setInvitados(invitados => invitados.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }

    //anadido
    function _deleteReserva(id) {
        setReservas(reservas => reservas.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${reservasUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setReservas(reservas => reservas.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteSolicitud(id) {
        setSolicitudes(solicitudes => solicitudes.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${solicitudesUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setSolicitudes(solicitudes => solicitudes.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deleteReclamo(id) {
        setReclamos(reclamos => reclamos.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${reclamosUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setReclamos(reclamos => reclamos.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }
    //anadido
    function _deletePlan(id) {
        setPlanes(planes => planes.map(x => {
            // add isDeleting prop to user being deleted
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${planesUrl}/${id}`)
            .then(() => {
                // remove user from list after deleting
                setPlanes(planes => planes.filter(x => x.id !== id));

                // auto logout if the logged in user deleted their own record
                if (id === auth?.id) {
                    logout();
                }
            });
    }

}
