import ToastConstants from '../constants/toast.constants'
import {
  DEFAULT_DELAY,
  ToastNotification,
  ToastNotificationMessage,
  ToastPositions,
} from '../components/ui/Toast/utils'
import { getUID } from '../utils'

const ToastActions = {
  addToast(toast: ToastNotificationMessage) {
    return (dispatch: any) => {
      return dispatch({
        type: ToastConstants.ADD_TOAST,
        toast: {
          id: toast.id ?? getUID(),
          delay: DEFAULT_DELAY,
          position: ToastPositions.CENTER_LEFT,
          ...toast,
        },
      })
    }
  },
  removeToast(toast: ToastNotification | string) {
    return (dispatch: any) => {
      return dispatch({
        type: ToastConstants.REMOVE_TOAST,
        id: typeof toast === 'string' ? toast : toast.id,
      })
    }
  },
  updateToast(toast: ToastNotificationMessage) {
    return (dispatch: any) => {
      return dispatch({
        type: ToastConstants.UPDATE_TOAST,
        toast: {
          id: toast.id,
          delay: DEFAULT_DELAY,
          position: ToastPositions.CENTER_LEFT,
          ...toast,
        },
      })
    }
  },
}

export default ToastActions
