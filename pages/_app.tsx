import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';

import { appWithTranslation } from '../app/config/i18next';
import { AuthProvider } from '../app/modules/auth/authProvider';
import ApolloWrapper from '../app/modules/shared/helpers/ApolloWrapper';
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
  return (
    <AuthProvider>
      <ApolloWrapper initialApolloState={pageProps.initialApolloState}>
        <ThemeProvider theme={defaultTheme}>
          <ModalProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ModalProvider>
          <ToastContainer />
        </ThemeProvider>
      </ApolloWrapper>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
