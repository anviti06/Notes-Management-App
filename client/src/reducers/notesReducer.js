import { ADD_NEW_NOTE, FETCH_NOTE_LIST, DELETE_NOTE } from '../actions/types';

export default function (state = [], action) {
    console.log('payload:', action.payload)
    switch (action.type) {
        case ADD_NEW_NOTE:
            const note = action.payload;
            return [...state, note];
        case FETCH_NOTE_LIST:
            return action.payload;
        case DELETE_NOTE:
            const arr = state.filter(note => {
                if (note.title == action.payload)
                    return 0
                else
                    return 1
            })
            return arr;
        default:
            return state;
    }
}
