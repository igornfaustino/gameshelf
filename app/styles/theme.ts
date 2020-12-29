export type ThemeType = {
  colors: {
    link: string;
    header: string;
    primary: string;
    background: string;
    fontWhite: string;
    fontWhiter: string;
    fontBlack: string;
    fontBlacker: string;
    inputShadow: string;
    error: string;
    contentArea: string;
  };
  constants: {
    headerHeight: string;
    footerHeight: string;
  };
};

export const defaultTheme: ThemeType = {
  colors: {
    link: '#1DA57A',
    header: '#444',
    primary: '#1DA57A',
    background: '#f0f2f5',
    fontWhite: '#e5e5e5',
    fontWhiter: '#fff',
    fontBlack: 'rgba(0, 0, 0, 0.85)',
    fontBlacker: '#000',
    inputShadow: 'rgba(29, 165, 122, 0.2)',
    error: 'red',
    contentArea: '#fff',
  },
  constants: {
    headerHeight: '64px',
    footerHeight: '83px',
  },
};

export default defaultTheme;
