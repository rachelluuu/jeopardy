import * as ActionTypes from './ActionTypes';
import { serviceUrl } from '../shared/baseUrl';

export const fetchQAs = (offset) => (dispatch) => {
    dispatch(qasLoading(true));
    console.log("fetchQAs: " + offset);
    return fetch(serviceUrl + 'api/clues?offset='+offset)
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
    const offset = Math.random() * 1000;
    return fetch(serviceUrl + 'api/categories?offset=' + offset + '&count='+(n?n:100))
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
      const c = cats.sort((a,b)=>a.clues_count<b.clues_count?1:-1).slice(0, 6); /* choose first 6 */
      c.map((cat) => dispatch(fetchCatQAs(cat.id))); /* fetch q's for the cats */
      return dispatch(addCats(c));
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

export const filterQAsByCat = (c) => ({ type: ActionTypes.FILTER_QAS_BYCAT, payload: c });
export const filterQAsByVal = (c) => ({ type: ActionTypes.FILTER_QAS_BYVAL, payload: c });
export const filterQAsByDate = (s,e) => ({ type: ActionTypes.FILTER_QAS_BYDATE, payload: {startDate: s, endDate: e} });