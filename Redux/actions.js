export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SAVE_LIST = 'SAVE_LIST';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  payload: index,
});

export const saveList = (list) => ({
  type: SAVE_LIST,
  payload: list,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setSuccess = (success) => ({
  type: SET_SUCCESS,
  payload: success,
});
