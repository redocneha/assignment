import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}
export function deleteAuthorSuccess(author) {
  return { type: types.DELETE_AUTHOR_SUCCESS, author };
}
export function saveAuthorSuccess(author) {
  return { type: types.SAVE_AUTHOR_SUCCESS, author };
}
export function UpdateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(dispatch(apiCallError()));
  };
}
export function deleteAuthor(author) {
  return function(dispatch) {
    dispatch(deleteAuthorSuccess(author));
    authorApi.deleteAuthor(author.id);
  };
}
export function saveAuthor(author) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(savedAuthor => {
        savedAuthor.id
          ? dispatch(UpdateAuthorSuccess(author))
          : dispatch(saveAuthorSuccess(author));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
