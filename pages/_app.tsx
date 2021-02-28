import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';

import { useApollo } from '../app/config/apolloClient';
import { appWithTranslation } from '../app/config/i18next';
import defaultTheme from '../app/styles/theme';

import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: ${(props) => props.theme.colors.fontBlack};
  overflow: initial !important;
}

* {
  box-sizing: border-box;
}

::-moz-selection { /* Code for Firefox */
  color: ${(props) => props.theme.colors.fontWhiter};
  background: ${(props) => props.theme.colors.primary};
}

::selection {
  color: ${(props) => props.theme.colors.fontWhiter};
  background: ${(props) => props.theme.colors.primary};
}
`;

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={defaultTheme}>
        <ModalProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ModalProvider>
        <ToastContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
