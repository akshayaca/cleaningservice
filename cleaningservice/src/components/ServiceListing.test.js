import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom'; // Use Router instead of BrowserRouter for custom history
import { createMemoryHistory } from 'history';
import ServiceListing from './ServiceListing';
import '@testing-library/jest-dom';

describe('ServiceListing', () => {
  test('renders the heading', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ServiceListing />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /service requests/i })).toBeInTheDocument();
  });

  test('routes to details page on row click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ServiceListing />
      </Router>
    );
  
    // Find and click the first listing item as before
    const firstListingItem = screen.getByText(/Property Title 1/);
    fireEvent.click(firstListingItem);
  
    // Adjust the expected path to reflect the correct item ID
    expect(history.location.pathname).toBe('/request/0');
  });
  
});
