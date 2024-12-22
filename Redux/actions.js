

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const SAVE_LIST = 'SAVE_LIST';
export const FETCH_LISTS = 'FETCH_LISTS';
export const UPDATE_LIST = 'UPDATE_LIST';
export const SHARE_ITEM = 'SHARE_ITEM';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const SET_USER = 'SET_USER';

// USER
export const setLoggedInUser = (userId)=> ({
  type: SET_USER,
  payload: userId,
})

// FILTER
export const setActiveFilter = (filter) => ({
  type: SET_ACTIVE_FILTER,
  payload: filter,
});

// ADD ITEM
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

// DELETE LIST
export const deleteList = (id) => ({
  type: DELETE_LIST,
  payload: id,
});

// DELETE ITEM
export const deleteItem = (index) => ({
    type: DELETE_ITEM,
    payload: index,
  });

  // SAVE LIST
export const saveList = (list) => ({
  type: SAVE_LIST,
  payload: list,
});

// FETCH LIST
export const fetchLists = (lists) => ({
  type: FETCH_LISTS,
  payload: lists,
});

// UPDATE LIST
export const updateList = (id, updatedData) => ({
  type: UPDATE_LIST,
  payload: { id, updatedData },
});

// ERROR
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// SUCCESS
export const setSuccess = (success) => ({
  type: SET_SUCCESS,
  payload: success,
});

 
