import Head from 'next/head';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from '../elements/Footer';
import Header from '../elements/Header';

type Props = {
  title?: string;
  children: ReactNode;
};

const Page = styled.div`
  background-color: ${(props) => props.theme.colors.background};
`;

const Main = styled.main`
  margin-top: ${(props) => props.theme.constants.headerHeight};
  min-height: ${(props) => `calc(
    100vh - ${props.theme.constants.headerHeight} -
      ${props.theme.constants.footerHeight}
  )`};
  display: flex;
`;

const BaseLayout = ({ title = 'Gameshelf', children }: Props) => {
  return (
    <Page>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Page>
  );
};

export default BaseLayout;
