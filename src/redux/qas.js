import * as ActionTypes from './ActionTypes';

export const QAs = (state = {
    isLoading: true,
    errMess: null,
    selectedCat: null,
    qas:[]
    }, action) => {
        switch (action.type) {
            case ActionTypes.ADD_QAS:
                return {...state, isLoading: false, errMess: null, qas: action.payload};

            case ActionTypes.QAS_LOADING:
                return {...state, isLoading: true, errMess: null, qas: []}

            case ActionTypes.QAS_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            case ActionTypes.FILTER_QAS:
                return {...state, selectedCat: action.payload};

            default:
                return state;
        }
};