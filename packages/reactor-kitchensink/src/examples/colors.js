const cardDefaults = {
    fontSize: '16px',
    padding: '10px'
};

export default {
    card: {
        blue: {
            ...cardDefaults,
            backgroundColor: '#03A9F4', 
            color: 'black'
        },
        green: {
            ...cardDefaults,
            backgroundColor: '#A5D6A7', 
            color: 'black'
        },
        red: {
            ...cardDefaults,
            backgroundColor: '#009688', 
            color: 'white'
        }
    }
};