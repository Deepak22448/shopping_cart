import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, intitalValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonVal = localStorage.getItem(key);
    if (jsonVal != null) return JSON.parse(jsonVal);
    if (typeof intitalValue === "function") {
      return (intitalValue as () => T)();
    } else {
      return intitalValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
};

export default useLocalStorage;
