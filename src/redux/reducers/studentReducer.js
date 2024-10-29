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
} from "../actions/typeActions.js";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_STUDENTS_REQUEST:
      case UPDATE_STUDENT_REQUEST:
      case DELETE_STUDENT_REQUEST:
      case CREATE_STUDENT_REQUEST:
          return { ...state, loading: true };

      case FETCH_STUDENTS_SUCCESS:
          return { ...state, loading: false, students: action.payload };

      // ADD STUDENT
      case CREATE_STUDENT_SUCCESS:
          return { 
              ...state, 
              loading: false, 
              students: [...state.students, action.payload], 
          };

      case UPDATE_STUDENT_SUCCESS:
          return {
              ...state,
              loading: false,
              students: state.students.map((student) =>
                  student.id === action.payload.id
                      ? { ...student, ...action.payload.updatedData }
                      : student
              ),
          };

      case DELETE_STUDENT_SUCCESS:
          return {
              ...state,
              loading: false,
              students: state.students.filter((student) => student.id !== action.payload.id),
          };

      case FETCH_STUDENTS_FAILURE:
      case UPDATE_STUDENT_FAILURE:
      case DELETE_STUDENT_FAILURE:
      case CREATE_STUDENT_FAILURE:
          return { ...state, loading: false, error: action.error };

      default:
          return state;
  }
};

export default studentReducer;