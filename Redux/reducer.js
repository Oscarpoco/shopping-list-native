import { ADD_ITEM, DELETE_ITEM, SAVE_LIST, SET_ERROR, SET_SUCCESS } from './actions';

const initialState = {
  shoppingList: [],
  items: [],
  error: null,
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };

    case SAVE_LIST:
        return {
            ...state,
            shoppingList: [
              ...state.shoppingList,
              {
                listTitle: action.payload.listTitle,
                listTag: action.payload.listTag,
                timestamp: Date.now().toString(),
                items: state.items,   
                description: action.payload.description,
              }
            ],
            items: [],  
          };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
