import { useContext, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { AppContext } from "../configs/AppContext";

const Alert = () => {
  const [state, dispatch] = useContext(AppContext);
  const { alert } = state;

  const { show, message, type } = alert;

  useEffect(() => {
    if (show) {
      const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
        dispatch({
          type: "SET_ALERT",
          payload: {
            ...state.alert,
            show: false,
          },
        });

        clearTimeout(timer);
      }, 5000);
    }
  }, [show, state.alert, dispatch]);

  return (
    show && (
      <div
        className={`fixed left-1/2 -translate-x-1/2 bottom-4 w-full max-w-sm border border-solid p-4 flex justify-between
      ${type === "success" && "bg-green-100 border-green-600 text-green-600"}
      ${type === "failed" && "bg-red-100 border-red-600 text-red-600"}
      `}
      >
        <span>{message}</span>

        <FaXmark
          size={20}
          color="#dc2626"
          className="cursor-pointer"
          onClick={() =>
            dispatch({
              type: "SET_ALERT",
              payload: {
                ...state.alert,
                show: false,
              },
            })
          }
        />
      </div>
    )
  );
};

export default Alert;
