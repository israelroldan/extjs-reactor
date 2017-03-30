import { 
    TOGGLE_FAVORITE, 
    LOAD_SPEAKERS, 
    TOGGLE_FILTER_FAVORITES 
} from './actions';

let favorites = localStorage.getItem('favoriteSpeakers');
favorites = favorites ? JSON.parse(favorites) : []

const initialState = {
    favorites,
    store: Ext.create('Ext.data.Store', {
        proxy: {
            type: 'ajax',
            url: '/resources/speakers.json'
        },
        listeners: {
            load: store => store.each(record => record.set('favorite', favorites.indexOf(record.get('name')) !== -1))
        }
    })
};

export default function speakersReducer(state = initialState, action) {
    
    switch (action.type) {
        case LOAD_SPEAKERS: {
            state.store.load()
            return { ...state };
        }
        case TOGGLE_FAVORITE: {
            const { speaker } = action;
            const record = state.store.findRecord('name', speaker);
            let favorites;

            if (state.favorites.indexOf(speaker) === -1) {
                record.set('favorite', true);
                favorites = [...state.favorites, speaker]
            } else {
                record.set('favorite', false);
                favorites = state.favorites.filter(s => s !== speaker);
            }

            localStorage.setItem('favoriteSpeakers', JSON.stringify(favorites));

            return { ...state, favorites }
        }
        case TOGGLE_FILTER_FAVORITES: {
            let { filter } = action;

            if (filter === undefined) filter = !state.filtered

            if (filter) {
                state.store.filter('favorite', true);
            } else {
                state.store.clearFilter()
            }

            return { ...state, filtered: filter };
        }
        default:
            return { ...state };
    }
    
}