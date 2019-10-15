import * as ActionTypes from './ActionTypes';
import { serviceUrl } from '../shared/baseUrl';

export const fetchQAs = () => (dispatch) => {
    dispatch(qasLoading(true));

    return fetch(serviceUrl + 'api/clues')
    .then(response => {
        if (response.ok) {
          return response;
        } 
        var error = new Error('Fetching questions error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(qas => dispatch(addQAs(qas)))
    .catch(error => dispatch(qasFailed(error.message)));
}

export const fetchCats = (n) => (dispatch) => {
    dispatch(catLoading(true));
    return fetch(serviceUrl + 'api/categories?count='+(n?n:6))
    .then(response => {
        if (response.ok) {
          return response;
        } 
        var error = new Error('Fetching categories error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(cats => {
      cats.map((cat) => dispatch(fetchCatQAs(cat.id)));
      return dispatch(addCats(cats));
    })
    .catch(error => dispatch(qasFailed(error.message)));
}

export const fetchCatQAs = (catId) => (dispatch) => {
    return fetch(serviceUrl + 'api/clues?category='+catId)
    .then(response => {
        if (response.ok) {
          return response;
        } 
        var error = new Error('Fetching categories question error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(qas => dispatch(addCatQAs(catId, qas)))
    .catch(error => dispatch(qasFailed(error.message)));
}

export const qasLoading = (f) => ({ type: ActionTypes.QAS_LOADING, payload: f });
export const qasFailed = (errmess) => ({ type: ActionTypes.QAS_FAILED, payload: errmess });
export const addQAs = (qas) => ({ type: ActionTypes.QAS_ADD, payload: qas });

export const catLoading = (f) => ({ type: ActionTypes.CAT_LOADING, payload: f });
export const catFailed = (errmess) => ({ type: ActionTypes.CAT_FAILED, payload: errmess });
export const addCats = (cats) => ({ type: ActionTypes.CAT_ADD, payload: cats });

export const catQAsLoading = (f) => ({ type: ActionTypes.CAT_QAS_LOADING, payload: f });
export const catQAsFailed = (errmess) => ({ type: ActionTypes.CAT_QAS_FAILED, payload: errmess });
export const addCatQAs = (catId, qas) => ({ type: ActionTypes.CAT_QAS_ADD, catId: catId, payload: qas });

export const filterQAs = (selectedCat) => ({ type: ActionTypes.FILTER_QAS, payload: selectedCat });