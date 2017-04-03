import { LOAD } from './actions';

const initialState = {
    event: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOAD: {
            return { ...state, event: action.event }
        }
        default:
            return { ...state };
    }
}