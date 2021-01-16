import axios from 'axios';
import {
  FETCH_USER,
  FETCH_BLOGS,
  FETCH_BLOG,
  ADD_NEW_FOLDER,
  FETCH_FOLDER_LIST,
  ADD_NEW_NOTE,
  FETCH_NOTE_LIST,
  DELETE_NOTE
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (form_values, history, folder_name, username) => async dispatch => {
  const res = await axios.post('/api/add_notes', { form_values, folder_name, username });
  history.push('/notes/' + folder_name);
  dispatch({ type: ADD_NEW_NOTE, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const addFolder = (folder_name, history) => async dispatch => {
  const res = await axios.post('/api/add_folder', { folder_name });
  history.push('/folder_list');
  dispatch({ type: ADD_NEW_FOLDER, payload: res.data });
}

export const fetchFolderList = () => async dispatch => {
  const res = await axios.get('/api/fetch_folder_list');
  console.log('list of folders:', res);
  dispatch({ type: FETCH_FOLDER_LIST, payload: res.data });
}

export const fetchNotes = (folder_name) => async dispatch => {
  const res = await axios.get('/api/fetch_notes', {
    params: {
      folder_name
    }
  });
  console.log('response:', res)
  dispatch({ type: FETCH_NOTE_LIST, payload: res.data })
}

export const delete_folder = (folder_name) => async dispatch => {
  const res = await axios.post('/api/delete_folder', { folder_name });
  dispatch({ type: FETCH_FOLDER_LIST, payload: res.data });
}

export const delete_note = (folder_name, note_title) => async dispatch => {
  await axios.post('/api/delete_note', { folder_name, note_title });
  dispatch({ type: DELETE_NOTE, payload: note_title });

}

export const share_note = (emails, note) => async dispatch => {
  const res = await axios.post('/api/share_note', { emails, note });
  console.log("wrong email id's:", res.data);
  let str = "";
  for (let i = 0; i < res.data.length; i++) {
    str = str + res.data[i] + ',';
  }
  alert("Wrong Email ID's: " + str);
}
