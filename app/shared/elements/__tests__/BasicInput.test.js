import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../../../styles/theme';
import BasicInput from '../BasicInput';

describe('BasicInput', () => {
  it('renders the input', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BasicInput />
      </ThemeProvider>
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('shows error properly', () => {
    const errorMessage = 'simple error message';
    render(
      <ThemeProvider theme={defaultTheme}>
        <BasicInput error={errorMessage} />
      </ThemeProvider>
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
