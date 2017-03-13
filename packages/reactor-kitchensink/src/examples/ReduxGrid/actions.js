export const FILTER_CHANGE = 'FILTER_CHANGE';

export function filterChange(searchStr) {
    return {
        type: FILTER_CHANGE,
        searchStr
    };
}