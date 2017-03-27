export const TOGGLE_SEARCH = 'SCHEDULE::TOGGLE_SEARCH';
export const TOGGLE_FAVORITE = 'SCHEDULE::TOGGLE_FAVORITE';

export function toggleSearch(show) {
    return { type: TOGGLE_SEARCH, show };
}

export function toggleFavorite(event) {
    return { type: TOGGLE_FAVORITE, event }
}
