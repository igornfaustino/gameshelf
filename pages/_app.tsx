import '../app/styles/globals.css';
import { appWithTranslation } from '../app/config/i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
