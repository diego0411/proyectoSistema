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

export { 
    usersAtom,
    userAtom,
    localesAtom,
    localAtom,
    eventosAtom,
    eventoAtom
};