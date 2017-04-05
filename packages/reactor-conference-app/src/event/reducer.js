import {
    LOAD_EVENT,
    UNLOAD_EVENT
} from './actions';

export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EVENT: {
            return { ...state, data: action.event, showEvent: true }
        }
        case UNLOAD_EVENT: {
            return { ...state, showEvent: false }
        }
        default: 
            return { ...state };
    }
}