import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s != null ? JSON.parse(s) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}
