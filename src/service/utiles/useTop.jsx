import { useEffect } from "react";

function useTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useTop;
