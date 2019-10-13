import * as ActionTypes from './ActionTypes';
import { serviceUrl } from '../shared/baseUrl';

export const fetchQAs = () => (dispatch) => {

    dispatch(qasLoading(true));

    return fetch(serviceUrl + 'api/clues')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(qas => dispatch(addQAs(qas)))
    .catch(error => dispatch(qasFailed(error.message)));
}

export const qasLoading = () => ({
    type: ActionTypes.QAS_LOADING
});

export const qasFailed = (errmess) => ({
    type: ActionTypes.QAS_FAILED,
    payload: errmess
});

export const addQAs = (qas) => ({
    type: ActionTypes.ADD_QAS,
    payload: qas
});