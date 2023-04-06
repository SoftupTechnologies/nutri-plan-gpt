import { useEffect } from "react";

const usePageLeaveWarning = (message: string, condition = true) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (condition) {
        event.preventDefault();
        event.returnValue = message;

        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message, condition]);
};
export default usePageLeaveWarning;
