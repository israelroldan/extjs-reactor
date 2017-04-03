export const TOGGLE_FAVORITE = 'SPEAKERS::TOGGLE_FAVORITE';
export const LOAD_SPEAKERS = 'SPEAKERS::LOAD';
export const TOGGLE_FILTER_FAVORITES = 'SPEAKERS::TOGGLE_FILTER_FAVORITES';

export function loadSpeakers() {
    return {
        type: LOAD_SPEAKERS
    }
}
