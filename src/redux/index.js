import studentReducer from './reducers/studentReducer';

import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux'

// MIDDWARE
const sagaMiddleware = createSagaMiddleware();

// REDUCER
const rootReducer = combineReducers({
    student: studentReducer
})

// WATCHER
import rootSaga from './sagas/rootSaga';

const store = createStore (
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store;