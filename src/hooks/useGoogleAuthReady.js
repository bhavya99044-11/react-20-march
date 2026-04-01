import { useEffect, useState } from "react";

const GOOGLE_READY_CHECK_INTERVAL = 250;
const GOOGLE_READY_TIMEOUT = 10000;

const isGoogleAuthReady = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.google?.accounts?.id);
};

const useGoogleAuthReady = (isEnabled = true) => {
  const [isGoogleReady, setIsGoogleReady] = useState(() => {
    return isEnabled ? isGoogleAuthReady() : false;
  });

  useEffect(() => {
    if (!isEnabled) {
      setIsGoogleReady(false);
      return undefined;
    }

    if (isGoogleAuthReady()) {
      setIsGoogleReady(true);
      return undefined;
    }

    const startedAt = Date.now();

    const intervalId = window.setInterval(() => {
      if (isGoogleAuthReady()) {
        setIsGoogleReady(true);
        window.clearInterval(intervalId);
        return;
      }

      if (Date.now() - startedAt >= GOOGLE_READY_TIMEOUT) {
        window.clearInterval(intervalId);
      }
    }, GOOGLE_READY_CHECK_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [isEnabled]);

  return isGoogleReady;
};

export default useGoogleAuthReady;
