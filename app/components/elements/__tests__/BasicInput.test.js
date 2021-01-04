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
});
