import ToastConstants from '../constants/toast.constants'
import { ToastNotification } from '../components/ui/Toast/utils'

const initialState: {
  toasts: ToastNotification[]
} = {
  toasts: [],
}

export function Toast(state = initialState, action: any) {
  if (action.type === ToastConstants.ADD_TOAST) {
    return {
      ...state,
      toasts: [...state.toasts, action.toast],
    }
  }

  if (action.type === ToastConstants.REMOVE_TOAST) {
    return {
      ...state,
      toasts: state.toasts.filter((x) => x.id != action.id),
    }
  }

  if (action.type === ToastConstants.UPDATE_TOAST) {
    const _toastIndex = state.toasts.findIndex((x) => x.id === action.toast.id)
    const updatedState = (state.toasts[_toastIndex] = action.toast)
    return {
      ...updatedState,
    }
  }

  return state
}
