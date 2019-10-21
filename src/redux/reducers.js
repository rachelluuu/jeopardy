import * as ActionTypes from './ActionTypes';

export const QAs = (state = { isLoading: true }, action) => {
    switch (action.type) {
        case ActionTypes.QAS_LOADING: 
            return {...state, isLoading: action.payload, errMess: null};
        case ActionTypes.QAS_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.QAS_ADD: 
            const oldQs = action.payload.offset>0 && state.qas ? state.qas : [];
            const newQs = action.payload.qas.map((q) => ({...q, airdate: new Date(q.airdate)}));
            action.payload.qas = null;
            return {...state, 
                isLoading: false, 
                errMess: null, 
                ...action.payload,
                data: oldQs.concat(newQs)
            };
        default:
            return state;
    }
};

export const Cats = (state = { isLoading: true, cats:[]}, action) => {
    switch (action.type) {
        case ActionTypes.CAT_LOADING: 
            return {...state, isLoading: action.payload, errMess: null};
        case ActionTypes.CAT_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.CAT_ADD: 
            return { ...state, isLoading: false, errMess: null, cats: action.payload };
        default:
            return state;
    }
};

export const CatQAs = (state = { isLoading: true, catQAs:[]}, action) => {
    switch (action.type) {
        case ActionTypes.CAT_QAS_LOADING: 
            return {...state, isLoading: action.payload, errMess: null};
        case ActionTypes.CAT_QAS_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.CAT_QAS_ADD: 
            const qas = state.catQAs;
            qas["c"+action.catId] = action.payload
            .filter((a)=>a.value>0)
            .sort((a,b)=>(a.value>b.value?1:-1))
            .map((q) => ({...q, airdate: new Date(q.airdate)}));
            return {...state, isLoading: false, errMess: null, catQAs: qas};
        default:
            return state;
    }
};