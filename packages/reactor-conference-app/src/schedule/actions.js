export const TOGGLE_SEARCH = 'SCHEDULE::TOGGLE_SEARCH';
export const TOGGLE_FAVORITE = 'SCHEDULE::TOGGLE_FAVORITE';
export const LOAD_EVENT = 'SCHEDULE::LOAD_EVENT';
export const UNLOAD_EVENT = 'SCHEDULE::UNLOAD_EVENT';

import { setTitle } from '../actions';

export function toggleSearch(show) {
    return { type: TOGGLE_SEARCH, show };
}

export function toggleFavorite(event) {
    return { type: TOGGLE_FAVORITE, event }
}

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