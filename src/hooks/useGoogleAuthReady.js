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
      return undefined;
    }

    const startedAt = Date.now();

    const checkReady = () => {
      if (isGoogleAuthReady()) {
        setIsGoogleReady(true);
        return true;
      }
      return Date.now() - startedAt >= GOOGLE_READY_TIMEOUT;
    };

    const immediateId = window.setTimeout(() => {
      if (checkReady()) {
        return;
      }
    }, 0);

    const intervalId = window.setInterval(() => {
      if (checkReady()) {
        window.clearInterval(intervalId);
        return;
      }
    }, GOOGLE_READY_CHECK_INTERVAL);

    return () => {
      window.clearTimeout(immediateId);
      window.clearInterval(intervalId);
    };
  }, [isEnabled]);

  return isEnabled ? isGoogleReady : false;
};

export default useGoogleAuthReady;
