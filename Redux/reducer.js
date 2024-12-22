import 
{ 
  ADD_ITEM, 
  DELETE_ITEM, 
  SET_ERROR, 
  SET_SUCCESS, 
  FETCH_LISTS, 
  DELETE_LIST, 
  UPDATE_LIST, 
  SAVE_LIST, 
  SET_ACTIVE_FILTER,
  SET_USER 
} from './actions';

const initialState = {
  lists: [],
  shoppingList: [],
  items: [],
  error: null,
  success: null,
  activeFilter: 'All Lists',
  userId: null,
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {

    // USER
    case SET_USER:
      return{
        ...state,
        userId: action.payload,
      }
      // ENDS

    // ADD ITEM
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    //   ENDS

    //   DELETE ITEM
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    //   ENDS

    //   SAVE LIST
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
                priority: action.payload.priority,
                budget: action.payload.budget,
                status: action.payload.status,
              }
            ],
            items: [],  
          };
        //   ENDS

        //   FETCH LISTS
    case FETCH_LISTS:
        case FETCH_LISTS:
            return {
              ...state,
              lists: action.payload,
            };
    //   ENDS

    //   UPDATE LIST
    case UPDATE_LIST:
      return {
        ...state,
        shoppingList: state.shoppingList.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updatedData } : item
        ),
      };
    //   ENDS

    //   DELETE LIST
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((item) => item.id !== action.payload),
      };
    //   ENDS

    //   ERROR
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //   ENDS

    //   SUCCESS
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    //   ENDS

    // STATUS
    case SET_ACTIVE_FILTER:
      return { ...state, activeFilter: action.payload };

    default:
      return state;
  }
};

export default shoppingListReducer;
