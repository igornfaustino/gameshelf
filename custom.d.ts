import 'styled-components';
import { ThemeType } from './app/shared/styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}

declare module '*.svg' {
  const content: any;
  export default content;
}
