// studentAction.js
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
    CREATE_STUDENT_FAILURE
} from './typeActions.js';

// Fetch Students
export const fetchStudentsRequest = () => ({
    type: FETCH_STUDENTS_REQUEST,
});

export const fetchStudentsSuccess = (students) => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: students,
});

export const fetchStudentsFailure = (error) => ({
    type: FETCH_STUDENTS_FAILURE,
    error,
});

// Update Student
export const updateStudentRequest = (id, updatedData) => ({
    type: UPDATE_STUDENT_REQUEST,
    payload: { id, updatedData },
});

export const updateStudentSuccess = (id, updatedData) => ({
    type: UPDATE_STUDENT_SUCCESS,
    payload: { id, updatedData },
});

export const updateStudentFailure = (error) => ({
    type: UPDATE_STUDENT_FAILURE,
    error,
});

// Delete Student
export const deleteStudentRequest = (id) => ({
    type: DELETE_STUDENT_REQUEST,
    payload: { id },
});

export const deleteStudentSuccess = (id) => ({
    type: DELETE_STUDENT_SUCCESS,
    payload: { id },
});

export const deleteStudentFailure = (error) => ({
    type: DELETE_STUDENT_FAILURE,
    error,
});

// Create Student
export const createStudentRequest = (newStudent) => ({
    type: CREATE_STUDENT_REQUEST,
    payload: newStudent,
});

export const createStudentSuccess = (student) => ({
    type: CREATE_STUDENT_SUCCESS,
    payload: student,
});

export const createStudentFailure = (error) => ({
    type: CREATE_STUDENT_FAILURE,
    error,
});
