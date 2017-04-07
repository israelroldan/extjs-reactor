export const LOAD_SPEAKERS = 'SPEAKERS::LOAD';
export const LOAD_SPEAKER = 'SPEAKERS::LOAD_SPEAKER';
export const UNLOAD_SPEAKER = 'SPEAKERS::UNLOAD_SPEAKER';

import { setTitle } from '../actions';

export function loadSpeakers() {
    return {
        type: LOAD_SPEAKERS
    }
}

export function loadSpeaker(id) {
    return (dispatch, getState) => {
        const store = getState().speakers.store;

        const doLoadSpeaker = () => {
            const speaker = store.getById(id).data;
            dispatch({ type: LOAD_SPEAKER, speaker });
            dispatch(setTitle(speaker.name, '/speakers'));
        };

        if(store.isLoaded()) {
            doLoadSpeaker();
        } else {
            store.on('load', doLoadSpeaker, null, {single: true});
            // If store hasn't been loaded yet, load it.
            if(!store.isLoading()) {
                dispatch(loadSpeakers());
            }
        }
    }
}

export function unloadSpeaker() {
    return { type: UNLOAD_SPEAKER };
}