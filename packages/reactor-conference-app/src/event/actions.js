export const LOAD_EVENT = 'EVENT::LOAD_EVENT';
export const UNLOAD_EVENT = 'EVENT::UNLOAD_EVENT';

import { setTitle } from '../actions';

export function loadEvent(id) {
    return (dispatch, getState) => {
        const store = getState().schedule.store;

        const doLoadEvent = () => {
            const event = store.getById(id).data;
            dispatch({ type: LOAD_EVENT, event });
            dispatch(setTitle(event.name, '/'));
        };

        if (store.loading) {
            store.on('load', doLoadEvent);
        } else {
            doLoadEvent()
        }
    }
}

export function unloadEvent() {
    return { type: UNLOAD_EVENT };
}