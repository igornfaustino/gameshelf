import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import BasicInput from '../BasicInput';
import defaultTheme from '../../../styles/theme';

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
