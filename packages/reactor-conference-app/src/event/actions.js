export const LOAD_EVENT = 'EVENT::LOAD_EVENT';
export const UNLOAD_EVENT = 'EVENT::UNLOAD_EVENT';

import { setTitle } from '../actions';
import loadSchedule from '../schedule/actions';

export function loadEvent(id) {
    return (dispatch, getState) => {
        const store = getState().schedule.store;

        const doLoadEvent = () => {
            const event = store.getById(id).data;
            dispatch({ type: LOAD_EVENT, event });
            dispatch(setTitle(event.title, '/'));
        };

        if(store.isLoaded()) {
            doLoadEvent();
        } else {
            store.on('load', doLoadEvent, null, {single: true});
            // If store hasn't been loaded yet, load it.
            if(!store.isLoading()) {
                dispatch(loadSchedule);
            }
        }
    }
}

export function unloadEvent() {
    return { type: UNLOAD_EVENT };
}