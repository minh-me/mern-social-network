import { useRef, useState } from 'react';

export const useLimitRef = () => {
  const [limitState, setLimitState] = useState(8);
  const setLimit = (size = 8) => {
    setLimitState((prev) => prev + size);
  };

  return { limit: limitState, setLimit };
};
