import {
    LOAD_EVENT,
} from './actions';

export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EVENT: {
            return { ...state, data: action.event, showEvent: true }
        }
        default: 
            return { ...state };
    }
}