import { 
    LOAD_SPEAKERS,
    LOAD_SPEAKER,
    UNLOAD_SPEAKER
} from './actions';

const initialState = {
    store: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/resources/speakers.json'
        }
    }),
};

export default function speakersReducer(state = initialState, action) {
    
    switch (action.type) {
        case LOAD_SPEAKERS: {
            state.store.load()
            return { ...state };
        }
        case LOAD_SPEAKER: {
            return { ...state, speaker: action.speaker, showSpeaker: true }
        }
        case UNLOAD_SPEAKER: {
            return { ...state, showSpeaker: false }
        }
        default:
            return { ...state };
    }
    
}