import React from 'react';
import styled from 'styled-components';
import BaseLayout from './BaseLayout';

type Props = {
  children: React.ReactNode;
  title?: string;
  pageName?: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px 50px 30px 50px;
`;

const Content = styled.div`
  background: ${(props) => props.theme.colors.contentArea};
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const PageName = styled.h2`
  margin: 0;
  margin-bottom: 0.5em;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  font-size: 30px;
  line-height: 1.35;
`;

const DashboardLayout = ({ children, title, pageName }: Props) => {
  return (
    <BaseLayout title={title}>
      <Container>
        <Content>
          {!!pageName && <PageName>{pageName}</PageName>}
          {children}
        </Content>
      </Container>
    </BaseLayout>
  );
};

export default DashboardLayout;
