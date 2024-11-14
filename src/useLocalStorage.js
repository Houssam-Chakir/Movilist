import { useEffect, useState } from "react";

export function useLocalStorage(initState, key) {
  const [values, setValues] = useState(() => {
    const items = JSON.parse(localStorage.getItem(key));
    return items ? items : initState
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(values));
    },
    [values]
  );

  return [ values, setValues ];
}
