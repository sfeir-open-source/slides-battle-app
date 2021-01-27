import { useCallback, useState } from "react";

export const useModalManager = () => {
  const [isOpened, setOpened] = useState(false);

  const open = useCallback(() => setOpened(true), [setOpened]);
  const close = useCallback(() => setOpened(false), [setOpened]);

  return { isOpened, open, close };
};
