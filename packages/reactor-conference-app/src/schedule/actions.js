export const TOGGLE_SEARCH = 'SCHEDULE::TOGGLE_SEARCH';

export function toggleSearch(show) {
    return { type: TOGGLE_SEARCH, show };
}