import * as ActionTypes from './ActionTypes';
import { serviceUrl } from '../shared/baseUrl';
import { getFormattedDate } from '../shared/helper';

export const fetchQAs = (f) => (dispatch) => {
    dispatch(qasLoading(true));
    let url = serviceUrl + 'api/clues?' +
      'offset=' + ((f && f.offset) || 0) +
      (f.catId ? '&category='+f.catId : '') +
      (f.value ? '&value='+f.value : '') + 
      (f.startDate && f.endDate ? // work around a bug in jService.io where min/max date is flipped if only 1 of them is specified
        '&min_date='+getFormattedDate(f.startDate)+'&max_date='+getFormattedDate(f.endDate) : 
        ((f.startDate ? '&max_date='+getFormattedDate(f.startDate) : '') + 
         (f.endDate ? '&min_date='+getFormattedDate(f.endDate) : ''))
      );
    console.log("fetchQAs: ", url, f);
    return fetch(url)
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
    .then(qas => dispatch(addQAs(f, qas)))
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
export const addQAs = (f, q) => ({ type: ActionTypes.QAS_ADD, payload: {...f, qas: q }});

export const catLoading = (f) => ({ type: ActionTypes.CAT_LOADING, payload: f });
export const catFailed = (errmess) => ({ type: ActionTypes.CAT_FAILED, payload: errmess });
export const addCats = (cats) => ({ type: ActionTypes.CAT_ADD, payload: cats });

export const catQAsLoading = (f) => ({ type: ActionTypes.CAT_QAS_LOADING, payload: f });
export const catQAsFailed = (errmess) => ({ type: ActionTypes.CAT_QAS_FAILED, payload: errmess });
export const addCatQAs = (catId, qas) => ({ type: ActionTypes.CAT_QAS_ADD, catId: catId, payload: qas });