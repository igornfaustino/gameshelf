import { useCallback, useState } from 'react';

const usePagination = (defaultLimit = 30, initialOffset = 0) => {
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(defaultLimit);

  const onPageChange = (page: number) => {
    setOffset(limit * page);
    window.scrollTo(0, 0);
  };

  const resetOffset = useCallback(() => setOffset(0), []);

  return { limit, offset, onPageChange, setLimit, resetOffset };
};

export default usePagination;
