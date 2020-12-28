import React from 'react';
import styled from 'styled-components';
import BaseLayout from './BaseLayout';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Content = styled.div`
  background: #fff;
  padding: 24px;
  width: 500px;
`;

const SmallContentLayout = ({ children, title }: Props) => {
  return (
    <BaseLayout title={title}>
      <Container>
        <Content>{children}</Content>
      </Container>
    </BaseLayout>
  );
};

export default SmallContentLayout;
