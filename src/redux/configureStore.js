import { createStore, combineReducers, applyMiddleware } from 'redux';
import { QAs, Cats, CatQAs } from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            qas: QAs,
            cats: Cats,
            catQAs: CatQAs
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}