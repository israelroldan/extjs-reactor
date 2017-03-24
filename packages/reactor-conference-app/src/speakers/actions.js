export const TOGGLE_FAVORITE = 'SPEAKERS::TOGGLE_FAVORITE';
export const LOAD_SPEAKERS = 'SPEAKERS::LOAD';
export const TOGGLE_FILTER_FAVORITES = 'SPEAKERS::TOGGLE_FILTER_FAVORITES';

export function toggleFavorite(speaker) {
    return {
        type: TOGGLE_FAVORITE,
        speaker
    }
}

export function loadSpeakers() {
    return {
        type: LOAD_SPEAKERS
    }
}

export function toggleFilterFavorites() {
    return {
        type: TOGGLE_FILTER_FAVORITES
    }
}
