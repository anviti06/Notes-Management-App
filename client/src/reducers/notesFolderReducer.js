import { ADD_NEW_FOLDER, FETCH_FOLDER_LIST } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case ADD_NEW_FOLDER:
            const folder = action.payload;
            return [...state, folder];
        case FETCH_FOLDER_LIST:
            return action.payload;
        default:
            return state;
    }
}
