import {
  FETCH_USER_DETAILS,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_START,
} from '../actions/action-types'

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        ...state,
        loading: true,
      }

    case SIGN_IN_SUCCESS:
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

    case FETCH_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

export { authReducer }
