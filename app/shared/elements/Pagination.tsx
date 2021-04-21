import React from 'react';

import styled from 'styled-components';

import Button from './Button';

type Props = {
  total;
  limit;
  offset;
  onPageChange(page: number): void;
};

const PaginationContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 4px;
  text-align: center;
`;

const Pagination = (props: Props) => {
  const { total, limit, offset, onPageChange } = props;

  const count = total || 0;
  const numberOfPages = Math.ceil(count / limit);
  const pageButtons = [];
  const activeButton = offset / limit;

  for (let i = 0; i < numberOfPages; i++) {
    const button = (
      <Button
        key={i}
        primary={activeButton === i}
        white={activeButton !== i}
        textVariant={activeButton === i && 'light'}
        onClick={() => onPageChange(i)}
      >
        {i + 1}
      </Button>
    );
    pageButtons.push(button);
  }
  return <PaginationContainer>{pageButtons}</PaginationContainer>;
};

export default Pagination;
