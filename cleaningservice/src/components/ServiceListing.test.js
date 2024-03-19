import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Since we're using `useHistory`
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

  // Add more tests as needed
});
export default ServiceListing;
