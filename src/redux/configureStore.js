import { createStore, combineReducers, applyMiddleware } from 'redux';
import { QAs } from './qas';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            qas: QAs
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}