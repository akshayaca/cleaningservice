/*
  File: Footer.test.js
  Description: Unit tests for Footer component.
  Author: Akshayarekha Subhramaniyan
  Date: 27/03/2024

  Note: This file contains unit tests for the ServiceListing component. It tests rendering of service listings
  with different filter options.
*/

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
