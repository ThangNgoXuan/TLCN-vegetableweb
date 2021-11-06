import { SLIDE_LIST_REQUEST, SLIDE_LIST_SUCCESS, SLIDE_LIST_FAIL } from "../constants/slideConstants";

export const slideListReducer = (
  state = { loading: true, slides: [] },
  action
) => {
  switch (action.type) {
    case SLIDE_LIST_REQUEST:
      return { loading: true }
    case SLIDE_LIST_SUCCESS:
      return {
        loading: false,
        slides: action.payload
      }
    case SLIDE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}