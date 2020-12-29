import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { appWithTranslation } from '../app/config/i18next';
import defaultTheme from '../app/styles/theme';

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: ${(props) => props.theme.colors.fontBlack}
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
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
