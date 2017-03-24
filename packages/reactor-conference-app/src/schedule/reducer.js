import { TOGGLE_SEARCH } from './actions';

const initialState = {
    showSearch: false
}

export default function scheduleReducer(state = initialState, action) {

    switch(action.type) {
        case TOGGLE_SEARCH:
            if (action.hasOwnProperty('show')) {
                return { ...state, showSearch: !state.showSearch }
            } else {
                return { ...state, showSearch: !state.showSearch }
            }
        default:
            return { ...state };
    }

}