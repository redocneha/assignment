import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case types.DELETE_AUTHOR_SUCCESS:
      return state.filter(authors => authors.id !== action.author.id);
    case types.UPDATE_AUTHOR_SUCCESS:
      return state.map(authors => authors.id === action.author.id);
    case types.SAVE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    default:
      return state;
  }
}
