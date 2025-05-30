import { useEffect, useState } from "react";

export const useCurrentPath = (): string => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.hash);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath;
};
