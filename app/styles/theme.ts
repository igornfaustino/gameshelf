export type ThemeType = {
  colors: {
    link: string;
    header: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    background: string;
    fontWhite: string;
    fontWhiter: string;
    fontBlack: string;
    fontBlacker: string;
    inputShadow: string;
    error: string;
    contentArea: string;
    cardColor: string;
  };
  constants: {
    headerHeight: string;
    footerHeight: string;
    inputHeight: string;
  };
};

export const defaultTheme: ThemeType = {
  colors: {
    link: '#43a047',
    header: '#444',
    primary: '#43a047',
    primaryLight: '#76d275',
    primaryDark: '#00701a',
    background: '#f0f2f5',
    fontWhite: '#e5e5e5',
    fontWhiter: '#fff',
    fontBlack: 'rgba(0, 0, 0, 0.85)',
    fontBlacker: '#000',
    inputShadow: 'rgba(29, 165, 122, 0.2)',
    error: 'red',
    contentArea: '#fff',
    cardColor: '#fff',
  },
  constants: {
    headerHeight: '64px',
    footerHeight: '83px',
    inputHeight: '37px',
  },
};

export default defaultTheme;
