import { useState, useEffect } from "react";

export function useBlink(ms: number) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setShow(s => !s), ms);
    return () => clearInterval(interval);
  }, [ms]);
  return show;
}
