import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { Transition } from "react-transition-group";
const classes = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
};
const Toast: React.FC = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { toast,toastVisible } = useSelector((state: RootState) => state.app);
  return (
    <Transition
      nodeRef={toastRef}
      in={toastVisible}
      timeout={{ enter: 300, exit: 300 }}
      mountOnEnter
      enter
      exit
      unmountOnExit
    >
      {(state) => (
        
        <div
          ref={toastRef}
          className={`toast toast-end toast-bottom p-4 text-white transition-all duration-300`}
          style={{
            opacity: state === "entered" ? 1 : 0,
            transform:
              state === "entered" ? "translateX(0)" : "translateX(50%)",
          }}
        >
          <div
            className={`alert ${
              classes[toast?.type as keyof typeof classes] || ""
            }`}
          >
            {toast?.message}
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Toast;
