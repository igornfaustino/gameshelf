import { ThemeProvider } from 'styled-components';
import '../app/styles/globals.css';
import { appWithTranslation } from '../app/config/i18next';
import defaultTheme from '../app/styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
