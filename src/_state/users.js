import { atom } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null
});

const userAtom = atom({
    key: 'user',
    default: null
});

const localesAtom = atom({
    key: 'locales',
    default: null
});

const localAtom = atom({
    key: 'local',
    default: null
});

const eventosAtom = atom({
    key: 'eventos',
    default: null
});

const eventoAtom = atom({
    key: 'evento',
    default: null
});

const menusAtom = atom({
    key: 'menus',
    default: null
});

const menuAtom = atom({
    key: 'menu',
    default: null
});

const itemsAtom = atom({
    key: 'items',
    default: null
});

const itemAtom = atom({
    key: 'item',
    default: null
});
const mesasAtom = atom({
    key: 'mesas',
    default: null
});

const mesaAtom = atom({
    key: 'mesa',
    default: null
});
const invitadosAtom = atom({
    key: 'invitados',
    default: null
});

const invitadoAtom = atom({
    key: 'invitado',
    default: null
});

const reservasAtom = atom({
    key: 'reservas',
    default: null
});

const reservaAtom = atom({
    key: 'reserva',
    default: null
});

const solicitudesAtom = atom({
    key: 'solicitudes',
    default: null
});

const solicitudAtom = atom({
    key: 'solicitud',
    default: null
});
const reclamosAtom = atom({
    key: 'reclamos',
    default: null
});

const reclamoAtom = atom({
    key: 'reclamo',
    default: null
});
const planesAtom = atom({
    key: 'planes',
    default: null
});

const planAtom = atom({
    key: 'plan',
    default: null
});

export { 
    usersAtom,
    userAtom,
    localesAtom,
    localAtom,
    eventosAtom,
    eventoAtom,
    menusAtom,
    menuAtom,
    itemsAtom,
    itemAtom,
    mesasAtom,
    mesaAtom,
    invitadosAtom,
    invitadoAtom,
    reservaAtom,
    reservasAtom,
    solicitudAtom,
    solicitudesAtom,
    reclamoAtom,
    reclamosAtom,
    planAtom,
    planesAtom
};