import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../../../styles/theme';
import Input from '../Input';

jest.mock('../../../config/i18next', () => ({
  useTranslation: () => {
    return {
      t: (str, options = {}) => {
        let tStr = str;
        Object.entries(options).forEach(([key, value]) => {
          tStr = tStr.replace(`{{${key}}}`, value);
        });
        return tStr;
      },
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    };
  },
}));

describe('BasicInput', () => {
  test.each(['text', 'email', 'password'])('renders the normal input for type %s', (type) => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Input type={type} />
      </ThemeProvider>
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  test('shows error properly', () => {
    const errorKey = 'simple error key';
    render(
      <ThemeProvider theme={defaultTheme}>
        <Input error={errorKey} />
      </ThemeProvider>
    );
    expect(screen.getByText(`error.${errorKey}`)).toBeInTheDocument();
  });

  test('shows parser error options', () => {
    const errorRaw = 'simple error {{name}}#{"name":"test"}';
    const errorExpected = 'simple error test';

    render(
      <ThemeProvider theme={defaultTheme}>
        <Input error={errorRaw} />
      </ThemeProvider>
    );
    expect(screen.getByText(`error.${errorExpected}`)).toBeInTheDocument();
  });
});
