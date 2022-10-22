import React, { useEffect, useCallback } from "react";

import { ToastNotification, ToastState } from "./utils";
import ToastActions from "../../../actions/toast.actions";

import BaseButton from "../buttons/BaseButton";

import CheckIcon from "src/assets/icons/solid/Check.svg";
import CrossIcon from "src/assets/icons/solid/Cross_purple.svg";

import styles from "./Toast.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAppDispatch } from "../../../hooks/hooks";

const getStateIcon = (state: ToastState) => {
  switch (state) {
    case ToastState.LOADING:
      return <Spinner />;
      break;
    case ToastState.ERROR:
      return <img src={CrossIcon} alt="check-icon" />;
      break;
    case ToastState.VALID:
      return <img src={CheckIcon} alt="check-icon" />;
      break;

    default:
      return <img src={CheckIcon} alt="check-icon" />;
      break;
  }
};

const Toast: React.FC<{ toast: ToastNotification }> = ({ toast }) => {
  const dispatch = useAppDispatch();

  const remove = useCallback(() => {
    dispatch(ToastActions.removeToast(toast.id));
  }, [dispatch, toast.id]);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (toast.autoClose) {
      id = setTimeout(() => remove(), toast.delay);
    }

    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className={styles.toastNotificationContainer}>
      <div className={styles.toastNotification}>
        <div className="flex items-start">
          <div className="flex mr-20 items-start">
            <div className="icon p-2 mr-2">{getStateIcon(toast.state)}</div>
            <div>
              <div className="text-12 ui-t-primary">{toast.title}</div>
              {toast.action}
            </div>
          </div>
          <div className="uppercase">
            <BaseButton onClick={() => remove()} xSmall={true} className="px-2">
              Close
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
