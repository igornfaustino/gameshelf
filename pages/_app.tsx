import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';

import { appWithTranslation } from '../app/shared/config/i18next';
import ApolloWrapper from '../app/shared/helpers/ApolloWrapper';
import defaultTheme from '../app/shared/styles/theme';

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
  return (
    <CookiesProvider>
      <ApolloWrapper initialApolloState={pageProps.initialApolloState}>
        <ThemeProvider theme={defaultTheme}>
          <ModalProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ModalProvider>
          <ToastContainer />
        </ThemeProvider>
      </ApolloWrapper>
    </CookiesProvider>
  );
}

export default appWithTranslation(MyApp);
