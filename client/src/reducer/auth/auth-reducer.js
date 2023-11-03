import {
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from '../actions/action-types'

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        ...state,
        loading: true,
      }

    case SIGN_IN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      }

    case SIGN_IN_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }

    case SIGN_UP_START:
      return {
        ...state,
        loading: true,
      }

    case SIGN_UP_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      }

    case SIGN_UP_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }

    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }

    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}

export { authReducer }
