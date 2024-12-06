export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const SAVE_LIST = 'SAVE_LIST';
export const FETCH_LISTS = 'FETCH_LISTS';
export const UPDATE_LIST = 'UPDATE_LIST';
export const SHARE_ITEM = 'SHARE_ITEM';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteList = (id) => ({
  type: DELETE_LIST,
  payload: id,
});

export const deleteItem = (index) => ({
    type: DELETE_ITEM,
    payload: index,
  });

export const saveList = (list) => ({
  type: SAVE_LIST,
  payload: list,
});

export const fetchLists = (lists) => ({
  type: FETCH_LISTS,
  payload: lists,
});

export const updateList = (id, updatedData) => ({
  type: UPDATE_LIST,
  payload: { id, updatedData },
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setSuccess = (success) => ({
  type: SET_SUCCESS,
  payload: success,
});