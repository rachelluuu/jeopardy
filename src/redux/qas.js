import * as ActionTypes from './ActionTypes';

export const QAs = (state = { isLoading: true,
    errMess: null,
    qas:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_QAS:
            return {...state, isLoading: false, errMess: null, qas: action.payload};

        case ActionTypes.QAS_LOADING:
            return {...state, isLoading: true, errMess: null, qas: []}

        case ActionTypes.QAS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};