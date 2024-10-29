import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
    CREATE_STUDENT_REQUEST,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAILURE,
} from "../actions/typeActions.js";
import { toast } from 'react-toastify';

// API URL
const API_URL = 'https://student-api-nestjs.onrender.com';

// API Client (without Token)
const apiClient = axios.create({
    baseURL: API_URL,
});

// Fetch Students
function* fetchStudentsSaga() {
    try {
        const response = yield call(apiClient.get, `/students`);
        yield put({ type: FETCH_STUDENTS_SUCCESS, payload: response.data.data });
    } catch (error) {
        yield put({ type: FETCH_STUDENTS_FAILURE, error: error.message || "Unknown error" });
    }
}

// Create Student
function* createStudentSaga(action) {
    try {
        const newStudent = action.payload;
        const response = yield call(apiClient.post, '/students', newStudent);
        const message = response.data.message || "Student created successfully";
        yield put({ type: CREATE_STUDENT_SUCCESS, payload: response.data });
        yield put({ type: FETCH_STUDENTS_REQUEST });
        yield call([toast, "success"], message);
    } catch (error) {
        yield put({ type: CREATE_STUDENT_FAILURE, error: error.message });
        yield call([toast, "error"], error.message);
    }
}

// Update Student
// Update Student
function* updateStudentSaga(action) {
    try {
        const { id, updatedData } = action.payload;

        // Gọi API để cập nhật sinh viên
        const response = yield call(apiClient.put, `/students/${id}`, updatedData);

        // Lấy thông điệp từ phản hồi
        const message = response.data.message || "Student updated successfully";

        // Cập nhật trạng thái thành công
        yield put({ type: UPDATE_STUDENT_SUCCESS, payload: { id, updatedData } });

        // Lấy lại danh sách sinh viên
        yield put({ type: FETCH_STUDENTS_REQUEST });

        // Hiển thị thông điệp thành công
        yield call([toast, "success"], message);
    } catch (error) {
        // Cập nhật trạng thái thất bại
        yield put({ type: UPDATE_STUDENT_FAILURE, error: error.message });

        // Hiển thị thông điệp lỗi cho người dùng
        yield call([toast, "error"], error.response?.data?.message || error.message || "An error occurred");
    }
}


// Delete Student
function* deleteStudentSaga(action) {
    try {
        const { id } = action.payload;
        const response = yield call(apiClient.delete, `/students/${id}`); 
        const message = response.data.message;
        yield put({ type: DELETE_STUDENT_SUCCESS, payload: { id, message } });
        yield put({ type: FETCH_STUDENTS_REQUEST });
        yield call([toast, 'success'], message);
    } catch (error) {
        yield put({ type: DELETE_STUDENT_FAILURE, error: error.message });
        yield call([toast, 'error'], error.message);
    }
}

// Watcher Saga
export function* watchStudentSaga() {
    yield takeLatest(CREATE_STUDENT_REQUEST, createStudentSaga);
    yield takeLatest(FETCH_STUDENTS_REQUEST, fetchStudentsSaga);
    yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudentSaga);
    yield takeLatest(DELETE_STUDENT_REQUEST, deleteStudentSaga);
}