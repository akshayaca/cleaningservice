// Remove the export statement at the end of the file.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServiceListing from './ServiceListing';
import '@testing-library/jest-dom';

describe('ServiceListing', () => {
  test('renders the heading', () => {
    render(
      <BrowserRouter>
        <ServiceListing />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /service requests/i })).toBeInTheDocument();
  });
});
