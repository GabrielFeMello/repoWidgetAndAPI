import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Enviar avaliação link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enviar avaliação/i);
  expect(linkElement).toBeInTheDocument();
});
