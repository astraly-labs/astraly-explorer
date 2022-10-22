import UiConstants from '../constants/ui.constants'

const initialState = {
  heading: {
    isHome: false,
    isProject: false,
    page: '',
    title: '',
  },
}

export function Ui(state = initialState, action: any) {
  if (action.type === UiConstants.SET_PAGE) {
    return {
      ...state,
      heading: {
        ...state.heading,
        ...action.heading,
      },
    }
  }
  return state
}
