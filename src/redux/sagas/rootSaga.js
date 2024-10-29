import { all } from 'redux-saga/effects';
import { watchStudentSaga } from './studentSaga';

// kich hoat watcher
export default function* rootSaga() {
    yield all([
        watchStudentSaga(),
    ]);
}