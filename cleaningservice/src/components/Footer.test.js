import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';


describe('Footer Component', () => {
  test('displays the current year dynamically', () => {
    const { getByText } = render(<Footer />);
    const year = new Date().getFullYear();
    const regex = new RegExp(year.toString()); // Create a RegExp to match the year
    expect(getByText(regex)).toBeInTheDocument();
  });
});
