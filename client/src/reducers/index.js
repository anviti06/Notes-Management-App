import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import notesFolderReducer from './notesFolderReducer';
import notesReducer from './notesReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  folders: notesFolderReducer,
  notes: notesReducer
});
